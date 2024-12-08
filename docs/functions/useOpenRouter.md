[**useOpenRouter API Documentation v0.0.2**](../README.md)

***

[useOpenRouter API Documentation](../README.md) / useOpenRouter

# Function: useOpenRouter()

> **useOpenRouter**(`options`): [`UseOpenRouterReturn`](../interfaces/UseOpenRouterReturn.md)

A powerful composable for interacting with OpenRouter's AI API

This composable provides a complete solution for:

### 🤖 AI Model Management
- Switch between models (GPT-4, Claude, etc.)
- Track recently used models
- Filter enabled/available models
- Automatic model fetching and updates

### 💬 Chat Functionality
- Send and receive messages
- Maintain conversation history
- Handle streaming responses
- Manage chat state and loading

### 💰 Cost Management
- Track token usage
- Monitor conversation costs
- Format costs for display
- Handle free vs paid models

### 🎮 Advanced Controls
- Temperature adjustment (0-1)
- Context length management
- Error handling and recovery
- API key validation

## Parameters

### options

[`OpenRouterOptions`](../interfaces/OpenRouterOptions.md) = `{}`

Configuration options

## Returns

[`UseOpenRouterReturn`](../interfaces/UseOpenRouterReturn.md)

Collection of reactive refs and utility methods

## Examples

Basic Chat:
```ts
const chat = useOpenRouter({ apiKey: 'your-key' })

// Send a message
await chat.sendMessage('Hello AI!')

// Get the response
const response = chat.messages.value.at(-1)?.content
```

Model Management:
```ts
// Get available models
await chat.fetchAvailableModels()

// Switch to a specific model
chat.setModel('anthropic/claude-3-opus')

// Check model cost
const cost = chat.formatModelCost(chat.currentModel.value)
console.log(`Using ${chat.modelName.value} at ${cost}/1M tokens`)
```

Cost Tracking:
```ts
// Monitor conversation costs
console.log(chat.chatStats.value)
// {
//   tokens: 1500,         // Total tokens used
//   promptTokens: 500,    // Tokens in your messages
//   completionTokens: 1000, // Tokens in AI responses
//   cost: 0.015,          // Cost of current conversation
//   totalCost: 0.045      // Total cost across all conversations
// }
```

Temperature Control:
```ts
// For creative tasks (stories, brainstorming)
chat.updateTemperature(1.0)
await chat.sendMessage('Write a creative story')

// For factual tasks (math, coding)
chat.updateTemperature(0.1)
await chat.sendMessage('What is 123 * 456?')
```

Error Handling:
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

Progressive Enhancement:
```ts
const chat = useOpenRouter({ apiKey: 'your-key' })

// Start with a basic question
await chat.sendMessage('What are black holes?')

// Get more technical
chat.setModel('anthropic/claude-3-opus')
await chat.sendMessage('Explain the mathematics of Hawking radiation')

// Track the learning cost
console.log(`Learning about black holes cost: $${chat.chatStats.value.totalCost}`)
```

Multi-Model Comparison:
```ts
const chat = useOpenRouter({ apiKey: 'your-key' })

// Compare different models on the same task
const question = 'Write a function to detect palindromes'

for (const model of chat.enabledModels.value) {
  chat.clearChat()
  chat.setModel(model.id)
  await chat.sendMessage(question)

  console.log(`${model.name}:`)
  console.log(`Response: ${chat.messages.value.at(-1)?.content}`)
  console.log(`Cost: ${chat.formatModelCost(model.id, chat.chatStats.value.cost)}`)
}
```

Creative Writing Assistant:
```ts
const chat = useOpenRouter({ apiKey: 'your-key' })

// Start with world-building (high temperature)
chat.updateTemperature(0.9)
await chat.sendMessage('Create a unique sci-fi setting')

// Get character details (medium temperature)
chat.updateTemperature(0.7)
await chat.sendMessage('Design 3 main characters for this setting')

// Write the actual story (balanced temperature)
chat.updateTemperature(0.5)
await chat.sendMessage('Write Chapter 1 using these characters and setting')

// Edit for clarity (low temperature)
chat.updateTemperature(0.2)
await chat.sendMessage('Edit the chapter for clarity and conciseness')
```

Budget-Aware Chat:
```ts
const chat = useOpenRouter({ apiKey: 'your-key' })
const MAX_BUDGET = 0.05 // $0.05

// Start with cheaper model
chat.setModel('openai/gpt-3.5-turbo')

async function smartChat(message: string) {
  // Switch to powerful model for complex questions
  if (message.length > 100 || message.includes('explain') || message.includes('how')) {
    chat.setModel('anthropic/claude-3-sonnet')
  }

  // Use cheap model when approaching budget
  if (chat.chatStats.value.totalCost > MAX_BUDGET * 0.8) {
    chat.setModel('openai/gpt-3.5-turbo')
  }

  await chat.sendMessage(message)

  // Alert when over budget
  if (chat.chatStats.value.totalCost > MAX_BUDGET) {
    console.warn('Budget exceeded! Starting new chat...')
    chat.clearChat()
  }
}
```

These examples show how to:
- Progressively enhance conversations
- Compare model performance
- Adjust temperature for different tasks
- Manage costs automatically
- Build complex workflows

### Key Features

1. **Reactive State Management**
   - All state is reactive using Vue refs
   - Readonly refs where appropriate
   - Automatic cleanup on unmount

2. **Smart Cost Handling**
   - Automatic token counting
   - Running cost totals
   - Smart decimal formatting
   - Cost-based model sorting

3. **Type Safety**
   - Full TypeScript support
   - Runtime type checking
   - Proper error types
   - Comprehensive interfaces

4. **Built-in Safeguards**
   - Temperature clamping
   - Empty message rejection
   - API key validation
   - Error state management

### Return Value Properties

- `apiKey` - Current API key
- `messages` - Chat history
- `isLoading` - Request status
- `error` - Error messages
- `currentModel` - Active model
- `modelName` - Model display name
- `chatStats` - Usage statistics
- `temperature` - Creativity setting

### Methods

- `sendMessage()` - Send AI messages
- `setModel()` - Change AI models
- `updateTemperature()` - Adjust creativity
- `clearChat()` - Reset conversation
- `fetchAvailableModels()` - Get models

## Defined in

[index.ts:404](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L404)
