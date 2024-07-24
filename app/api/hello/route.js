/**
 * @swagger
 * /api/hello:
 *  get:
 *      tags: [Hello]
 *      description: Returns a greeting message
 *      responses:
 *          200:
 *              description: greeting message
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 */
export async function GET(req, res) {
  return new Response(JSON.stringify({ message: "Hello World" }), {
    headers: { "content-type": "application/json" },
  });
}
