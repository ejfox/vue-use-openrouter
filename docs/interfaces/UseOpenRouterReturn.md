[**useOpenRouter API Documentation v1.0.0**](../README.md)

***

[useOpenRouter API Documentation](../README.md) / UseOpenRouterReturn

# Interface: UseOpenRouterReturn

## Properties

### apiKey

> **apiKey**: `Ref`\<`string`\>

Current API key

#### Defined in

[index.ts:84](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L84)

***

### availableModels

> **availableModels**: `Ref`\<readonly [`OpenRouterModel`](OpenRouterModel.md)[]\>

List of all available models

#### Defined in

[index.ts:100](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L100)

***

### chatStats

> **chatStats**: `Ref`\<[`ChatStats`](ChatStats.md)\>

Chat statistics

#### Defined in

[index.ts:120](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L120)

***

### clearChat()

> **clearChat**: () => `void`

Clear chat history

#### Returns

`void`

#### Defined in

[index.ts:118](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L118)

***

### currentChatId

> **currentChatId**: `Ref`\<`null` \| `string`\>

Current chat ID

#### Defined in

[index.ts:116](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L116)

***

### currentModel

> **currentModel**: `Ref`\<`string`\>

Current model ID

#### Defined in

[index.ts:96](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L96)

***

### enabledModels

> **enabledModels**: `ComputedRef`\<[`OpenRouterModel`](OpenRouterModel.md)[]\>

List of enabled models

#### Defined in

[index.ts:102](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L102)

***

### error

> **error**: `Ref`\<`Readonly`\<`null` \| `string`\>\>

Error state

#### Defined in

[index.ts:94](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L94)

***

### fetchAvailableModels()

> **fetchAvailableModels**: () => `Promise`\<`void`\>

Fetch available models

#### Returns

`Promise`\<`void`\>

#### Defined in

[index.ts:108](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L108)

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

[index.ts:112](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L112)

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

[index.ts:110](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L110)

***

### hasValidKey

> **hasValidKey**: `ComputedRef`\<`boolean`\>

Whether the current API key is valid

#### Defined in

[index.ts:88](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L88)

***

### isLoading

> **isLoading**: `Ref`\<`Readonly`\<`boolean`\>\>

Loading state

#### Defined in

[index.ts:92](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L92)

***

### messages

> **messages**: `Ref`\<readonly [`ChatMessage`](ChatMessage.md)[]\>

List of messages in the current conversation

#### Defined in

[index.ts:90](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L90)

***

### modelName

> **modelName**: `ComputedRef`\<`string`\>

Current model display name

#### Defined in

[index.ts:98](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L98)

***

### recentModels

> **recentModels**: `ComputedRef`\<[`OpenRouterModel`](OpenRouterModel.md)[]\>

Recently used models

#### Defined in

[index.ts:104](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L104)

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

[index.ts:126](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L126)

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

[index.ts:86](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L86)

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

[index.ts:114](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L114)

***

### temperature

> **temperature**: `Ref`\<`number`\>

Temperature setting

#### Defined in

[index.ts:122](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L122)

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

[index.ts:106](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L106)

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

[index.ts:124](https://github.com/ejfox/vue-use-openrouter/blob/1d2f24340e5b0fd0067f19fb73e1272c7e16cc66/src/index.ts#L124)
