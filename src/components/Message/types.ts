import type { VNode } from 'vue'

export interface MessageProps {
  message?: string | VNode;
  // duration 为 0 表示不关闭
  duration?: number;
  showClose?: boolean;
  type?: 'success'| 'info'| 'warning'| 'danger';
}