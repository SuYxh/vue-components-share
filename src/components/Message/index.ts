import type { App } from 'vue'
import Message from '@/components/Message/Message.vue'

Message.install = (app: App) => {
  app.component(Message.name!, Message)
}

export default Message

export * from './types'
