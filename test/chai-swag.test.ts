import * as chai from 'chai';
import cSwag from '../';

chai.use(cSwag);

chai.swag.ajv.addFormat('int32', {
  type: 'number',
  validate: (n) => Math.abs(n) < Math.pow(2, 31),
});

const expect = chai.expect;
const assert = chai.assert;
chai.should();

const definition = require('./resources/swagger.json');
const conformingResponse: ChaiHttp.Response = require('./resources/conforming-response.json');
const nonConformingResponse: ChaiHttp.Response = require('./resources/non-conforming-response.json');

describe('chai-swag test', () => {

  describe('conforming response will work for a good assertion', () => {

    it('expect passes', () => {
      expect(conformingResponse).to.conform.to.swagger(definition);
      expect(conformingResponse).to.conform.to.openApi(definition);
      expect(conformingResponse).to.conform.to.yaml(definition);
    });

    it('assert passes', () => {
      assert.swagger(conformingResponse, definition);
      assert.openApi(conformingResponse, definition);
      assert.yaml(conformingResponse, definition);
    });

    it('should passes', () => {
      conformingResponse.should.conform.to.swagger(definition);
      conformingResponse.should.conform.to.openApi(definition);
      conformingResponse.should.conform.to.yaml(definition);
    });

  });

  describe('non-conforming response will work for a negative assertion', () => {

    it('expect passes', () => {
      expect(nonConformingResponse).to.not.conform.to.swagger(definition);
      expect(nonConformingResponse).to.not.conform.to.openApi(definition);
      expect(nonConformingResponse).to.not.conform.to.yaml(definition);
    });

    it('assert passes', () => {
      assert.notSwagger(nonConformingResponse, definition);
      assert.notOpenApi(nonConformingResponse, definition);
      assert.notYaml(nonConformingResponse, definition);
    });

    it('should passes', () => {
      nonConformingResponse.should.not.conform.to.swagger(definition);
      nonConformingResponse.should.not.conform.to.openApi(definition);
      nonConformingResponse.should.not.conform.to.yaml(definition);
    });

  });

});
