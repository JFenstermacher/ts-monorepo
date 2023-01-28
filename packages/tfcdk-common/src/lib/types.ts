import { ContextInput, ContextType } from '@JFenstermacher/context';

export type BaseConstructConfig = ContextInput & {
  context?: ContextType
}

export type ConstructConfig = BaseConstructConfig & Record<string, any>
