# Chai Swag 

> Chai plugin for assertion of Chai HTTP responses against Swagger/OpenAPI Specification


The library provides [Chai](http://chaijs.com/) assertions for responses from http requests made using [Chai-HTTP](https://www.chaijs.com/plugins/chai-http/) against documented response schema in [Swagger/OpenAPI](https://swagger.io/docs/specification/about/) Specification using the schema validator [Ajv](https://ajv.js.org/).

Chai Swag comes with [TypeScript](https://www.typescriptlang.org/) typings
and works alongside [Chai-HTTP](https://github.com/domenic/chai-http).

---

## Installation

```
npm install chai-swag
```

---

# Summary
- [Chai Swag](#chai-swag)
  - [Installation](#installation)
- [Summary](#summary)
  - [Usage](#usage)
  - [Assertions](#assertions)
  - [Parameters](#parameters)
    - [Options](#options)
  - [Ajv](#ajv)

---

## Usage

```javascript
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import chaiSwag from 'chai-swag';

chai.use(chaiHttp);
chai.use(chaiSwag);

const definition = require('swagger.yaml');

it(`check that an API's response matches the documented response`, async () => {
  await chai.request('http://localhost:8080')
    .get('/')
    .then(r => chai.assert.swagger(r, definition, options));
});

it('check another Response', async () => {
  const response = await chai.request('http://localhost:8080').get('/');
  
  chai.expect(response).to.conform.to.swagger(definition, { ignoreUnknownServer: false });
});
```

---

## Assertions

Chai Swag provides the assertion methods ```swagger```, ```openApi```, and ```yaml``` (same assertion)
and the property ```conform``` as syntactic sugar.

Examples:
```javascript
expect(response).to.conform.to.swagger(definition);
expect(response).to.conform.to.swagger(definition, options);

assert.swagger(response, definition);
assert.swagger(response, definition, options);

response.should.conform.to.swagger(definition);
response.should.conform.to.swagger(definition, options);
```

---

## Parameters
The assertion methods takes the following parameters ```response```, ```definition```, and ```options```:

* ```response``` - is the ChaiHttp.Response object that comes back from chai HTTP request

* ```definition``` - a swagger definition in the form of a YAML string or a json object (parsed)

* ```options``` - the flags that are used chai-swag for different modes of validation.
The values of these flags are true by default:

```javascript
{
  banUnknownProperties: true,
  implicitNullableProperties: true,
  implicitNullableObjects: true,
  ignoreUnknownServer: true
}
```

### Options
* ```banUnknownProperties``` - when the swagger definition does not explicitly block additional/unknown properties, this flag allows these properties that are not specified in the definition to be caught

* ```implicitNullableProperties``` - when the swagger definition has not explicity declared that properties can be nullable, this allows properties to come back null

* ```implicitNullableObjects``` - when the swagger definition has not explicity declared that objects can be nullable, this allows objects to come back null

* ```ignoreUnknownServer``` - sometimes the swagger definition may not describe all the servers on which the development/testing are done on, with this flag set, the validator with continue even if the request was made on a server that does not match the ones defined in the definition. When this happens the validator will try to guess the basePath of unknown the server based on the swagger definition and use that to identify the correct path

Options can be set per validation (see the #Usage), and also can also be set at a higher level so that every validation will inherit the user's choice of defaults, like the following: 
```javascript
chai.swag.options.banUnknownProperties = false;
chai.swag.options.implicitNullableObjects = false;
```

---

## Ajv 

Ajv properties and functions can be accessed by ```chai.swag.ajv``` like so:
```javascript
chai.swag.ajv.addFormat('int32', {
  type: 'number',
  validate: (n) => Math.abs(n) < Math.pow(2, 31),
});
```
