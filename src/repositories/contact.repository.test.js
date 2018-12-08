const expect = require('chai').expect;
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

  /** @type {ContactsRepository} */
  let respository;

  beforeEach(() => {
    respository = new ContactRepository(mockDocClient);
  });

  it('should construct a new respository', () => {

    expect(respository).to.exist;
  });
  //
  // it('should list contacts', async () => {
  //   const expectedResult = {
  //     Items: mockContacts.slice()
  //   };
  //
  //   spyOn(mockDocClient, 'scan').and.returnValues(createAwsRequest(expectedResult), createAwsRequest({ Items: null }));
  //
  //   const awsParams = {
  //     TableName: 'contacts'
  //   };
  //
  //   const results = await respository.list();
  //
  //   expect(results).toEqual(expectedResult.Items);
  //   expect(results.length).toBe(3);
  //   expect(mockDocClient.scan).toHaveBeenCalledWith(awsParams);
  //
  //   const emptyResults = await respository.list();
  //
  //   expect(emptyResults).toEqual([]);
  // });
});
