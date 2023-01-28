import { ContextKeys, ContextType, IdAttributeKeys } from "./types"

export const ID_KEYS: IdAttributeKeys = [
  "organization",
  "project",
  "service",
  "environment",
  "name",
  "attributes"
]

export const CONTEXT_KEYS: ContextKeys = [
  ...ID_KEYS,
  "enabled",
  "organization",
  "labelOrder",
  "delimiter",
  "idLengthLimit",
  "tags",
  "labelKeyCase",
  "labelValueCase",
  "labelsAsTags",
]

export const CONTEXT_DEFAULTS: ContextType = {
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
