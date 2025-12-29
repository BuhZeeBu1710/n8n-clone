import { NodeExecutor } from "@/features/executions/types";
import { NonRetriableError } from "inngest";
import ky, { type Options as KyOptions } from "ky";

type HttpRequestData = {
  variableName?: string;
  endpoint?: string;
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  body?: string;
};

export const httpRequestExecutor: NodeExecutor<HttpRequestData> = async ({
  data,
  nodeId,
  context,
  step,
}) => {
  // TODO: Pyblish "loading" state for HTTP request

  if (!data.variableName) {
    // TODO: Publish "error" state for HTTP request
    throw new NonRetriableError("HTTP Request node: Variable name is required");
  }

  if (!data.endpoint) {
    // TODO: Publish "error" state for HTTP request
    throw new NonRetriableError("HTTP Request node: Endpoint is required");
  }

  const result = await step.run("http-request", async () => {
    const endpoint = data.endpoint!;
    const method = data.method || "GET";

    const options: KyOptions = { method };

    if (["POST", "PUT", "PATCH"].includes(method)) {
      options.body = data.body;
      options.headers = {
        ...(context.httpHeaders || {}),
        "Content-Type": "application/json",
      };
    }

    const response = await ky(endpoint, options);
    const contentType = response.headers.get("content-type");
    const responseData = contentType?.includes("application/json")
      ? await response.json().catch(() => response.text())
      : await response.text();

    const responsePayload = {
      httpResponse: {
        status: response.status,
        statusText: response.statusText,
        data: responseData,
      },
    };

    if (data.variableName) {
      // Store the response in the context under the variable name
      return {
        ...context,
        [data.variableName]: responsePayload,
      };
    }

    // Fallback to direct httpResponse for backwards compatibility
    return {
      ...context,
      ...responsePayload,
    };
  });

  // TODOL Publish "success" state for HTTP request

  return result;
};
