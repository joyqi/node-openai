# node-openai

**An elegant Node.js library written in TypeScript for the OpenAI API. Pure JavaScript, no dependencies. Works in Node.js and the browser.**

[![npm](https://img.shields.io/npm/v/node-openai.svg)](https://www.npmjs.com/package/node-openai)
[![npm](https://img.shields.io/npm/dt/node-openai.svg)](https://www.npmjs.com/package/node-openai)
[![GitHub](https://img.shields.io/github/license/joyqi/node-openai.svg)](https://github.com/joyqi/node-openai/blob/master/LICENSE)
![GitHub Workflow Status](https://img.shields.io/github/actions/workflow/status/joyqi/node-openai/ci.yml)
![Libraries.io dependency status for GitHub repo](https://img.shields.io/librariesio/github/joyqi/node-openai)

- [Installation](#installation)
- [Features](#features)
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
  - [Fine-tunes](#fine-tunes)
  - [Moderations](#moderations)

## Installation

```bash
npm install node-openai
```

### Features

| API | Supported |
| --- | --- |
| [Models](https://platform.openai.com/docs/api-reference/models) | ✅ |
| [Completions](https://platform.openai.com/docs/api-reference/completions) | ✅ |
| [Chat](https://platform.openai.com/docs/api-reference/chat) | ✅ |
| [Edits](https://platform.openai.com/docs/api-reference/edits) | ✅ |
| [Images](https://platform.openai.com/docs/api-reference/images) | ✅ |
| [Embeddings](https://platform.openai.com/docs/api-reference/embeddings) | ✅ |
| [Audio](https://platform.openai.com/docs/api-reference/audio) | ✅ |
| [Files](https://platform.openai.com/docs/api-reference/files) | ✅ |
| [Fine-tunes](https://platform.openai.com/docs/api-reference/fine-tunes) | ✅ |
| [Moderations](https://platform.openai.com/docs/api-reference/moderations) | ✅ |

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
const openai = new OpenAI({
    apiKey: 'YOUR_API_KEY',
    // organization: 'YOUR_ORGANIZATION_ID',
    // endpoint: 'https://api.openai.com',
});
```

## V1 API

To use the OpenAI V1 API, you must call the `v1()` method on the client instance:

```javascript
const api = openai.v1();
```

Check out the [OpenAI V1 API docs](https://platform.openai.com/docs/api-reference/introduction) for more information.

### Models

List all available models:

```javascript
const models = await api.models.list();
```

Retrieve a model:

```javascript
const model = await api.models.retrieve('davinci');
```

Delete fine-tuned model:

```javascript
const model = await api.models.delete('curie:ft-acmeco-2021-03-03-21-44-20');
```

### Completions

Create a completion:

```javascript
const completion = await api.completions.create({
    model: 'davinci',
    prompt: 'This is a test',
    max_tokens: 5,
    temperature: 0.9,
    stream: false,
});
```

If the `stream` option is set to `true`, the completion will be streamed:

```javascript
const stream = await api.completions.create({
    model: 'davinci',
    prompt: 'This is a test',
    max_tokens: 5,
    temperature: 0.9,
    stream: true,
});

const reader = stream.pipeThrough(new TextDecoderStream()).getReader();
// Read the stream
```

### Chat

Create a chat:

```javascript
const chat = await api.chat.create({
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
const edit = await api.edits.create({
    model: 'text-davinci-edit-001',
    input: 'I am a test',
    instruction: 'Make this text funny',
});
```

### Images

Create an image:

```javascript
const image = await api.images.create({
    prompt: 'A cute baby sea otter',
    n: 1,
    size: '512x512',
});
```

Create image edit:

```javascript
const imageEdit = await api.images.edit({
    prompt: 'Make this image funny',
    n: 1,
    size: '512x512',
}, '/path/to/image.png');
```

Create image variation:

```javascript
const imageVariation = await api.images.variation({
    n: 1,
    size: '512x512',
}, '/path/to/image.png');
```

### Embeddings

Create an embedding:

```javascript
const embedding = await api.embeddings.create({
    model: 'text-embedding-ada-002',
    input: 'This is a test',
});
```

### Audio

Create transcription:

```javascript
const transcription = await api.audio.createTranscription({
    model: 'whisper-1',
    prompt: 'This is a test',
}, '/path/to/audio.mp3');
```

Create translation:

```javascript
const translation = await api.audio.createTranslation({
    model: 'whisper-1',
    prompt: 'This is a test',
}, '/path/to/audio.mp3');
```

### Files

List all available files:

```javascript
const files = await api.files.list();
```

Retrieve a file:

```javascript
const file = await api.files.retrieve('file-123');
```

Upload a file:

```javascript
const file = await api.files.upload('/path/to/file.txt', 'fine-tune');
```

Delete a file:

```javascript
const file = await api.files.delete('file-123');
```

Retrieve a file's contents:

```javascript
const content = await api.files.retrieveContents('file-123');
```

### Fine-tunes

Create fine-tune:

```javascript
const fineTune = await api.fineTunes.create({
    training_file: 'file-123',
});
```

List fine-tunes:

```javascript
const fineTunes = await api.fineTunes.list();
```

Retrieve fine-tune:

```javascript
const fineTune = await api.fineTunes.retrieve('ft-AF1WoRqd3aJAHsqc9NY7iL8F');
```

Cancel fine-tune:

```javascript
const fineTune = await api.fineTunes.cancel('ft-AF1WoRqd3aJAHsqc9NY7iL8F');
```

List fine-tune's events:

```javascript
const events = await api.fineTunes.listEvents('ft-AF1WoRqd3aJAHsqc9NY7iL8F');
```

### Moderations

Create moderation:

```javascript
const moderation = await api.moderations.create({
    model: 'text-moderation-stable',
    input: 'This is a test',
});
```