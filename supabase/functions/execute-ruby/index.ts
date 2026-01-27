import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface PistonExecuteRequest {
  language: string;
  version: string;
  files: { content: string }[];
}

interface PistonExecuteResponse {
  run: {
    stdout: string;
    stderr: string;
    code: number;
    signal: string | null;
    output: string;
  };
  compile?: {
    stdout: string;
    stderr: string;
    code: number;
  };
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();

    if (!code || typeof code !== "string") {
      return new Response(
        JSON.stringify({ error: "Code is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Use Piston API for code execution (free, no API key required)
    // https://github.com/engineer-man/piston
    const pistonPayload: PistonExecuteRequest = {
      language: "ruby",
      version: "3.0.1",
      files: [{ content: code }],
    };

    console.log("Executing Ruby code via Piston API...");

    const pistonResponse = await fetch("https://emkc.org/api/v2/piston/execute", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(pistonPayload),
    });

    if (!pistonResponse.ok) {
      const errorText = await pistonResponse.text();
      console.error("Piston API error:", errorText);
      return new Response(
        JSON.stringify({ 
          error: "Execution service unavailable",
          details: errorText 
        }),
        { status: 502, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const result: PistonExecuteResponse = await pistonResponse.json();
    console.log("Execution complete:", result.run.code === 0 ? "success" : "error");

    return new Response(
      JSON.stringify({
        stdout: result.run.stdout,
        stderr: result.run.stderr,
        exitCode: result.run.code,
        signal: result.run.signal,
        output: result.run.output,
        success: result.run.code === 0,
      }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error: unknown) {
    console.error("Execution error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to execute code";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
