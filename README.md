# 📦 useOpenRouter

A Vue 3 composable for interacting with OpenRouter's AI models API. Easily integrate multiple AI models (like GPT-4, Claude, etc.) into your Vue applications.

## 🌟 Features

- 🔌 Simple integration with OpenRouter API
- 🔄 Automatic model switching and management
- 💰 Built-in cost tracking and token usage
- 🧠 Temperature control for response creativity
- 📝 Full conversation history management
- 🔒 Type-safe with full TypeScript support
- ⚡ Powered by Vue 3's Composition API

## 📦 Installation

```bash
# npm
npm install use-openrouter

# yarn
yarn add use-openrouter

# pnpm
pnpm add use-openrouter
```

## 🚀 Quick Start

```ts
import { useOpenRouter } from 'use-openrouter'

// Initialize with your API key
const chat = useOpenRouter({
  apiKey: 'your-api-key',
  defaultModel: 'anthropic/claude-3-sonnet'
})

// Send messages and get responses
await chat.sendMessage('What is quantum computing?')
console.log(chat.messages.value.at(-1)?.content)

// Track costs
console.log(`Cost: $${chat.chatStats.value.totalCost}`)
```

## 📖 Usage Guide

### Basic Chat

```ts
const chat = useOpenRouter({ apiKey: 'your-api-key' })

// Send a message
await chat.sendMessage('Hello AI!')

// Get all messages
console.log(chat.messages.value)
// [
//   { role: 'user', content: 'Hello AI!' },
//   { role: 'assistant', content: 'Hello! How can I help...' }
// ]
```

### Switching Models

```ts
// Get available models
await chat.fetchAvailableModels()

// Switch to a different model
chat.setModel('openai/gpt-4-turbo')

// Check model costs
const cost = chat.formatModelCost(chat.currentModel.value)
console.log(`This model costs ${cost} per million tokens`)
```

### Temperature Control

```ts
// For creative tasks (more random)
chat.updateTemperature(1.0)
await chat.sendMessage('Write a creative story')

// For factual tasks (more focused)
chat.updateTemperature(0.1)
await chat.sendMessage('What is 123 * 456?')
```

### Cost Tracking

```ts
// Track conversation costs
console.log(chat.chatStats.value)
// {
//   tokens: 150,
//   promptTokens: 50,
//   completionTokens: 100,
//   cost: 0.002,
//   totalCost: 0.002
// }

// Format costs nicely
const cost = chat.formatModelCost('anthropic/claude-3-opus')
console.log(cost) // "$15.00"
```

### Error Handling

```ts
try {
  await chat.sendMessage('Hello')
} catch (err) {
  if (chat.error.value?.includes('401')) {
    console.log('Invalid API key')
  } else if (chat.error.value?.includes('429')) {
    console.log('Rate limited - wait a bit')
  }
}
```

## 🛠️ API Reference

### Configuration

```ts
interface OpenRouterOptions {
  apiKey?: string          // Your OpenRouter API key
  temperature?: number     // Initial temperature (0-1)
  defaultModel?: string    // Starting model
  enabledModels?: string[] // List of allowed models
}
```

### Properties

- `messages` - Conversation history
- `isLoading` - Request status
- `error` - Error messages
- `currentModel` - Active model ID
- `modelName` - Active model display name
- `chatStats` - Token and cost tracking
- `temperature` - Current temperature setting

### Methods

- `sendMessage(content: string)` - Send a message
- `setModel(modelId: string)` - Switch models
- `updateTemperature(value: number)` - Adjust temperature
- `clearChat()` - Reset conversation
- `fetchAvailableModels()` - Get model list

## 📄 License

MIT License © 2024

## 💡 Design Philosophy

We've carefully designed this composable to handle all the tricky parts of working with AI APIs:

### 🛡️ Built-in Safeguards

- Temperature is automatically clamped between 0-1
- Empty messages are rejected
- API key validation before requests
- Proper cleanup on component unmount
- SSR-safe window usage

### ���� Smart Cost Management

- Automatic token counting
- Running cost totals
- Smart decimal formatting (more decimals for cheap models)
- Cost-based model sorting (expensive → cheap)
- Free model detection

### 🔄 State Management

- Readonly refs where appropriate
- Automatic model fetching when API key changes
- Recent models tracking (last 10 used)
- Conversation history management
- Proper error state handling

### 🎯 Developer Experience

```ts
// Everything is typed!
const chat = useOpenRouter({
  apiKey: 'key',
  temperature: 0.7,
  defaultModel: 'anthropic/claude-3-sonnet',
  enabledModels: ['anthropic/claude-3-sonnet', 'openai/gpt-4']
})

// Costs are always formatted nicely
chat.formatModelCost('openai/gpt-3.5-turbo') // "$0.00200"
chat.formatModelCost('anthropic/claude-3-opus') // "$15.00"

// Models are sorted by cost (expensive first)
chat.enabledModels.value.forEach(model => {
  console.log(`${model.name}: ${chat.formatModelCost(model.id)}`)
})

// Track all your costs
console.log(chat.chatStats.value)
// {
//   tokens: 1500,
//   promptTokens: 500,    // Input tokens
//   completionTokens: 1000, // Output tokens
//   cost: 0.015,          // Current conversation
//   totalCost: 0.045      // All conversations
// }
```

### 🔍 Edge Cases We Handle

- Rate limiting detection
- Invalid API keys
- Empty or malformed responses
- Context length limits
- Model availability changes
- Token counting edge cases
- Cost calculation precision
- SSR compatibility
- Component unmounting
- Type safety throughout

### 🎨 Flexibility

- Use any OpenRouter model
- Customize temperature per request
- Track costs across conversations
- Enable/disable specific models
- Monitor token usage
- Handle errors your way
- Full TypeScript support

We've aimed to create a composable that's both powerful and pleasant to use, handling all the complex bits while keeping the API clean and intuitive.

## 📚 Documentation

Full API documentation is available at [https://your-username.github.io/use-openrouter/](https://your-username.github.io/use-openrouter/)
