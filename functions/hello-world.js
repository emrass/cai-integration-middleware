const { FAQ_BOT_TOKEN } = process.env;

export async function handler(event) {
  if (event.httpMethod !== "POST") {  // Only allow POST
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const params = JSON.parse(event.body);
  console.log('Params', params);

  return {
    statusCode: 200,
    body: JSON.stringify({
      "replies": [{
        "type": "text",
        "content": "Hello world!",
      }],
      "conversation": {
        "language": "en",
        "memory": {},
      },
    }),
  };
}
