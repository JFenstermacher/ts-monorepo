import {
  ContextDefaults,
  NameAttributeKey,
  Environment,
  Tags,
  StringCase,
  ContextInput,
  ContextType,
  ContextIdAttributes,
  NameAttributeKeys
} from './types';
import { applyStrCase } from './utils';

const CONTEXT_DEFAULTS: ContextDefaults = {
  enabled: true,
  organization: "JFenstermacher",
  labelOrder: ["service", "environment", "name"],
  delimiter: "-",
  idLengthLimit: 255,
  tags: {},
  labelKeyCase: "lowercase",
  labelValueCase: "lowercase",
  labelsAsTags: ["project", "service", "environment", "name"]
}

const ID_KEYS: NameAttributeKey[] = [
  "organization",
  "project",
  "service",
  "environment",
  "name",
  "attributes"
];


export default class Context {
  organization?: string
  project: string
  service: string
  environment: Environment
  name?: string
  attributes?: string[]

  enabled: boolean
  labelOrder: NameAttributeKeys
  delimiter: string
  idLengthLimit: number
  tags: Tags
  labelKeyCase: StringCase
  labelValueCase: StringCase
  labelsAsTags: NameAttributeKeys

  id: string
  idFull: string

  constructor(context: ContextInput) {
    const merged = { ...CONTEXT_DEFAULTS, ...context };

    this._validate(merged);

    this.organization = merged.organization;
    this.project = merged.project;
    this.service = merged.service;
    this.environment = merged.environment;
    this.name = merged.name;
    this.attributes = merged.attributes;
    this.enabled = merged.enabled;
    this.labelOrder = merged.labelOrder;
    this.delimiter = merged.delimiter;
    this.idLengthLimit = merged.idLengthLimit;
    this.labelKeyCase = merged.labelKeyCase;
    this.labelValueCase = merged.labelValueCase;
    this.labelsAsTags = merged.labelsAsTags;

    this.idFull = this._constructIdFull(merged);
    this.id = this.idFull.substring(0, this.idLengthLimit);

    this.tags = this._constructTags(merged);
  }

  get context(): ContextType {
    return {
      organization: this.organization,
      project: this.project,
      service: this.service,
      environment: this.environment,
      name: this.name,
      attributes: this.attributes,
      enabled: this.enabled,
      labelOrder: this.labelOrder,
      delimiter: this.delimiter,
      idLengthLimit: this.idLengthLimit,
      labelKeyCase: this.labelKeyCase,
      labelValueCase: this.labelValueCase,
      labelsAsTags: this.labelsAsTags,
      tags: this.tags
    }
  }

  _constructIdFull(context: ContextType) {
    const idAttributes = this._getIdAttributes(context);

    return Object.values(idAttributes).join(this.delimiter);
  }

  _constructTags(context: ContextType) {
    const tags: Tags = {};

    const idAttributes = this._getIdAttributes(context);

    for (let [key, value] of Object.entries(idAttributes)) {
      if (Array.isArray(value)) {
        value = value
          .map(v => applyStrCase(v, context.labelValueCase))
          .join(",");
      }

      tags[applyStrCase(key, context.labelKeyCase)] = value;
    }

    return {
      ...tags,
      ...context.tags,
      name: this.id
    };
  }

  _getIdAttributes(context: ContextType): ContextIdAttributes {
    const idAttributes: Partial<ContextIdAttributes> = {}

    for (const label of context.labelOrder) {
      const value = context[label];

      if (value) idAttributes[label] = value as any;
    }

    return idAttributes as ContextIdAttributes;
  }


  _validate(context: ContextType) {
    if (!context.labelOrder || !context.labelOrder.length) {
      throw Error("At least one label has to be provided in 'labelOrder'")
    }

    const hasIdAttribute = ID_KEYS.reduce((retval, key) => {
      if (context[key]) retval = true;

      return retval;
    }, false)

    if (!hasIdAttribute) {
      throw Error(`At least one ID attribute must be defined: [${ID_KEYS.join(", ")}]`)
    }
  }
}
