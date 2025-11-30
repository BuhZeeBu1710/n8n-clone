"use client";

import { ErrorView, LoadingView } from "@/components/entity-components";
import { useSuspenseSingleWorkflow } from "../../workflows/hooks/use-workflows";

export const EditorLoading = () => {
  return <LoadingView entity="editor" />;
};

export const EditorError = () => {
  return <ErrorView entity="editor" />;
};

export const Editor = ({ workflowId }: { workflowId: string }) => {
  const { data: workflow } = useSuspenseSingleWorkflow(workflowId);

  return <p>{JSON.stringify(workflow, null, 2)}</p>;
};
