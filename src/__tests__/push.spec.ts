import Push from '..';
import WebService from 'bipbop-webservice';
import NotFound from 'bipbop-webservice/exception-not-found';

const push = new Push(new WebService(process.env.APIKEY));

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

test('create-push-delete-id', async () => {
    const label = uuidv4();
    const response = await push.create({target: 'SELECT FROM \'INFO\'.\'INFO\''}, {}, label);
    expect(response.label).toBe(label);
    expect(typeof response.id).toBe('string');
    await push.delete(response);
});

test('create-push-delete-label', async () => {
    const label = uuidv4();
    const response = await push.create({target: 'SELECT FROM \'INFO\'.\'INFO\''}, {}, label); 
    expect(response.label).toBe(label);
    expect(typeof response.id).toBe('string');
    await push.delete({label: response.label});
});

test('push-status', async () => {
    await push.status({id: '5c70385bccce283ccc76d405'}); 
});

test('push-document-not-found', async () => {
    try {
        await push.document({id: '5c70385bccce283ccc76d405'});
        throw Error('Expecting a not found error');
    } catch(e) {
        if (!(e instanceof NotFound)) throw e; 
    }
});