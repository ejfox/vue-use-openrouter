import { ref, computed, watch, readonly, onMounted, onUnmounted } from "vue";
import type { Ref, ComputedRef } from "vue";
import type { MaybeRef } from "@vueuse/shared";

/**
 * Options for chat API requests
 */
export interface ChatOptions {
  model?: string;
  stream?: boolean;
  temperature?: number;
  max_tokens?: number;
}

/**
 * A chat message with role and content
 */
export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

/**
 * Response from the OpenRouter API
 */
export interface ChatResponse {
  choices: Array<{
    message: {
      content: string;
      role: string;
    };
  }>;
  model: string;
  created: number;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    total_cost: number;
  };
}

/**
 * Model information from OpenRouter
 */
export interface OpenRouterModel {
  id: string;
  name: string;
  description: string;
  context_length: number;
  pricing: {
    prompt: number;
    completion: number;
  };
}

/**
 * Statistics for the current chat session
 */
export interface ChatStats {
  tokens: number;
  cost: number;
  promptTokens: number;
  completionTokens: number;
  totalCost: number;
}

/**
 * Error responses from OpenRouter
 */
export interface OpenRouterError {
  error: {
    message: string;
    type: string;
    code: number;
  };
}

export type ModelID = string;
export type Temperature = number;

export interface UseOpenRouterReturn {
  /** Current API key */
  apiKey: Ref<string>;
  /** Set the API key */
  setApiKey: (key: string) => void;
  /** Whether the current API key is valid */
  hasValidKey: ComputedRef<boolean>;
  /** List of messages in the current conversation */
  messages: Ref<Readonly<ChatMessage[]>>;
  /** Loading state */
  isLoading: Ref<Readonly<boolean>>;
  /** Error state */
  error: Ref<Readonly<string | null>>;
  /** Current model ID */
  currentModel: Ref<string>;
  /** Current model display name */
  modelName: ComputedRef<string>;
  /** List of all available models */
  availableModels: Ref<Readonly<OpenRouterModel[]>>;
  /** List of enabled models */
  enabledModels: ComputedRef<OpenRouterModel[]>;
  /** Recently used models */
  recentModels: ComputedRef<OpenRouterModel[]>;
  /** Track model usage */
  trackModelUsage: (modelId: string) => void;
  /** Fetch available models */
  fetchAvailableModels: () => Promise<void>;
  /** Get model cost */
  getModelCost: (modelId: string) => number;
  /** Format model cost */
  formatModelCost: (modelId: string, rawCost?: number) => string;
  /** Set current model */
  setModel: (modelId: string) => void;
  /** Current chat ID */
  currentChatId: Ref<string | null>;
  /** Clear chat history */
  clearChat: () => void;
  /** Chat statistics */
  chatStats: Ref<ChatStats>;
  /** Temperature setting */
  temperature: Ref<number>;
  /** Update temperature */
  updateTemperature: (value: number) => void;
  /** Send a message */
  sendMessage: (content: string) => Promise<void>;
}

/**
 * Validates and normalizes temperature value
 */
function normalizeTemperature(value: number): number {
  if (typeof value !== "number") {
    console.warn("[useOpenRouter] temperature should be a number");
    return 0.7;
  }
  return Math.max(0, Math.min(1, value)); // Clamp between 0-1
}

/**
 * Configuration options for the OpenRouter composable
 */
export interface OpenRouterOptions {
  /**
   * Initial API key
   * @default ''
   */
  apiKey?: string;

  /**
   * Initial temperature setting
   * @default 0.7
   */
  temperature?: number;

  /**
   * Default model to use
   * @default 'anthropic/claude-3-sonnet:beta'
   */
  defaultModel?: string;

  /**
   * List of enabled model IDs
   */
  enabledModels?: string[];
}

/**
 * A composable for interacting with the OpenRouter API
 *
 * This provides an easy way to:
 * - Send messages to AI models (like GPT-4, Claude, etc.)
 * - Switch between different AI models
 * - Track costs and token usage
 * - Manage conversation history
 *
 * @example
 * Basic usage:
 * ```ts
 * const chat = useOpenRouter('your-api-key')
 *
 * // Initialize and fetch available models
 * await chat.fetchAvailableModels()
 *
 * // Send a message
 * await chat.sendMessage('What is quantum computing?')
 *
 * // Get the AI's response
 * const response = chat.messages.value.at(-1)?.content
 *
 * // Check usage
 * console.log(`Cost: $${chat.chatStats.value.totalCost}`)
 * console.log(`Tokens used: ${chat.chatStats.value.tokens}`)
 * ```
 */
export function useOpenRouter(
  options: OpenRouterOptions = {}
): UseOpenRouterReturn {
  const {
    apiKey: initialApiKey = "",
    temperature: initialTemp = 0.7,
    defaultModel = "anthropic/claude-3-sonnet:beta",
    enabledModels: initialEnabledModels = [
      "anthropic/claude-3-sonnet:beta",
      "anthropic/claude-2.1",
      "openai/gpt-4-turbo",
      "openai/gpt-3.5-turbo",
    ],
  } = options;

  const apiKey = ref(initialApiKey);
  const messages = ref<ChatMessage[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const currentModel = ref(defaultModel);
  const currentChatId = ref<string | null>(null);
  const chatStats = ref<ChatStats>({
    tokens: 0,
    cost: 0,
    promptTokens: 0,
    completionTokens: 0,
    totalCost: 0,
  });
  const temperature = ref(normalizeTemperature(initialTemp));
  const availableModels = ref<OpenRouterModel[]>([]);
  const recentModelIds = ref<string[]>([]);

  // Default enabled models
  const enabledModelIds = ref<string[]>(initialEnabledModels);

  const modelName = computed(() => {
    const model = availableModels.value.find(
      (m: OpenRouterModel) => m.id === currentModel.value
    );
    return model?.name || currentModel.value;
  });

  const hasValidKey = computed(() => apiKey.value.length > 0);

  /**
   * Gets the cost per million tokens for a specific model
   *
   * Each model has different pricing for:
   * - Prompt tokens (what you send to the AI)
   * - Completion tokens (what the AI sends back)
   *
   * This returns the average cost per million tokens.
   *
   * @example
   * ```ts
   * const { getModelCost } = useOpenRouter()
   *
   * // Check Claude's cost
   * const claudeCost = getModelCost('anthropic/claude-3-opus')
   * console.log(claudeCost) // 15.0
   *
   * // Compare with GPT-3.5
   * const gptCost = getModelCost('openai/gpt-3.5-turbo')
   * console.log(gptCost) // 0.002
   * ```
   *
   * @param modelId - The model to check pricing for
   * @returns Cost per million tokens (in USD)
   */
  function getModelCost(modelId: string): number {
    const model = availableModels.value.find((m) => m.id === modelId);
    if (!model) {
      return 0;
    }
    // Average of prompt and completion cost per 1M tokens
    const promptCost = model.pricing.prompt || 0;
    const completionCost = model.pricing.completion || 0;
    return (promptCost + completionCost) / 2;
  }

  /**
   * Formats a model's cost into human-readable text
   *
   * Automatically adjusts decimal places based on the cost:
   * - Very cheap models (< $0.01): Shows 5 decimal places
   * - Cheap models (< $0.1): Shows 4 decimal places
   * - Moderate models (< $1): Shows 3 decimal places
   * - Expensive models (≥ $1): Shows 2 decimal places
   *
   * @example
   * ```ts
   * const { formatModelCost } = useOpenRouter()
   *
   * // Expensive model
   * console.log(formatModelCost('anthropic/claude-3-opus'))
   * // "$15.00"
   *
   * // Very cheap model
   * console.log(formatModelCost('openai/gpt-3.5-turbo'))
   * // "$0.00200"
   *
   * // Custom cost
   * console.log(formatModelCost('any-model', 0.00001))
   * // "$0.00001"
   * ```
   *
   * @param modelId - The model to format cost for
   * @param rawCost - Optional override cost to format
   * @returns Formatted cost string with dollar sign
   */
  function formatModelCost(modelId: string, rawCost?: number): string {
    const cost = rawCost ?? getModelCost(modelId);
    if (cost === 0) {
      return "$0.00";
    }

    // For very small numbers (less than 0.01)
    if (cost < 0.01) {
      return `$${cost.toFixed(5)}`;
    }

    // For small numbers (less than 0.1)
    if (cost < 0.1) {
      return `$${cost.toFixed(4)}`;
    }

    // For numbers less than 1
    if (cost < 1) {
      return `$${cost.toFixed(3)}`;
    }

    // For regular numbers
    return `$${cost.toFixed(2)}`;
  }

  /**
   * Fetches available models from the OpenRouter API
   * @throws {Error} If API key is invalid or request fails
   */
  async function fetchAvailableModels() {
    if (!hasValidKey.value) {
      throw new Error("[useOpenRouter] API key is required to fetch models");
    }

    error.value = null;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/models", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey.value}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      availableModels.value = data.data.map((model: OpenRouterModel) => ({
        id: model.id,
        name: model.name,
        description: model.description,
        context_length: model.context_length,
        pricing: {
          prompt: model.pricing.prompt,
          completion: model.pricing.completion,
        },
      }));
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to fetch models";
      availableModels.value = [];
      throw err;
    }
  }

  /**
   * Tracks usage of a model by adding it to recent models list
   *
   * @example
   * ```ts
   * const { trackModelUsage, recentModels } = useOpenRouter()
   *
   * trackModelUsage('anthropic/claude-3-sonnet')
   * console.log(recentModels.value)
   * // Shows most recently used models, limited to 10
   * ```
   *
   * @param modelId - The OpenRouter model identifier to track
   */
  function trackModelUsage(modelId: string) {
    recentModelIds.value = [
      modelId,
      ...recentModelIds.value.filter((id) => id !== modelId),
    ].slice(0, 10);
  }

  // Get recent models
  const recentModels = computed(() => {
    return recentModelIds.value
      .map((id) =>
        availableModels.value.find((m: OpenRouterModel) => m.id === id)
      )
      .filter((m): m is OpenRouterModel => m !== undefined);
  });

  // Watch for API key changes to fetch models
  watch(apiKey, async (newKey) => {
    if (newKey) {
      await fetchAvailableModels();
    } else {
      availableModels.value = [];
    }
  });

  /**
   * Sets the OpenRouter API key
   *
   * @example
   * ```ts
   * const { setApiKey, hasValidKey } = useOpenRouter()
   *
   * setApiKey('your-api-key')
   * console.log(hasValidKey.value) // true
   * ```
   *
   * @param key - The OpenRouter API key
   */
  function setApiKey(key: string): void {
    apiKey.value = key;
  }

  // Set current model
  function setModel(modelId: string) {
    if (availableModels.value.find((m: OpenRouterModel) => m.id === modelId)) {
      currentModel.value = modelId;
    }
  }

  // Get enabled models
  const enabledModels = computed(() => {
    return availableModels.value
      .filter((model: OpenRouterModel) =>
        enabledModelIds.value.includes(model.id)
      )
      .sort((a: OpenRouterModel, b: OpenRouterModel) => {
        const costA = (a.pricing.prompt + a.pricing.completion) / 2;
        const costB = (b.pricing.prompt + b.pricing.completion) / 2;
        // Free models go to the bottom
        if (costA === 0 && costB !== 0) {
          return 1;
        }
        if (costB === 0 && costA !== 0) {
          return -1;
        }
        return costB - costA;
      });
  });

  /**
   * Sends a message to the AI and waits for its response
   *
   * @throws {Error} If the API request fails
   */
  async function sendMessage(content: string) {
    if (!hasValidKey.value) {
      throw new Error("API key is required");
    }

    if (!content.trim()) {
      throw new Error("Message content cannot be empty");
    }

    isLoading.value = true;
    error.value = null;

    try {
      const userMessage: ChatMessage = { role: "user", content };
      messages.value.push(userMessage);

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey.value}`,
            "Content-Type": "application/json",
            "HTTP-Referer": window.location.origin,
          },
          body: JSON.stringify({
            model: currentModel.value,
            messages: messages.value,
            temperature: temperature.value,
            max_tokens: 4096, // Reasonable default
          }),
        }
      );

      if (!response.ok) {
        const errorData = (await response.json()) as OpenRouterError;
        throw new Error(
          errorData.error?.message || `API error: ${response.status}`
        );
      }

      const data = (await response.json()) as ChatResponse;

      if (!data.choices?.[0]?.message) {
        throw new Error("Invalid response from API");
      }

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: data.choices[0].message.content,
      };

      messages.value.push(assistantMessage);

      // Update stats with proper type checking
      chatStats.value = {
        tokens: (chatStats.value.tokens || 0) + (data.usage?.total_tokens || 0),
        promptTokens: data.usage?.prompt_tokens || 0,
        completionTokens: data.usage?.completion_tokens || 0,
        cost: chatStats.value.cost + (data.usage?.total_cost || 0),
        totalCost: chatStats.value.totalCost + (data.usage?.total_cost || 0),
      };
    } catch (err) {
      error.value =
        err instanceof Error ? err.message : "Failed to send message";
      console.error("Send message error:", err);
      throw err; // Re-throw to allow caller to handle
    } finally {
      isLoading.value = false;
    }
  }

  /**
   * Clears the current chat conversation
   *
   * This resets:
   * - All messages (conversation history)
   * - Chat ID
   * - Token usage statistics
   * - Cost tracking
   *
   * Use this when you want to start a fresh conversation.
   * The model and temperature settings remain unchanged.
   *
   * @example
   * ```ts
   * const chat = useOpenRouter()
   *
   * // Have a conversation
   * await chat.sendMessage('Hello!')
   *
   * // Check message count
   * console.log(chat.messages.value.length) // 2 (your message + AI response)
   *
   * // Clear everything
   * chat.clearChat()
   *
   * // Verify it's empty
   * console.log(chat.messages.value.length) // 0
   * console.log(chat.chatStats.value.tokens) // 0
   * console.log(chat.chatStats.value.cost) // 0
   * ```
   */
  function clearChat() {
    messages.value = [];
    currentChatId.value = null;
    chatStats.value = {
      tokens: 0,
      cost: 0,
      promptTokens: 0,
      completionTokens: 0,
      totalCost: 0,
    };
  }

  /**
   * Updates the AI's temperature setting
   *
   * Temperature controls how "creative" or "focused" the AI's responses are:
   *
   * - 0.0: Very focused, consistent, and deterministic
   *   Good for: Math, coding, factual Q&A
   *
   * - 0.7: Balanced creativity and focus (default)
   *   Good for: General chat, explanations, analysis
   *
   * - 1.0: Maximum creativity and randomness
   *   Good for: Brainstorming, creative writing, jokes
   *
   * @example
   * Advanced temperature strategies:
   * ```ts
   * const chat = useOpenRouter()
   *
   * // For coding questions, use very low temperature
   * chat.updateTemperature(0.1)
   * await chat.sendMessage('Write a TypeScript function...')
   *
   * // For creative tasks, gradually increase temperature
   * for (let temp = 0.7; temp <= 1.0; temp += 0.1) {
   *   chat.updateTemperature(temp)
   *   await chat.sendMessage('Generate another story idea...')
   * }
   *
   * // Some models may ignore or handle temperature differently
   * // Always check the model's documentation
   * ```
   *
   * @param value - Temperature between 0.0 and 1.0
   */
  function updateTemperature(value: number) {
    temperature.value = normalizeTemperature(value);
  }

  // Only fetch models on client-side
  onMounted(() => {
    if (hasValidKey.value) {
      fetchAvailableModels();
    }
  });

  // Use window safely
  const origin = typeof window !== "undefined" ? window.location.origin : "";

  // Cleanup on unmount
  onUnmounted(() => {
    messages.value = [];
    error.value = null;
    availableModels.value = [];
  });

  // Stop watching when component unmounts
  const stopWatch = watch(apiKey, async (newKey) => {
    if (newKey) {
      await fetchAvailableModels();
    } else {
      availableModels.value = [];
    }
  });

  onUnmounted(() => {
    stopWatch();
  });

  const isDev = process.env.NODE_ENV === "development";

  function debug(...args: any[]) {
    if (isDev) {
      console.log("[useOpenRouter]", ...args);
    }
  }

  return {
    apiKey,
    setApiKey,
    hasValidKey,
    messages: readonly(messages),
    isLoading: readonly(isLoading),
    error: readonly(error),
    currentModel,
    modelName,
    availableModels: readonly(availableModels),
    enabledModels,
    recentModels,
    trackModelUsage,
    fetchAvailableModels,
    getModelCost,
    formatModelCost,
    setModel,
    currentChatId,
    clearChat,
    chatStats,
    temperature,
    updateTemperature,
    sendMessage,
  };
}
