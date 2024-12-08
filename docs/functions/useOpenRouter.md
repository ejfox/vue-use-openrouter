[**useOpenRouter API Documentation v0.1.0**](../README.md)

***

[useOpenRouter API Documentation](../README.md) / useOpenRouter

# Function: useOpenRouter()

> **useOpenRouter**(`options`): [`UseOpenRouterReturn`](../interfaces/UseOpenRouterReturn.md)

A composable for interacting with the OpenRouter API

This provides an easy way to:
- Send messages to AI models (like GPT-4, Claude, etc.)
- Switch between different AI models
- Track costs and token usage
- Manage conversation history

## Parameters

### options

[`OpenRouterOptions`](../interfaces/OpenRouterOptions.md) = `{}`

## Returns

[`UseOpenRouterReturn`](../interfaces/UseOpenRouterReturn.md)

## Example

Basic usage:
```ts
const chat = useOpenRouter('your-api-key')

// Initialize and fetch available models
await chat.fetchAvailableModels()

// Send a message
await chat.sendMessage('What is quantum computing?')

// Get the AI's response
const response = chat.messages.value.at(-1)?.content

// Check usage
console.log(`Cost: $${chat.chatStats.value.totalCost}`)
console.log(`Tokens used: ${chat.chatStats.value.tokens}`)
```

## Defined in

[index.ts:196](https://github.com/ejfox/vue-use-openrouter/blob/e3bdbf97dbd72ec6c31741ce2bd3ff73ff7034d6/src/index.ts#L196)
