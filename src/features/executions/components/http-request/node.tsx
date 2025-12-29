"use client";

import { Node, NodeProps, useReactFlow } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseExecutionNode } from "../../base-execution-node";
import { GlobeIcon } from "lucide-react";
import { HttpRequestDialog, HttpRequestDialogValues } from "./dialog";

type HttpRequestNodeData = {
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
};

type HttpRequestNodeType = Node<HttpRequestNodeData>;

export const HttpRequestNode = memo((props: NodeProps<HttpRequestNodeType>) => {
  const [open, setOpen] = useState(false);
  const { setNodes } = useReactFlow();

  const handleSubmit = (values: HttpRequestDialogValues) => {
    setNodes((nodes) =>
      nodes.map((node) => {
        if (node.id === props.id) {
          return {
            ...node,
            data: {
              ...node.data,
              ...values,
            },
          };
        }

        return node;
      })
    );
  };

  const nodeData = props.data;

  const handleSettings = () => {
    setOpen(true);
  };

  const description = nodeData?.endpoint
    ? `${nodeData.method || "GET"}: ${nodeData.endpoint}`
    : "Not configured";

  const nodeStatus = "initial";

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleDoubleClick = () => {
    setOpen(true);
  };

  return (
    <>
      <HttpRequestDialog
        open={open}
        onOpenChange={handleOpenChange}
        onSubmit={handleSubmit}
        defaultValues={nodeData}
      />
      <BaseExecutionNode
        {...props}
        id={props.id}
        icon={GlobeIcon}
        name="HTTP Request"
        status={nodeStatus}
        description={description}
        onSettings={handleSettings}
        onDoubleClick={handleDoubleClick}
      />
    </>
  );
});

HttpRequestNode.displayName = "HttpRequestNode";
