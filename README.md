# node-openai

Yet another Node.js wrapper for OpenAI's API.

## Installation

```bash
npm install node-openai
```

## Usage

```js
const OpenAI = require('node-openai');

const client = new OpenAI({
    apiKey: 'YOUR_API_KEY',
});

(async () => {
    const response = await client.v1().completions.create({
        engine: 'davinci',
        prompt: 'This is a test',
        maxTokens: 5,
        temperature: 0.9,
        topP: 1,
        presencePenalty: 0,
        frequencyPenalty: 0,
        bestOf: 1,
        n: 1,
        stream: false,
        stop: ['\n', ' '],
    });
})();
```