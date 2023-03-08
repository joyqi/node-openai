# node-openai

An elegant Node.js library written in TypeScript for the OpenAI API.

- [Installation](#installation)
- [Example](#example)
- [V1 API](#v1-api)
  - [Models](#models)
  - [Completions](#completions)
  - [Chat](#chat)
  - [Edits](#edits)
  - [Images](#images)
  - [Embeddings](#embeddings)
  - [Audio](#audio)
  - [Files](#files)

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

Check out the [OpenAI V1 API docs](https://platform.openai.com/docs/api-reference/introduction) for more information.

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

### Edits

Create an edit:

```javascript
const edit = await v1.edits.create({
    model: 'text-davinci-edit-001',
    input: 'I am a test',
    instruction: 'Make this text funny',
});
```

### Images

Create an image:

```javascript
const image = await v1.images.create({
    prompt: 'A cute baby sea otter',
    n: 1,
    size: '512x512',
});
```

Create image edit:

```javascript
const imageEdit = await v1.images.edit({
    prompt: 'Make this image funny',
    n: 1,
    size: '512x512',
}, '/path/to/image.png');
```

Create image variation:

```javascript
const imageVariation = await v1.images.variation({
    n: 1,
    size: '512x512',
}, '/path/to/image.png');
```

### Embeddings

Create an embedding:

```javascript
const embedding = await v1.embeddings.create({
    model: 'text-embedding-ada-002',
    input: 'This is a test',
});
```

### Audio

Create transcription:

```javascript
const transcription = await v1.audio.createTranscription({
    model: 'whisper-1',
    prompt: 'This is a test',
}, '/path/to/audio.mp3');
```

Create translation:

```javascript
const translation = await v1.audio.createTranslation({
    model: 'whisper-1',
    prompt: 'This is a test',
}, '/path/to/audio.mp3');
```

### Files

List all available files:

```javascript
const files = await v1.files.list();
```

Retrieve a file:

```javascript
const file = await v1.files.retrieve('file-123');
```

Upload a file:

```javascript
const file = await v1.files.upload('/path/to/file.txt', 'fine-tune');
```

Delete a file:

```javascript
const file = await v1.files.delete('file-123');
```

Retrieve a file's contents:

```javascript
const content = await v1.files.retrieveContents('file-123');
```