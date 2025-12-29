import { NodeExecutor } from "@/features/executions/types";

type ManualTriggerData = Record<string, unknown>;

export const manualTriggerExecutor: NodeExecutor<ManualTriggerData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  // TODO: Pyblish "loading" state for manual trigger

  const result = await step.run("manual-trigger", async () => context);

  // TODOL Publish "success" state for manual trigger

  return result;
};
