export interface AssistantsInput<ServerArgs> {
  prompt: string;
  serverArgs?: ServerArgs;
}

export interface FunctionCallsInput<ModelArgs, ServerArgs> {
  modelArgs?: ModelArgs;
  serverArgs?: ServerArgs;
}
