import { AwsProvider } from "@cdktf/provider-aws/lib/provider"
import { ConstructProps } from '@JFenstermacher/tfcdk-commons';
import { DataAwsIamPolicyDocumentConfig } from '@cdktf/provider-aws/lib/data-aws-iam-policy-document';

export type Effect = "Allow" | "Deny"
export type PrincipalTypes = "AWS" | "Service" | "Federated" | "CanonicalUser" | "*"
export type Principals = Record<keyof PrincipalTypes, string[]>

export type Condition = {
  [operator: string]: {
    [key: string]: string | string[]
  }
}

export type PolicyStatement = {
  sid?: string
  actions: string[]
  effect?: Effect
  condition?: Condition[]
}

export type Policy = PolicyStatement[]

export type AssumeRolePolicyStatement = Partial<PolicyStatement> & {
  principals: Principals
}

export type AssumeRolePolicy = AssumeRolePolicyStatement[]

export type InlinePolicy = Record<string, DataAwsIamPolicyDocumentConfig>

export type AwsIamRoleProps = ConstructProps & {
  provider?: AwsProvider
  assumeRolePolicy: DataAwsIamPolicyDocumentConfig
  inlinePolicy?: InlinePolicy
  managedPolicies: string[]
  maxSessionDuration?: number
  permissionsBoundary?: string
}
