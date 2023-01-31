import { TerraformStack as BaseStack } from "cdktf";
import { Construct } from "constructs";
import { Context } from "./context";
import { ContextKeys, Environment } from "./types";

export type BaseStackProps = {
  project: string
  service: string
  environment: Environment
}

export type StackProps = BaseStackProps & Record<string, any>

const STACK_PROP_KEYS: ContextKeys = [
  "project",
  "service",
  "environment"
];

export class TerraformStack extends BaseStack {
  context: Context

  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id)

    this.context = Context.extract(props, STACK_PROP_KEYS);
  }
}
