import Context from './context';
import { ContextInput } from './types';

describe('Context', () => {
  const baseContext = new Context({
    project: "project",
    service: "service",
    environment: "sandbox"
  });

  const getContext = (contextInput: Partial<ContextInput>) => new Context({
    ...baseContext.context,
    ...contextInput
  })

  it('should be able to dump context with defualts merged', () => {
    expect(baseContext.context).toMatchSnapshot();
  })

  it('should fail validation if labelOrder has no values', () => {
    expect(() => getContext({
      labelOrder: []
    })).toThrowError();
  })

  it('should write labels as tags', () => {
    expect(baseContext.tags).toMatchSnapshot();
  })

  it('should filter tags based on labelsAsTags', () => {
    const context = getContext({
      labelsAsTags: ["name"]
    })

    expect(context.tags).toMatchSnapshot();
  })

  it('should merge user tags over default tags', () => {
    const context = getContext({
      tags: {
        service: "huh",
        environment: "what"
      }
    })

    expect(context.tags).toMatchSnapshot();
  })

  it('should allow changing tag value case', () => {
    const context = getContext({
      labelValueCase: "uppercase",
      attributes: ["attr1", "attr2"],
      labelsAsTags: [...baseContext.labelsAsTags, "attributes"]
    })

    expect(context.tags).toMatchSnapshot();
  })
});
