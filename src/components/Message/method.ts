import { render, h, shallowReactive } from 'vue'
import MessageConstructor from './Message.vue'
import type { CreateMessageProps, MessageContext } from './types';

let seed = 1

// const instances: MessageContext[] = []
// 为什么要使用  shallowReactive([])
const instances: MessageContext[] = shallowReactive([])

export const createMessage = (props: CreateMessageProps) => {
  const id = `message_${seed++}`

  const container = document.createElement('div')

  const destory = () => {
    render(null, container)
  }

  const manualDestroy = () => {
    const instance = instances.find(instance => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }

  const newProps = {
    ...props,
    id,
    onDestory: destory
  }

  const vnode = h(MessageConstructor, newProps)
  console.log('vnode', vnode);
  render(vnode, container)

  // 插入 dom 节点
  document.body.appendChild(container.firstElementChild!)

  // vnode.component 这个获取到的是什么？
  const vm = vnode.component!
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destory: manualDestroy
  }
  instances.push(instance)
  return instance
}

export const getLastInstance = () => {
  return instances.at(-1)
}

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex(instance => instance.id === id)
  console.log('idx', id, idx, instances.length)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}