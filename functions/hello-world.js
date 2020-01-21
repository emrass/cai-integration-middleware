const greeting = process.env.GREETING || "Hello World";

export async function handler(event) {
    return {
      statusCode: 200,
      body: JSON.stringify({ data: greeting })
    }
  }
