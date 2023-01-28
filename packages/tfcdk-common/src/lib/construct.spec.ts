import { Testing } from 'cdktf';
import { Context } from './context';
import { Construct } from './construct';

describe('Construct', () => {
  it('should manage context merging and creation', () => {
    let context = new Context({
      project: "initial",
      service: "initial"
    })

    Testing.synthScope((scope) => {
      const construct = new Construct(scope, 'test', {
        project: "overtop",
        context: context
      })

      context = construct.context;
    })

    expect(context).toMatchSnapshot()
  })
});
