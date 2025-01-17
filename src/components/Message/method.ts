import { render, h, shallowReactive } from 'vue'
import MessageConstructor from './Message.vue'
import useZIndex from './useZIndex';
import type { CreateMessageProps, MessageContext } from './types';

let seed = 1

// const instances: MessageContext[] = []
// 为什么要使用  shallowReactive([])
const instances: MessageContext[] = shallowReactive([])

export const createMessage = (props: CreateMessageProps) => {
  // console.log('createMessage 执行');

  const { nextZIndex } = useZIndex()

  const id = `message_${seed++}`

  const container = document.createElement('div')

  const destory = () => {
    // console.log('createMessage -- destory');
    // 删除数组中的实例
    const idx = instances.findIndex(instance => instance.id === id)
    if (idx === -1) return
    instances.splice(idx, 1)
    render(null, container)
  }

  // 手动删除，就是手动修改组件 visible 的值
  const manualDestroy = () => {
    const instance = instances.find(instance => instance.id === id)
    if (instance) {
      instance.vm.exposed!.visible.value = false
    }
  }

  const newProps = {
    ...props,
    id,
    zIndex: nextZIndex(),
    onDestory: destory
  }

  const vnode = h(MessageConstructor, newProps)
  console.log('vnode', vnode);

  // console.log('render-1');
  render(vnode, container)
  // console.log('render-2');

  // console.log('appendChild-1');
  // 插入 dom 节点
  document.body.appendChild(container.firstElementChild!)
  // console.log('appendChild-2');

  // vnode.component 这个获取到的是什么？
  const vm = vnode.component!
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    destory: manualDestroy
  }

  // console.log('instances.push-1');
  instances.push(instance)
  // console.log('instances.push-2');
  return instance
}

export const getLastInstance = () => {
  return instances.at(-1)
}

export const getLastBottomOffset = (id: string) => {
  const idx = instances.findIndex(instance => instance.id === id)
  console.log('getLastBottomOffset -- idx', id, idx, instances.length)
  if (idx <= 0) {
    return 0
  } else {
    const prev = instances[idx - 1]
    return prev.vm.exposed!.bottomOffset.value
  }
}