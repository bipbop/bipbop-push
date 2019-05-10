import { PushException } from "./push-exception";

/**
 * Estado do PUSH
 */
export type PushStatus = {
    /**
     * Quantidade de versões com sucesso
     */
    version?: number,
    /**
     * Data de criação
     */
    created?: Date,
    /**
     * Tentativas
     */
    trys?: number,

    /**
     * Está quebrado?
     */
    hasException?: boolean,

    /**
     * Exceção
     */
    exception?: PushException,
    /**
     * Quantidade de execuções
     */
    executions?: number,
    /**
     * Quantidade de execuções com sucesso
     */
    successExecutions?: number,
    /**
     * Data da próxima execução (pode ser no passado, neste caso está atrasado)
     */
    nextJob?: Date,
    /**
     * Data da última execução
     */
    lastRun?: Date,
    /**
     * Data da última execução com sucesso
     */
    lastSuccessRun?: Date,
    /**
     * Data da execução esperada com sucesso
     */
    expectedNextJob?: Date,

};
