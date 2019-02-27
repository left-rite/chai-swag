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
const conformingResponseRequest: ChaiHttp.Response = require('./resources/response-request/conforming-response.json');
const nonConformingResponseRequest: ChaiHttp.Response = require('./resources/response-request/non-conforming-response.json');
const conformingResponseReq: ChaiHttp.Response = require('./resources/response-req/conforming-response.json');
const nonConformingResponseReq: ChaiHttp.Response = require('./resources/response-req/non-conforming-response.json');

describe('chai-swag test', () => {

  describe('conforming response (with response.reqest) will work for a good assertion', () => {

    it('expect passes', () => {
      expect(conformingResponseRequest).to.conform.to.swagger(definition);
      expect(conformingResponseRequest).to.conform.to.openApi(definition);
      expect(conformingResponseRequest).to.conform.to.yaml(definition);
    });

    it('assert passes', () => {
      assert.swagger(conformingResponseRequest, definition);
      assert.openApi(conformingResponseRequest, definition);
      assert.yaml(conformingResponseRequest, definition);
    });

    it('should passes', () => {
      conformingResponseRequest.should.conform.to.swagger(definition);
      conformingResponseRequest.should.conform.to.openApi(definition);
      conformingResponseRequest.should.conform.to.yaml(definition);
    });

  });

  describe('non-conforming response (with response.request) will work for a negative assertion', () => {

    it('expect passes', () => {
      expect(nonConformingResponseRequest).to.not.conform.to.swagger(definition);
      expect(nonConformingResponseRequest).to.not.conform.to.openApi(definition);
      expect(nonConformingResponseRequest).to.not.conform.to.yaml(definition);
    });

    it('assert passes', () => {
      assert.notSwagger(nonConformingResponseRequest, definition);
      assert.notOpenApi(nonConformingResponseRequest, definition);
      assert.notYaml(nonConformingResponseRequest, definition);
    });

    it('should passes', () => {
      nonConformingResponseRequest.should.not.conform.to.swagger(definition);
      nonConformingResponseRequest.should.not.conform.to.openApi(definition);
      nonConformingResponseRequest.should.not.conform.to.yaml(definition);
    });

  });

  describe('conforming response (with response.req) will work for a good assertion', () => {

    it('expect passes', () => {
      expect(conformingResponseReq).to.conform.to.swagger(definition);
      expect(conformingResponseReq).to.conform.to.openApi(definition);
      expect(conformingResponseReq).to.conform.to.yaml(definition);
    });

    it('assert passes', () => {
      assert.swagger(conformingResponseReq, definition);
      assert.openApi(conformingResponseReq, definition);
      assert.yaml(conformingResponseReq, definition);
    });

    it('should passes', () => {
      conformingResponseReq.should.conform.to.swagger(definition);
      conformingResponseReq.should.conform.to.openApi(definition);
      conformingResponseReq.should.conform.to.yaml(definition);
    });

  });

  describe('non-conforming response (with response.req) will work for a negative assertion', () => {

    it('expect passes', () => {
      expect(nonConformingResponseReq).to.not.conform.to.swagger(definition);
      expect(nonConformingResponseReq).to.not.conform.to.openApi(definition);
      expect(nonConformingResponseReq).to.not.conform.to.yaml(definition);
    });

    it('assert passes', () => {
      assert.notSwagger(nonConformingResponseReq, definition);
      assert.notOpenApi(nonConformingResponseReq, definition);
      assert.notYaml(nonConformingResponseReq, definition);
    });

    it('should passes', () => {
      nonConformingResponseReq.should.not.conform.to.swagger(definition);
      nonConformingResponseReq.should.not.conform.to.openApi(definition);
      nonConformingResponseReq.should.not.conform.to.yaml(definition);
    });

  });

});