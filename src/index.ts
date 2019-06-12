import WebService, { Form } from 'bipbop-webservice';
import xpath from 'xpath';
import get from 'lodash/get';

import PushManagerException from './push-exception';

import { PushQuery } from './types/push-query';
import { PushConfiguration } from './types/push-configuration';
import { PushIdentificator } from './types/push-identificator';
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
    public static fromKey(key: string, endpoint?: string) : PushManager {
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

    public async create(pushQuery: PushQuery, configuration: PushConfiguration = {}, label?: string) : Promise<PushIdentificator> {
        const { target, parameters } = pushQuery;

        const form = {
            ...parameters,
            ...PushManager.translateConfiguration(configuration),
            pushQuery: target,
        };

        PushManager.addParameter(form, label, 'pushLabel');

        const response = await WebService.parse(this.webservice.request(`INSERT INTO '${this.endpoint}'.'JOB'`, form)) as Document;
        WebService.throwException(response);
        const id = <string> xpath.select('string(/BPQL/body/id)', response, true);
        if (!id) throw new PushManagerException('Push ID not received as a text');

        const identificator: PushIdentificator = {
            label,
            id,
        };

        PushManager.validateIdentificator(identificator);
        return identificator;
    }

    public async status(identificator: PushIdentificator, isDeleted: boolean = false) : Promise<PushStatus> {
        const form = PushManager.validateIdentificator(identificator);
        const statusDocument = <Document> await WebService.parse(this.webservice.request(`SELECT FROM '${this.endpoint}'.'${isDeleted ? 'DELETEDJOB' : 'JOB'}'`, form));
        WebService.throwException(statusDocument);
        const element = <Element> xpath.select('/BPQL/body/pushObject', statusDocument, true);
        if (!element) throw new PushManagerException('Not found');

        const lastSuccessRun = <string>xpath.select('string(./lastSuccessRun)', element, true);
        const lastRun = <string>xpath.select('string(./lastRun)', element, true);
        const deleted = <string>xpath.select('string(./deleted)', element, true);

        const state: PushStatus = {
            created: new Date(<string>xpath.select('string(./created)', element, true)),
            nextJob: new Date(<string>xpath.select('string(./nextJob)', element, true)),
            expectedNextJob: new Date(<string>xpath.select('string(./expectedNextJob)', element, true)),
            lastSuccessRun: lastSuccessRun ? new Date(lastSuccessRun) : undefined,
            lastRun: lastRun ? new Date(lastRun) : undefined,
            executions: parseInt(<string>xpath.select('string(./executions)', element, true) || '0', 10),
            trys: parseInt(<string>xpath.select('string(./executions)', element, true) || '0', 10),
            hasException: (<string>xpath.select('string(./hasException)', element, true)) === 'true',
            successExecutions: parseInt(<string>xpath.select('string(./successExecutions)', element, true) || '0', 10),
            version: parseInt(<string>xpath.select('string(./version)', element, true) || '0', 10),
            deleted: deleted ? new Date(deleted) : undefined,
        };

        const exceptionNode = <Element> xpath.select('./exception', element, true);
        if (exceptionNode) state.exception = {
            code: parseInt(<string>xpath.select('string(./code)', exceptionNode, true)  || '0', 10),
            type: <string>xpath.select('string(./type)', exceptionNode, true) || '',
            log: <string>xpath.select('string(./log)', exceptionNode, true) || '',
            id: <string>xpath.select('string(./id)', exceptionNode, true) || '',
            message: <string>xpath.select('string(./message)', exceptionNode, true) || '',
        };

        return state;
    }

    public async document(identificator: PushIdentificator): Promise<any> {
        const form = PushManager.validateIdentificator(identificator);
        const response = await WebService.parse(this.webservice.request(`SELECT FROM '${this.endpoint}'.'DOCUMENT'`, form));
        if (get(response, 'constructor.name') === 'Document') {
            WebService.throwException(response);
        }
        return response;
    }

    public async delete(identificator: PushIdentificator): Promise<void> {
        const form = PushManager.validateIdentificator(identificator);
        await this.webservice.request(`DELETE FROM '${this.endpoint}'.'JOB'`, form);
    }

    private static validateIdentificator(identificator: PushIdentificator): Form {
        const { id, label } = identificator;
        const form: Form = {}
        if (id) form.id = id;
        else if (label) form.label = label;
        else throw new PushManagerException('Register at least one identifier in the object.');
        return form;
    }

    private static addParameter(form: Form, value:  Date | boolean | number | string | string[] | undefined, key:  string) : void {
        if (value === null || typeof value === 'undefined') return;
        if (typeof value === "number") {
            form[key] = value.toString();
            return;
        }

        if (typeof value === "boolean") {
            form[key] = value ? 'true' : 'false';
            return;
        }

        if (Array.isArray(value)) {
            form[key] = value.join(',');
            return;
        }

        if (value instanceof Date) {
            form[key] = parseInt((value.getTime() / 1000).toFixed(0)).toString()
            return;
        }

        form[key] = value;
        return;
    }

    private static translateConfiguration(params:PushConfiguration) : Form {
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