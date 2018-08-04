import * as apiCalls from '../../api/authApiBridge';

describe('Every endpoint', () => {
  it('returns a response object', async () => {
    console.log(apiCalls);
    for (let name in apiCalls) {
      await expectEndpointReturnsResponseObject(apiCalls[name]);
    }
  });

  async function expectEndpointReturnsResponseObject(call) {
    let res = await call();
    expect(res.token).toBeTruthy();
    expect(res.content).toBeTruthy();
    expect(res.statusCode).toBeTruthy();
    expect(typeof res.statusCode).toBe('number');
  }
});
