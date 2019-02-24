import { Swag, SwagOptions } from 'res-swag';

declare global {
  
  namespace Chai {
    
    export interface Assertion {
      swagger(definition: string | any, options?: Partial<SwagOptions>): void;
      openApi(definition: string | any, options?: Partial<SwagOptions>): void;
      yaml(definition: string | any, options?: Partial<SwagOptions>): void;
    }

    export interface Assert {
      swagger(response: ChaiHttp.Response, definition: string | any, options?: Partial<SwagOptions>): void;
      notSwagger(response: ChaiHttp.Response, definition: string | any, options?: Partial<SwagOptions>): void;
      openApi(response: ChaiHttp.Response, definition: string | any, options?: Partial<SwagOptions>): void;
      notOpenApi(response: ChaiHttp.Response, definition: string | any, options?: Partial<SwagOptions>): void;
      yaml(response: ChaiHttp.Response, definition: string | any, options?: Partial<SwagOptions>): void;
      notYaml(response: ChaiHttp.Response, definition: string | any, options?: Partial<SwagOptions>): void;
    }

    export interface LanguageChains {
      conform: Assertion;
    }

    export interface ChaiStatic {
      swag: Swag;
    }

  }
}
