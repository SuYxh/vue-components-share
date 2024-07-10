import type { VNode, ComponentInternalInstance } from 'vue'

export interface MessageProps {
  message?: string | VNode;
  // duration 为 0 表示不关闭
  duration?: number;
  showClose?: boolean;
  type?: 'success'| 'info'| 'warning'| 'danger';
  onDestory: () => void;
  id: string;

  zIndex: number
  offset?: number;
}

export interface MessageContext {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  props: MessageProps;
  destory: () => void;
}

export type CreateMessageProps = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>
