const fetch = require('node-fetch');

const API_ENDPOINT = 'https://api.cai.tools.sap/build/v1/dialog';
const { FAQ_BOT_TOKEN } = process.env;

export async function handler(event) {
  if (event.httpMethod !== "POST") {  // Only allow POST
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const params = JSON.parse(event.body);
  console.log('webhook body: ', params);
  console.log('webhook intents', params.nlp.intents);

  let response;
  try {
    response = await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${FAQ_BOT_TOKEN}`,
      },
      body: {
        conversation_id: params.conversation.id,
        message: { content: params.nlp.source, type: 'text' },
        language: params.nlp.language,
      },
    });

    console.log('FAQ dialog response: ', JSON.parse(response));
  } catch (err) {
    console.log('/dialog request error: ', err);
    return {
      statusCode: err.statusCode || 500,
      body: JSON.stringify({
        error: err.message
      })
    };
  }

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
