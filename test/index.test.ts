import { describe, expect, it } from "vitest";
import { useOpenRouter } from "../src";

describe("useOpenRouter", () => {
  it("initializes with default values", () => {
    const chat = useOpenRouter();
    expect(chat.apiKey.value).toBe("");
    expect(chat.currentModel.value).toBe("anthropic/claude-3-sonnet:beta");
    expect(chat.temperature.value).toBe(0.7);
  });
});
