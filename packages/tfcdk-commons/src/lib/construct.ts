import { Construct as BaseConstruct } from 'constructs';
import { CONTEXT_KEYS } from './consts';
import { Context } from './context';
import { ConstructProps } from './types';

export class Construct extends BaseConstruct {
  context: Context

  constructor(scope: BaseConstruct, id: string, props: ConstructProps) {
    super(scope, id);

    this.context = this._extractContextFromProps(props);
  }

  _extractContextFromProps(props: ConstructProps): Context {
    const initial: Record<string, any> = props.context ?? {};

    return Context.extract(props, CONTEXT_KEYS, initial);
  }
}
