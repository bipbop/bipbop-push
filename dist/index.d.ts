import WebService from 'bipbop-webservice';
import { PushQuery } from './types/push-query';
import { PushConfiguration } from './types/push-configuration';
import { PushIdentificator } from './types/push-identificator';
import { PushStatus } from './types/push-status';
/**
 * Gerenciamento de PUSH da BIPBOP
 */
export default class PushManager {
    /**
     * Instância o serviço
     * @param key Chave de acesso da BIPBOP
     * @param endpoint Endereço do serviço de PUSH na BIPBOP
     */
    static fromKey(key: string, endpoint?: string): PushManager;
    /**
     * Endpoint do serviço
     */
    readonly endpoint: string;
    /**
     * Instância do WebService
     */
    readonly webservice: WebService;
    /**
     * Inicializa o serviço de PUSH
     * @param webservice O WebService da BIPBOP
     * @param endpoint O endpoint
     */
    constructor(webservice: WebService, endpoint?: string);
    create(pushQuery: PushQuery, configuration?: PushConfiguration, label?: string): Promise<PushIdentificator>;
    status(identificator: PushIdentificator, isDeleted?: boolean): Promise<PushStatus>;
    document(identificator: PushIdentificator): Promise<any>;
    delete(identificator: PushIdentificator): Promise<void>;
    private static validateIdentificator;
    private static addParameter;
    private static translateConfiguration;
}
