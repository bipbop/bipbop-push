/* eslint-disable no-param-reassign */
import WebService, { Form } from 'bipbop-webservice';
import xpath from 'xpath';
import get from 'lodash/get';

import PushManagerException from './push-exception';

import { PushQuery } from './types/push-query';
import { PushConfiguration } from './types/push-configuration';
import { PushIdentifier } from './types/push-identifier';
import { PushStatus } from './types/push-status';
import { PushParameters } from './types/push-parameters';

/**
 * Gerenciamento de PUSH da BIPBOP
 */
export default class PushManager {
    /**
     * Instância o serviço
     * @param key Chave de acesso da BIPBOP
     * @param endpoint Endereço do serviço de PUSH na BIPBOP
     */
    public static fromKey(key: string, endpoint?: string): PushManager {
        return new this(new WebService(key), endpoint);
    }

    /**
     * Endpoint do serviço
     */
    public readonly endpoint: string;

    /**
     * Instância do WebService
     */
    public readonly webservice: WebService;

    /**
     * Inicializa o serviço de PUSH
     * @param webservice O WebService da BIPBOP
     * @param endpoint O endpoint
     */
    constructor(webservice: WebService, endpoint?: string) {
        this.webservice = webservice;
        this.endpoint = endpoint || 'PUSH';
    }

    public async create(
        pushQuery: PushQuery,
        configuration: PushConfiguration = {},
        label?: string,
    ): Promise<PushIdentifier> {
        const { target, parameters } = pushQuery;

        const form = {
            ...parameters,
            ...PushManager.translateConfiguration(configuration),
            pushQuery: target,
        };

        PushManager.addParameter(form, label, 'pushLabel');

        const response = (await WebService.parse(
            this.webservice.request(`INSERT INTO '${this.endpoint}'.'JOB'`, form),
        )) as Document;
        WebService.throwException(response);
        const id = xpath.select('string(/BPQL/body/id)', response, true) as string;
        if (!id) throw new PushManagerException('Push ID not received as a text');

        const identifier: PushIdentifier = {
            label,
            id,
        };

        PushManager.validateIdentifier(identifier);
        return identifier;
    }

    public async status(identifier: PushIdentifier, isDeleted = false): Promise<PushStatus> {
        const form = PushManager.validateIdentifier(identifier);
        const statusDocument = (await WebService.parse(
            this.webservice.request(`SELECT FROM '${this.endpoint}'.'${isDeleted ? 'DELETEDJOB' : 'JOB'}'`, form),
        )) as Document;
        WebService.throwException(statusDocument);
        const element = xpath.select('/BPQL/body/pushObject', statusDocument, true) as Element;
        if (!element) throw new PushManagerException('Not found');

        const lastSuccessRun = xpath.select('string(./lastSuccessRun)', element, true) as string;
        const lastRun = xpath.select('string(./lastRun)', element, true) as string;
        const deleted = xpath.select('string(./deleted)', element, true) as string;

        const state: PushStatus = {
            created: new Date(xpath.select('string(./created)', element, true) as string),
            nextJob: new Date(xpath.select('string(./nextJob)', element, true) as string),
            expectedNextJob: new Date(xpath.select('string(./expectedNextJob)', element, true) as string),
            lastSuccessRun: lastSuccessRun ? new Date(lastSuccessRun) : undefined,
            lastRun: lastRun ? new Date(lastRun) : undefined,
            executions: parseInt((xpath.select('string(./executions)', element, true) as string) || '0', 10),
            tries: parseInt((xpath.select('string(./tries)', element, true) as string) || '0', 10),
            hasException: xpath.select('string(./hasException)', element, true) === 'true',
            successExecutions: parseInt(
                (xpath.select('string(./successExecutions)', element, true) as string) || '0',
                10,
            ),
            version: parseInt((xpath.select('string(./version)', element, true) as string) || '0', 10),
            deleted: deleted ? new Date(deleted) : undefined,
        };

        const exceptionNode = xpath.select('./exception', element, true) as Element;
        if (exceptionNode)
            state.exception = {
                code: parseInt((xpath.select('string(./code)', exceptionNode, true) as string) || '0', 10),
                type: (xpath.select('string(./type)', exceptionNode, true) as string) || '',
                log: (xpath.select('string(./log)', exceptionNode, true) as string) || '',
                id: (xpath.select('string(./id)', exceptionNode, true) as string) || '',
                message: (xpath.select('string(./message)', exceptionNode, true) as string) || '',
            };

        return state;
    }

    public async document(identifier: PushIdentifier): Promise<any> {
        const form = PushManager.validateIdentifier(identifier);
        const response = await WebService.parse(
            this.webservice.request(`SELECT FROM '${this.endpoint}'.'DOCUMENT'`, form),
        );
        if (get(response, 'constructor.name') === 'Document') {
            WebService.throwException(response);
        }
        return response;
    }

    public async delete(identifier: PushIdentifier): Promise<void> {
        const form = PushManager.validateIdentifier(identifier);
        await this.webservice.request(`DELETE FROM '${this.endpoint}'.'JOB'`, form);
    }

    private static validateIdentifier(identifier: PushIdentifier): Form {
        const { id, label } = identifier;
        const form: Form = {};
        if (id) form.id = id;
        else if (label) form.label = label;
        else throw new PushManagerException('Register at least one identifier in the object.');
        return form;
    }

    private static addParameter(
        form: Form,
        value: Date | boolean | number | string | string[] | undefined,
        key: string,
    ): void {
        if (value === null || typeof value === 'undefined') return;
        if (typeof value === 'number') {
            form[key] = value.toString();
            return;
        }

        if (typeof value === 'boolean') {
            form[key] = value ? 'true' : 'false';
            return;
        }

        if (Array.isArray(value)) {
            form[key] = value.join(',');
            return;
        }

        if (value instanceof Date) {
            // eslint-disable-next-line radix
            form[key] = parseInt((value.getTime() / 1000).toFixed(0)).toString();
            return;
        }

        form[key] = value;
    }

    private static translateConfiguration(params: PushConfiguration): Form {
        const form = {};
        PushManager.addParameter(form, params.nextJob, 'pushNextJob');
        PushManager.addParameter(form, params.priority, 'pushPriority');
        PushManager.addParameter(form, params.interval, 'pushInterval');
        PushManager.addParameter(form, params.retryIn, 'pushRetryIn');
        PushManager.addParameter(form, params.callback, 'pushCallback');
        PushManager.addParameter(form, params.maxVersion, 'pushMaxVersion');
        PushManager.addParameter(form, params.tags, 'pushTags');
        PushManager.addParameter(form, params.webSocketDeliver, 'pushWebSocketDeliver');
        PushManager.addParameter(form, params.maxCallbackTrys, 'pushMaxCallbackTrys');
        PushManager.addParameter(form, params.weekdays, 'pushWeekdays');
        return form;
    }
}
