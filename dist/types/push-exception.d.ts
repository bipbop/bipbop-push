/**
 * Exceção do PUSH
 */
export declare type PushException = {
    /**
     * Tipo da exceção
     */
    type: string;
    /**
     * Código
     */
    code: number;
    /**
     * Mensagem
     */
    message: string;
    /**
     * ID de LOG
     */
    log: string;
    /**
     * ID de Exceção
     */
    id: string;
};
