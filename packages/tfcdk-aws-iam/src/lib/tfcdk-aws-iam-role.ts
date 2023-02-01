import { IamRole, IamRoleInlinePolicy } from '@cdktf/provider-aws/lib/iam-role';
import { DataAwsIamPolicyDocument } from '@cdktf/provider-aws/lib/data-aws-iam-policy-document';
import { DataAwsIamPolicy } from '@cdktf/provider-aws/lib/data-aws-iam-policy';
import { Construct } from '@JFenstermacher/tfcdk-commons';
import { AwsIamRoleProps, InlinePolicy } from './types';

export class AwsIamRole extends Construct {
  assumeRolePolicyDocument: DataAwsIamPolicyDocument
  inlinePolicies?: Record<string, DataAwsIamPolicyDocument>
  permissionsBoundary?: DataAwsIamPolicy
  role: IamRole

  constructor(scope: Construct, id: string, props: AwsIamRoleProps) {
    super(scope, id, props);

    this.inlinePolicies = this._createInlinePolicies(props.inlinePolicy)
    this.assumeRolePolicyDocument = new DataAwsIamPolicyDocument(this, 'assume_role_policy_document', props.assumeRolePolicy);
    this.permissionsBoundary = this._getPermissionBoundary(props.permissionsBoundaryName)

    this.role = new IamRole(this, 'role', {
      name: this.context.id,
      assumeRolePolicy: this.assumeRolePolicyDocument.json,
      inlinePolicy: this._generateInlinePolicy(this.inlinePolicies),
      maxSessionDuration: props.maxSessionDuration,
      permissionsBoundary: this.permissionsBoundary ? this.permissionsBoundary.arn : undefined
    })
  }

  _createInlinePolicies(policy?: InlinePolicy) {
    if (!policy) return policy;

    const inlinePolicies: Record<string, DataAwsIamPolicyDocument> = {}

    for (const [name, config] of Object.entries(policy)) {
      inlinePolicies[name] = new DataAwsIamPolicyDocument(this, `${name}_inline_policy`, config);
    }

    return inlinePolicies;
  }

  _generateInlinePolicy(policy?: Record<string, DataAwsIamPolicyDocument>): IamRoleInlinePolicy[] | undefined {
    if (!policy) return policy;

    return Object.entries(policy).map(([name, doc]) => ({
      name,
      policy: doc.json
    }))
  }

  _getPermissionBoundary(boundaryName?: string) {
    if (boundaryName === undefined) return boundaryName;

    return new DataAwsIamPolicy(this, 'boundary', {
      name: boundaryName
    })
  }
}
