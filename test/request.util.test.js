const { parseWith } = require('../src/utils/request.util');
const expect = require('chai').expect;



const mockJSON = {
  parse: (text) => null
};

describe('Request Utility', () => {
  it('should parse the body', () => {
    const myObj = { id: '1', name: 'John Doe'};

    const body = JSON.stringify(myObj);

    const parseJson = parseWith(JSON.parse);

    const parsed = parseJson(body);

    const expected = myObj;

    expect(parsed).to.deep.equal(expected);
  });

  it('should error if body cannot be parsed', () => {
    const body = `{"id": "1", "name": "John Doe"`; // bad json string
    const parseJson = parseWith(null);

    const parserCall = () => parseJson(body);

    expect(parserCall).to.throw('Missing a parser.');
  });

  it('should error if body is not defined', () => {
    const body = null;
    const parseJson = parseWith(JSON.parse);

    const parserCall = () => parseJson(body);

    expect(parserCall).to.throw('Missing text.');
  });
});
