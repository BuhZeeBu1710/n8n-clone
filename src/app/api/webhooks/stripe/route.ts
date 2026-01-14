import { sendWorkflowExecution } from "@/inngest/utils";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const workflowId = url.searchParams.get("workflowId");

    if (!workflowId) {
      return NextResponse.json(
        {
          success: false,
          error: "Missing required query parameter: workflowId",
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const stripeData = {
      // Event metadata
      eventId: body.id,
      eventType: body.type,
      timestamp: body.created,
      livemode: body.livemode,
      raw: body.data?.object,
    };

    // Trigger an Inngest job
    await sendWorkflowExecution({
      workflowId,
      initialData: {
        stripe: stripeData,
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error processing Stripe webhook", error);

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
