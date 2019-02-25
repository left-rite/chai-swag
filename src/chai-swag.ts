import * as jc from 'json-cycle';
import * as jsYaml from 'js-yaml';
import { Swag, SwagOptions } from 'res-swag';

export default function chaiSwag(chai: any, utils: any) {

  const paths = {
    url: 'req.url',
    method: 'req.method',
    status: 'status',
    contentType: 'headers.content-type',
    responseBody: 'text',
  }
    
  chai.swag = new Swag(paths, {}, { allErrors: true });

  function swaggerAssertion(definition: string | any, options: Partial<SwagOptions>) {
    
    const swagger = typeof definition === 'string' 
      ? jsYaml.safeLoad(definition, { schema: jsYaml.JSON_SCHEMA }) 
      : definition;

    const response = jc.decycle(this._obj);
  
    const result = chai.swag.validate(swagger, response, options);
  
    this.assert(result === true,
      `${JSON.stringify(result, null, 2)}`,
      `Expected the response body to NOT conform to schema`);
      
  }

  chai.Assertion.addProperty('conform', a => a);
  
  chai.Assertion.addMethod('swagger', swaggerAssertion);

  chai.Assertion.addMethod('openApi', swaggerAssertion);

  chai.Assertion.addMethod('yaml', swaggerAssertion);

  chai.assert.swagger = (val, exp, opt, msg) => new chai.Assertion(val, msg).to.swagger(exp, opt);
  
  chai.assert.notSwagger = (val, exp, opt, msg) => new chai.Assertion(val, msg).to.not.swagger(exp, opt);

  chai.assert.openApi = (val, exp, opt, msg) => new chai.Assertion(val, msg).to.swagger(exp, opt);
  
  chai.assert.notOpenApi = (val, exp, opt, msg) => new chai.Assertion(val, msg).to.not.swagger(exp, opt);

  chai.assert.yaml = (val, exp, opt, msg) => new chai.Assertion(val, msg).to.swagger(exp, opt);
  
  chai.assert.notYaml = (val, exp, opt, msg) => new chai.Assertion(val, msg).to.not.swagger(exp, opt);
  
};
