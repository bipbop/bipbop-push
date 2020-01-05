import { PushParameters } from "./push-parameters"

/**
 * Consulta do PUSH
 */
export interface PushQuery {
    /**
     * Consulta
     */
    target: string;
    /**
     * Parâmetros
     */
    parameters?: PushParameters;
}