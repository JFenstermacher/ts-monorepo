import * as aws from '@cdktf/provider-aws';
import { Construct } from '@JFenstermacher/tfcdk-common';
import { DEFAULT_ASSUME_ROLE_ACTIONS } from './consts';
import { AwsIamRoleConfig } from './types';

export class AwsIamRole extends Construct {
  assumeRolePolicy: aws.dataAwsIamPolicyDocument.DataAwsIamPolicyDocument
  role: aws.iamRole.IamRole

  constructor(scope: Construct, id: string, config: AwsIamRoleConfig) {
    super(scope, id, config);

    this.assumeRolePolicy = this._createAssumeRolePolicyDocument(config);

    this.role = new aws.iamRole.IamRole(this, 'role', {
      name: this.context.id,
      assumeRolePolicy: this.assumeRolePolicy.json
    })
  }

  _createAssumeRolePolicyDocument({ assumeRolePrincipals, assumeRoleActions, assumeRolePolicy }: AwsIamRoleConfig) {
    if (assumeRolePolicy) return new aws.dataAwsIamPolicyDocument.DataAwsIamPolicyDocument(this, 'assume_role',)

    assumeRoleActions = assumeRoleActions ?? DEFAULT_ASSUME_ROLE_ACTIONS;

    if (!assumeRolePrincipals) {
      throw Error("")
    }

    return new aws.dataAwsIamPolicyDocument.DataAwsIamPolicyDocument(this, 'assume_role', {
      statement: [{
        principals: Object.entries(assumeRolePrincipals).map(([type, identifiers]) => ({
          type,
          identifiers
        })),
        actions: assumeRoleActions
      }]
    })
  }
}

