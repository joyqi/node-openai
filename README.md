# node-openai

An elegant Node.js library written in TypeScript for the OpenAI API.

## Installation

```bash
npm install node-openai
```

## Example

For Node.js (CommonJS):

```javascript
const { OpenAI } = require('node-openai');
```

For ES Modules:

```javascript
import { OpenAI } from 'node-openai';
```

For TypeScript:

```typescript
import { OpenAI } from 'node-openai';
```

Create an instance of the OpenAI class:

```javascript
const client = new OpenAI({
    apiKey: 'YOUR_API_KEY',
    // organization: 'YOUR_ORGANIZATION_ID',
    // options: { /* Axios Request Options */ },
});
```

## V1 API

To use the OpenAI V1 API, you must call the `v1()` method on the client instance:

```javascript
const v1 = client.v1();
```

### Models

List all available models:

```javascript
const models = await v1.models.list();
```

Retrieve a model:

```javascript
const model = await v1.models.retrieve('davinci');
```

### Completions

Create a completion:

```javascript
const completion = await v1.completions.create({
    model: 'davinci',
    prompt: 'This is a test',
    max_tokens: 5,
    temperature: 0.9
});
```

### Chat

Create a chat:

```javascript
const chat = await v1.chat.create({
    model: 'gpt-3.5-turbo',
    messages: [
        {
            role: 'user',
            content: 'Hello, how are you?'
        }
    ]
});
```
