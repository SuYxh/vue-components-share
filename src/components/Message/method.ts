import { render, h } from 'vue'
import MessageConstructor from './Message.vue'
import type { MessageProps } from './types';

export const createMessage = (props: MessageProps) => {
  const container = document.createElement('div')
  const vnode = h(MessageConstructor, props)
  render(vnode, container)

  // 插入 dom 节点
  document.body.appendChild(container.firstElementChild!)
}