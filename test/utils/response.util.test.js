const { withStatusCode } = require('../../src/utils/response.util');
const expect = require('chai').expect;

describe('Response Utility', () => {

  it('should throw error for bad status code', () => {
    const lowStatus = 1;
    const highStatus = 600;
    const badCallLow = () => withStatusCode(lowStatus);
    const badCallHigh = () => withStatusCode(highStatus);

    expect(badCallLow).to.throw('status code out of range');
    expect(badCallHigh).to.throw('status code out of range');
  });

  it('should return status code as part of a response object', () => {
    const statusCode = 200;
    const ok = withStatusCode(200);
    const actual = ok();
    expected = { statusCode: 200 };
    expect(actual).to.deep.equal(expected);
  });


  it('should not return a body if there is none', () => {
    const statusCode = 200;
    const ok = withStatusCode(200, JSON.stringify);
    const data = {one: 'uno', "two": 2};
    const actual = ok(data);
    expected = { statusCode: 200, body: JSON.stringify(data) };
    expect(actual).to.deep.equal(expected);
  });

  it('should be able to format data', () => {
    const statusCode = 200;
    const ok = withStatusCode(200);
    const data = 'foo';
    const actual = ok(data);
    expected = { statusCode: 200, body: 'foo' };
    expect(actual).to.deep.equal(expected);
  });

  it('should not format data if no formater provided', () => {
    const statusCode = 200;
    const ok = withStatusCode(200);
    const data = 'foo';
    const actual = ok(data);
    expected = { statusCode: 200, body: 'foo' };
    expect(actual).to.deep.equal(expected);
  });
});
