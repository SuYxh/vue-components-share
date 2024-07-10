import { render, h } from 'vue'
import MessageConstructor from './Message.vue'
import type { CreateMessageProps } from './types';

export const createMessage = (props: CreateMessageProps) => {
  const container = document.createElement('div')

  const destory = () => {
    render(null, container)
  }

  const newProps = {
    ...props,
    onDestory: destory
  }

  const vnode = h(MessageConstructor, newProps)
  render(vnode, container)

  // 插入 dom 节点
  document.body.appendChild(container.firstElementChild!)
}