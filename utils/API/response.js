/**
 * Returns data to HTTP response as JSON stringify data
 * @param data
 * @returns {Promise<Response>}
 */
export const response = async (data) =>
  await new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
