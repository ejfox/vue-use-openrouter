[**useOpenRouter API Documentation v0.0.2**](../README.md)

***

[useOpenRouter API Documentation](../README.md) / UseOpenRouterReturn

# Interface: UseOpenRouterReturn

## Properties

### apiKey

> **apiKey**: `Ref`\<`string`\>

Current API key

#### Defined in

[index.ts:83](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L83)

***

### availableModels

> **availableModels**: `Ref`\<readonly [`OpenRouterModel`](OpenRouterModel.md)[]\>

List of all available models

#### Defined in

[index.ts:99](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L99)

***

### chatStats

> **chatStats**: `Ref`\<[`ChatStats`](ChatStats.md)\>

Chat statistics

#### Defined in

[index.ts:119](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L119)

***

### clearChat()

> **clearChat**: () => `void`

Clear chat history

#### Returns

`void`

#### Defined in

[index.ts:117](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L117)

***

### currentChatId

> **currentChatId**: `Ref`\<`null` \| `string`\>

Current chat ID

#### Defined in

[index.ts:115](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L115)

***

### currentModel

> **currentModel**: `Ref`\<`string`\>

Current model ID

#### Defined in

[index.ts:95](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L95)

***

### enabledModels

> **enabledModels**: `ComputedRef`\<[`OpenRouterModel`](OpenRouterModel.md)[]\>

List of enabled models

#### Defined in

[index.ts:101](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L101)

***

### error

> **error**: `Ref`\<`Readonly`\<`null` \| `string`\>\>

Error state

#### Defined in

[index.ts:93](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L93)

***

### fetchAvailableModels()

> **fetchAvailableModels**: () => `Promise`\<`void`\>

Fetch available models

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.ts:107](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L107)

***

### formatModelCost()

> **formatModelCost**: (`modelId`, `rawCost`?) => `string`

Format model cost

#### Parameters

##### modelId

`string`

##### rawCost?

`number`

#### Returns

`string`

#### Defined in

[index.ts:111](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L111)

***

### getModelCost()

> **getModelCost**: (`modelId`) => `number`

Get model cost

#### Parameters

##### modelId

`string`

#### Returns

`number`

#### Defined in

[index.ts:109](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L109)

***

### hasValidKey

> **hasValidKey**: `ComputedRef`\<`boolean`\>

Whether the current API key is valid

#### Defined in

[index.ts:87](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L87)

***

### isLoading

> **isLoading**: `Ref`\<`Readonly`\<`boolean`\>\>

Loading state

#### Defined in

[index.ts:91](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L91)

***

### messages

> **messages**: `Ref`\<readonly [`ChatMessage`](ChatMessage.md)[]\>

List of messages in the current conversation

#### Defined in

[index.ts:89](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L89)

***

### modelName

> **modelName**: `ComputedRef`\<`string`\>

Current model display name

#### Defined in

[index.ts:97](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L97)

***

### recentModels

> **recentModels**: `ComputedRef`\<[`OpenRouterModel`](OpenRouterModel.md)[]\>

Recently used models

#### Defined in

[index.ts:103](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L103)

***

### sendMessage()

> **sendMessage**: (`content`) => `Promise`\<`void`\>

Send a message

#### Parameters

##### content

`string`

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.ts:125](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L125)

***

### setApiKey()

> **setApiKey**: (`key`) => `void`

Set the API key

#### Parameters

##### key

`string`

#### Returns

`void`

#### Defined in

[index.ts:85](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L85)

***

### setModel()

> **setModel**: (`modelId`) => `void`

Set current model

#### Parameters

##### modelId

`string`

#### Returns

`void`

#### Defined in

[index.ts:113](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L113)

***

### temperature

> **temperature**: `Ref`\<`number`\>

Temperature setting

#### Defined in

[index.ts:121](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L121)

***

### trackModelUsage()

> **trackModelUsage**: (`modelId`) => `void`

Track model usage

#### Parameters

##### modelId

`string`

#### Returns

`void`

#### Defined in

[index.ts:105](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L105)

***

### updateTemperature()

> **updateTemperature**: (`value`) => `void`

Update temperature

#### Parameters

##### value

`number`

#### Returns

`void`

#### Defined in

[index.ts:123](https://github.com/ejfox/vue-use-openrouter/blob/ca594a649d26948288e93486a1640ac59c89695e/src/index.ts#L123)
