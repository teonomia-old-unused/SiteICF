/* eslint-disable no-undef */
// eslint-disable-next-line import/extensions
import * as Validations from './Validations';

describe('validation', () => {
  it('validate', async () => {
    const result = await Validations.validate({ email: 'test@test.com', password: '123', telephone: '321' }, Validations.register);
    expect(result).toStrictEqual({ email: 'test@test.com', password: '123', telephone: '321' });
  });
});