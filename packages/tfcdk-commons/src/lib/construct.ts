import { Construct as BaseConstruct } from 'constructs';
import { CONTEXT_KEYS } from './consts';
import { Context } from './context';
import { ConstructConfig } from './types';

export class Construct extends BaseConstruct {
  context: Context

  constructor(scope: BaseConstruct, id: string, config: ConstructConfig) {
    super(scope, id);

    this.context = this._extractContextFromConfig(config);
  }

  _extractContextFromConfig(config: ConstructConfig): Context {
    const context: Record<string, any> = config.context ?? {};

    for (const key of CONTEXT_KEYS) {
      const value = config[key];

      if (value) context[key] = value;
    }

    return new Context(context);
  }
}
