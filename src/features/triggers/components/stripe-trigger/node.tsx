"use client";

import { NodeProps } from "@xyflow/react";
import { memo, useState } from "react";
import { BaseTriggerNode } from "../base-trigger-node";
import { StripeTriggerDialog } from "./dialog";
import { useNodeStatus } from "@/features/executions/hooks/use-node-status";
import { STRIPE_TRIGGER_CHANNEL_NAME } from "@/inngest/channels/stripe-trigger";
import { fetchStripeTriggerRealtimeToken } from "./actions";

export const StripeTriggerNode = memo((props: NodeProps) => {
  const [open, setOpen] = useState(false);

  const nodeStatus = useNodeStatus({
    nodeId: props.id,
    channel: STRIPE_TRIGGER_CHANNEL_NAME,
    topic: "status",
    refreshToken: fetchStripeTriggerRealtimeToken,
  });

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
      <StripeTriggerDialog open={open} onOpenChange={handleOpenChange} />
      <BaseTriggerNode
        {...props}
        icon="/logos/stripe.svg"
        name="Stripe"
        description="When a Stripe event is received"
        status={nodeStatus}
        onSettings={handleSettings}
        onDoubleClick={handleDoubleClick}
      />
    </>
  );
});

StripeTriggerNode.displayName = "StripeTriggerNode";
