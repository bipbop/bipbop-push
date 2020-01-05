/**
 * Configuração do PUSH
 */
export interface PushConfiguration {
    /**
     * Data da próxima execução (pode ser no passado; neste caso está atrasado)
     */
    nextJob?: Date;
    /**
     * Prioridade; quanto maior; melhor
     */
    priority?: number;
    /**
     * Intervalo em segundos entre as consultas
     */
    interval?: number;
    /**
     * Em caso de falha tenta novamente em X segundos
     */
    retryIn?: number;
    /**
     * URL de CALLBACK
     */
    callback?: string;
    /**
     * Quantidade máxima de versões com sucesso antes de ser deletado
     */
    maxVersion?: number;
    /**
     * Marcadores inteligentes
     */
    tags?: string[];
    /**
     * O resultado deve ser transmitido via WebSocket?
     */
    webSocketDeliver?: boolean;
    /**
     * Quantidade máxima de tentativas para entregar o resultado em um ENDPOINT
     */
    maxCallbackTrys?: number;
    /**
     * Realizar próximas versões apenas em dias comerciais
     */
    weekdays?: boolean;
}
