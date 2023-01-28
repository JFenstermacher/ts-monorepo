export type EnvironmentLong = "sandbox" | "staging" | "uat" | "production" | "ephemeral" | "organization";
export type EnvironmentShort = "sandbox" | "staging" | "uat" | "prod" | "org" | "ephm";
export type Environment = EnvironmentLong | EnvironmentShort;

export type StringCase = "title" | "lowercase" | "uppercase"

export type RequiredContextIdAttributes = {
  project: string
  service: string
  environment: Environment
}

export type OptionalContextIdAttributes = {
  organization: string
  name: string
  attributes: string[]
}

export type ContextIdAttributes = RequiredContextIdAttributes & OptionalContextIdAttributes;

export type NameAttributeKey = keyof ContextIdAttributes
export type NameAttributeKeys = NameAttributeKey[]

export type ContextMetaAttributes = {
  labelOrder: NameAttributeKeys
  delimiter: string
  idLengthLimit: number
  tags: Tags
  labelKeyCase: StringCase
  labelValueCase: StringCase
  labelsAsTags: NameAttributeKeys
  enabled: boolean
}

export type Tags = Record<string, string>

export type ContextType = RequiredContextIdAttributes & Partial<OptionalContextIdAttributes> & ContextMetaAttributes
export type ContextInput = RequiredContextIdAttributes & Partial<OptionalContextIdAttributes> & Partial<ContextMetaAttributes>

export type ContextDefaults = Partial<OptionalContextIdAttributes> & ContextMetaAttributes;
