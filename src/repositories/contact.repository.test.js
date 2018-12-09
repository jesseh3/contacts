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

  it('should throw an error when listing fails', async () => {
    const dockClientStub = sinon.stub(mockDocClient, 'scan');
    dockClientStub.onCall(0).returns(createAwsRequest(null, false));

    try {
      const results = await respository.list();
    } catch(err) {
      expect(err).to.exist;
      expect(err.message).to.equal('error');
    }
  });

  it('should get a contact by id', async () => {
    const expectedResult = {
      Item: Object.assign({}, mockContacts[0])
    };

    const dockClientStub = sinon.stub(mockDocClient, 'get');
    dockClientStub.onCall(0).returns(createAwsRequest(expectedResult));

    const id = '2'
    const awsParams = {
      TableName: 'contacts',
      Key: { id }
    };

    const contact = await respository.get(id);

    expect(contact).to.equal(expectedResult.Item);
    sinon.assert.calledWith(dockClientStub, awsParams)
  });

  it('should put a new item in the db', async () => {
    const expectedResult = Object.assign({}, mockContacts[1]);

    const dockClientStub = sinon.stub(mockDocClient, 'put');
    dockClientStub.onCall(0).returns(createAwsRequest({Item: expectedResult}));

    const awsParams = {
      TableName: 'contacts',
      Item: expectedResult,
    };

    const contact = await respository.put(expectedResult);

    expect(contact).to.equal(expectedResult);
    sinon.assert.calledWith(dockClientStub, awsParams);
  });

  it('should delete a contact by id', async () => {
    const contact = Object.assign({}, mockContacts[1]);

    const dockClientStub = sinon.stub(mockDocClient, 'delete');
    dockClientStub.onCall(0).returns(createAwsRequest({Key: contact.id}));

    const awsParams = {
      TableName: 'contacts',
      Key: {id: contact.id},
    };

    const id = await respository.delete(contact.id);
    expect(id).to.equal(contact.id);
    sinon.assert.calledWith(dockClientStub, awsParams);
  });

});
