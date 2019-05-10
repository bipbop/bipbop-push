import { PushParameters } from "./push-parameters";
/**
 * Consulta do PUSH
 */
export declare type PushQuery = {
    /**
     * Consulta
     */
    target: string;
    /**
     * Parâmetros
     */
    parameters?: PushParameters;
};
