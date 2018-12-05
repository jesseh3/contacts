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
});
