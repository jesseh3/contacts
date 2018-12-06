const { withStatusCode } = require('../../src/utils/response.util');
const expect = require('chai').expect;

describe('Response Utility', () => {

  it('should throw error for bad status code', () => {
    const statusCode = 42;
    const badCall = () => withStatusCode(statusCode);
    expect(badCall).to.throw('status code out of range');
  });

  it('should return status code as part of a response object', () => {
    const statusCode = 200;
    const ok = withStatusCode(200);
    const actual = ok();
    expected = { statusCode: 200 };
    expect(actual).to.deep.equal(expected);
  });

  it('should return data as the body of a response object', () => {
    const statusCode = 200;
    const ok = withStatusCode(200);
    const data = 'foo';
    const actual = ok(data);
    expected = { statusCode: 200, body: 'foo' };
    expect(actual).to.deep.equal(expected);
  });

  it('should not return a body if there is none', () => {
    const statusCode = 200;
    const ok = withStatusCode(200);
    const data = null;
    const actual = ok(data);
    expected = { statusCode: 200 };
    expect(actual).to.deep.equal(expected);
  });
  //
  // it('should error if body is not defined', () => {
  //   const body = null;
  //   const parseJson = parseWith(JSON.parse);
  //
  //   const parserCall = () => parseJson(body);
  //
  //   expect(parserCall).to.throw('Missing text.');
  // });
});
