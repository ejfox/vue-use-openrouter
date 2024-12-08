<template>
  <div>
    <h1>OpenRouter Chat</h1>
    <input v-model="apiKey" placeholder="API Key">
    <div v-for="msg in messages" :key="msg.content">
      {{ msg.role }}: {{ msg.content }}
    </div>
    <input v-model="message" @keyup.enter="send">
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useOpenRouter } from '../src/index'

const chat = useOpenRouter()
const message = ref('')
const apiKey = ref('')

const send = async () => {
  if (!message.value) {
    return
  }
  await chat.sendMessage(message.value)
  message.value = ''
}
</script>
