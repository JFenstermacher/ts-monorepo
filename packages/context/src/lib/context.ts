export type EnvironmentLong = "sandbox" | "staging" | "uat" | "production" | "ephemeral" | "organization";
export type EnvironmentShort = "sandbox" | "staging" | "uat" | "prod" | "org" | "ephm";
export type Environment = EnvironmentLong | EnvironmentShort;

export type StringCase = "title" | "lowercase" | "uppercase"

type RequiredContextIdAttributes = {
  project: string
  service: string
  environment: Environment
}

type ContextTypeIdAttributes = {
  organization: string
  name: string
  attributes: string[]
} & RequiredContextIdAttributes

type Tags = {
  [k: string]: string
}

type NameAttributeKeys = Array<keyof ContextTypeIdAttributes>

export type ContextType = ContextTypeIdAttributes & {
  labelOrder: NameAttributeKeys
  delimiter: string
  idLengthLimit: number
  tags: Tags
  labelKeyCase: StringCase
  labelValueCase: StringCase
  labelsAsTags: NameAttributeKeys
  enabled: boolean
}

const CONTEXT_DEFAULTS: Partial<ContextType> = {
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

const ID_KEYS: NameAttributeKeys = [
  "organization",
  "project",
  "service",
  "environment",
  "name",
  "attributes"
];


export default class Context {
  organization?: string
  project?: string
  service?: string
  environment?: Environment
  name?: string
  attributes?: string[]

  enabled?: boolean
  labelOrder?: NameAttributeKeys
  delimiter?: string
  idLengthLimit?: number
  tags?: Tags
  labelKeyCase?: StringCase
  labelValueCase?: StringCase
  labelsAsTags?: NameAttributeKeys

  id: string
  idFull: string

  constructor(context: Context) {
    const merged = { ...CONTEXT_DEFAULTS, ...context };

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

    this.tags = merged.tags;

    this.id = "abc";
    this.idFull = "abc";
  }

  _createFullId(context: ContextType) {
    return "abc"
  }

  get context(): Partial<ContextType> {
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
      labelsAsTags: this.labelsAsTags
    }
  }

  _validate(context: Partial<ContextType>) {
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
