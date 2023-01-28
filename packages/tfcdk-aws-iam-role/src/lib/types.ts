import * as aws from '@cdktf/provider-aws';
import { AwsProvider } from "@cdktf/provider-aws/lib/provider"
import { ContextInput, ContextType } from "@JFenstermacher/context"

export type PrincipalTypes = "AWS" | "Service" | "Federated" | "CanonicalUser" | "*"
export type PrincipalIdentifiers = Record<keyof PrincipalTypes, string[]>

export type AssumeRoleConfig = {
  principals?: PrincipalIdentifiers
  actions?: string[]
  config?: aws.dataAwsIamPolicyDocument.DataAwsIamPolicyDocumentConfig
}

export type AwsIamRoleConfig = ContextInput & {
  context?: ContextType
  provider?: AwsProvider
  assumeRolePrincipals?: PrincipalIdentifiers
  assumeRoleActions?: string[]
  roleConfig: aws.dataAwsIamPolicyDocument.DataAwsIamPolicyDocumentConfig
}
