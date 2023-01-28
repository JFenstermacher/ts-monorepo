import { Construct } from 'constructs';
import { IamRole } from '@cdktf/provider-aws/lib/iam-role';
import { Context, ContextInput, ContextType } from '@JFenstermacher/context';
import { AwsProvider } from '@cdktf/provider-aws/lib/provider';

type AwsIamRoleConfig = ContextInput & {
  context?: ContextType
  provider?: AwsProvider
}

export default class AwsIamRole extends Construct {
  constructor(scope: Construct, id: string, config: AwsIamRoleConfig) {
    super(scope, id);

    const context = new Context({
      ...config.context
    })

    new IamRole(this, 'role', {
      name: context.id
    })
  }
}

