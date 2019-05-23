import BIPBOPException from 'bipbop-webservice/exception'

export default class PushManagerException extends BIPBOPException {
    constructor(msg: string | undefined) {
        super(msg);
        Object.setPrototypeOf(this, PushManagerException.prototype);
    }
}