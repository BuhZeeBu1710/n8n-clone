"use client";

import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { MousePointerIcon } from "lucide-react";
import { ManualTriggerDialog } from "./dialog";

export const ManualTriggerNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false);

  const nodeStatus = "initial";

  const handleOpenChange = (open: boolean) => {
    setOpen(open);
  };

  const handleDoubleClick = () => {
    setOpen(true);
  };

  const handleSettings = () => {
    setOpen(true);
  };

  return (
    <>
      <ManualTriggerDialog open={open} onOpenChange={handleOpenChange} />
      <BaseTriggerNode
        {...props}
        icon={MousePointerIcon}
        name="When clicking 'Execute workflow'"
        status={nodeStatus}
        onSettings={handleSettings}
        onDoubleClick={handleDoubleClick}
      />
    </>
  );
});

ManualTriggerNode.displayName = "ManualTriggerNode";