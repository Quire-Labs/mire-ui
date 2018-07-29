import { register } from '../../api/authApi';

it('returns a response object', async () => {
  let res = await register({});
  expect(res.token).toBeTruthy();
  expect(res.content).toBeTruthy();
  expect(res.statusCode).toBeTruthy();
  expect(typeof res.statusCode).toBe('number');
});
