import WebService from 'bipbop-webservice';
import { PushQuery } from './types/push-query';
import { PushConfiguration } from './types/push-configuration';
import { PushIdentificator } from './types/push-identificator';
import { PushStatus } from './types/push-status';
import { PushParameters } from './types/push-parameters';
export { PushStatus, PushIdentificator, PushQuery, PushConfiguration, PushParameters };
export default class PushManager {
    readonly endpoint: string;
    readonly ws: WebService;
    constructor(ws: WebService, endpoint?: string);
    create(pushQuery: PushQuery, configuration?: PushConfiguration, label?: string): Promise<PushIdentificator>;
    private static translateConfiguration;
    private static addParameter;
    private static validateIdentificator;
    status(identificator: PushIdentificator): Promise<PushStatus>;
    document(identificator: PushIdentificator): Promise<any>;
    delete(identificator: PushIdentificator): Promise<void>;
}
