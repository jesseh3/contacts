const { parseWith } = require('./request.util');
const expect = require('chai').expect;



const mockJSON = {
  parse: (text) => null
};

describe('Request Utility', () => {
  it('should parse the body', () => {
    const body = JSON.stringify({ id: '1', name: 'John Doe'});
    
    const parsed = parseJson(body);

    expect(parsed)toEqual(expected);
    expect(mockJSON.parse).toHaveBeenCalled();
  });
});
