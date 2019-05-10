import { PushParameters } from "./push-parameters";

/**
 * Consulta do PUSH
 */
export type PushQuery = {
    /**
     * Consulta
     */
    target: string,
    /**
     * Parâmetros
     */
    parameters?: PushParameters,
};