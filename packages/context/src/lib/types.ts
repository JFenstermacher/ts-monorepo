export type EnvironmentLong = "sandbox" | "staging" | "uat" | "production" | "ephemeral" | "organization";
export type EnvironmentShort = "sandbox" | "staging" | "uat" | "prod" | "org" | "ephm";
export type Environment = EnvironmentLong | EnvironmentShort;

export type StringCase = "title" | "lowercase" | "uppercase"

export type ContextIdAttributes = {
  project: string
  service: string
  environment: Environment
  organization: string
  name: string
  attributes: string[]
}

export type IdAttributeKey = keyof ContextIdAttributes
export type IdAttributeKeys = IdAttributeKey[]

export type ContextMetaAttributes = {
  labelOrder: IdAttributeKeys
  delimiter: string
  idLengthLimit: number
  tags: Tags
  labelKeyCase: StringCase
  labelValueCase: StringCase
  labelsAsTags: IdAttributeKeys
  enabled: boolean
}

export type Tags = Record<string, string>

export type ContextType = Partial<ContextIdAttributes> & ContextMetaAttributes
export type ContextInput = Partial<ContextIdAttributes> & Partial<ContextMetaAttributes>
export type ExtractableContext = ContextInput & {
  [k: string]: any
}

export type ContextKey = keyof ContextType
export type ContextKeys = ContextKey[]
