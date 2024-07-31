import swaggerSpec from "@/lib/swagger";

export async function GET(request) {
  return new Response(JSON.stringify(swaggerSpec), {
    headers: { "Content-Type": "application/json" },
  });
}
