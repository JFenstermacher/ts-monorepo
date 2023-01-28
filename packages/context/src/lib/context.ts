import {
  ContextDefaults,
  Environment,
  Tags,
  StringCase,
  ContextInput,
  ContextType,
  NameAttributeKeys,
} from './types';
import { applyStrCase } from './utils';

const CONTEXT_DEFAULTS: ContextDefaults = {
  enabled: true,
  organization: "JFenstermacher",
  labelOrder: ["service", "environment", "name"],
  delimiter: "-",
  idLengthLimit: 255,
  tags: {},
  labelKeyCase: "title",
  labelValueCase: "lowercase",
  labelsAsTags: ["project", "service", "environment", "name"]
}

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
  _tags: Tags
  labelKeyCase: StringCase
  labelValueCase: StringCase
  labelsAsTags: NameAttributeKeys

  id: string
  idFull: string
  labelTags: Tags

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
    this._tags = merged.tags

    this.idFull = this._constructIdFull(merged);
    this.id = this.idFull.substring(0, this.idLengthLimit);

    this.labelTags = this._constructLabelTags(merged);
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
      tags: this._tags
    }
  }

  get tags(): Tags {
    const formattedTags: Tags = {};

    for (const [key, value] of Object.entries(this._tags)) {
      formattedTags[applyStrCase(key, this.labelKeyCase)] = applyStrCase(value, this.labelValueCase);
    }

    return {
      ...this.labelTags,
      ...formattedTags
    }
  }

  _constructIdFull(context: ContextType) {
    const parts: string[] = [];

    for (const label of context.labelOrder) {
      let value = context[label];

      if (!value) continue;

      if (Array.isArray(value)) parts.push(...value);
      else parts.push(value);
    }

    return parts.join(context.delimiter);
  }

  _constructLabelTags(context: ContextType) {
    const labelTags: Record<string, string> = {};

    for (const label of context.labelsAsTags) {
      let value = context[label];

      if (!value) continue;

      if (!Array.isArray(value)) value = [value];

      labelTags[applyStrCase(label, context.labelKeyCase)] = value
        .map(v => applyStrCase(v, context.labelValueCase))
        .join(',');
    }

    if (context.labelsAsTags.includes("name")) labelTags[applyStrCase("name", context.labelKeyCase)] = applyStrCase(this.id, context.labelValueCase);

    return labelTags;
  }

  _validate(context: ContextType) {
    if (!context.labelOrder || !context.labelOrder.length) {
      throw Error("At least one label has to be provided in 'labelOrder'")
    }
  }
}
