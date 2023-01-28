import { Construct as BaseConstruct } from 'constructs';
import { Context } from './context';
import { ConstructConfig } from './types';

export class Construct extends BaseConstruct {
  context: Context

  constructor(scope: BaseConstruct, id: string, config: ConstructConfig) {
    super(scope, id);
    const context = Context.extractContext(config)

    this.context = new Context({
      ...config.context,
      ...context
    });
  }
}

