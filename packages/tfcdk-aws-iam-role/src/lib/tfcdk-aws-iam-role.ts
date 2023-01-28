import * as aws from '@cdktf/provider-aws';
import { Construct } from 'constructs';
import { Context, ContextInput, ContextType } from '@JFenstermacher/context';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';
import { PrincipalIdentifiers } from './types';

type AwsIamRoleConfig = ContextInput & {
  context?: ContextType
  provider?: AwsProvider
  assumeRolePrincipals?: Princip
}

export default class AwsIamRole extends Construct {
  constructor(scope: Construct, id: string, config: AwsIamRoleConfig) {
    super(scope, id);

    const context = new Context({
      ...config.context,
      ...config
    });

    new aws.dataAwsIamPolicyDocument.DataAwsIamPolicyDocument(this, 'assume_role', {
      statement: [{
        principals: []
      }]
    })

    new aws.iamRole.IamRole(this, 'role', {
      name: context.id
    })
  }
}

