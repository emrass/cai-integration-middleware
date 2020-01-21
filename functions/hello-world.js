const { FAQ_BOT_TOKEN } = process.env;

export async function handler(event) {
  if (event.httpMethod !== "POST") {  // Only allow POST
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  console.log(event.body)

  return {
    statusCode: 200,
    body: JSON.stringify({
      "replies": [{
        "type": "text",
        "delay": 2,
        "content": "Hello world!",
      }],
      "conversation": {
        "language": "en",
        "memory": {
          "user": "Bob",
        },
      },
    }),
  };
}
