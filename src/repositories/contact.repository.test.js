const expect = require('chai').expect;
const sinon = require('sinon');
const { ContactRepository } = require('./contact.repository');

describe('Contacts Repository', () => {
  /** @type {AWS.DynamoDB.DocumentClient} */
  const mockDocClient = {
    scan: params => { },
    // query: params => mockAwsRequest,
    get: params => { },
    put: params => { },
    delete: params => { },
    // update: params => { }
  };

  const mockContacts = [
    { id: '1', name: 'Jin Erso' },
    { id: '2', name: 'Luke Skywalker' },
    { id: '3', name: 'Darth Vadar' }
  ];

  const createAwsRequest = (data = null, resolveOrReject = true, errMsg = 'error') => {
    return {
      promise: () => resolveOrReject ? Promise.resolve(data) : Promise.reject(new Error('error'))
    };
  };

  /** @type {ContactsRepository} */
  let respository;

  beforeEach(() => {
    respository = new ContactRepository(mockDocClient);
  });

  afterEach(() => {
    sinon.restore();
  })


  it('should construct a new respository', () => {
    expect(respository).to.exist;
  });

  it('should list contacts', async () => {
    const expectedResult = {
      Items: mockContacts
    };

    const dockClientStub = sinon.stub(mockDocClient, 'scan');
    dockClientStub.onCall(0).returns(createAwsRequest(expectedResult));
    dockClientStub.onCall(1).returns(createAwsRequest({ Items: null }));

    const awsParams = {
      TableName: 'contacts'
    };

    const results = await respository.list();

    expect(results).to.equal(expectedResult.Items);
    expect(results.length).to.equal(3);
    sinon.assert.calledWith(dockClientStub, awsParams)

    const emptyResults = await respository.list();

    expect(emptyResults).to.be.empty;
  });

});
