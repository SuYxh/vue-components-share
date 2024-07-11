<script setup lang="ts">
import { onMounted, h } from 'vue';
import Button from './components/Button/Button.vue'
import Message, { createMessage } from './components/Message';

const handleClick = () => {
  createMessage({ message: 'hello world-13', duration: 6000, showClose: true })
}


onMounted(() => {
  // createMessage({ message: 'hello world - 0', duration: 3000, showClose: true })

  // createMessage({ message: 'hello world - 1', duration: 3000, showClose: true })
  // createMessage({ message: 'hello world - 2', duration: 3000, showClose: true })
  // createMessage({ message: 'hello world - 3', duration: 3000, showClose: true })

  // 测试手动删除
  // const instance = createMessage({ message: 'hello world - 4', duration: 5000, showClose: true })
  // setTimeout(() => {
  //   instance.destory()
  // }, 2000);
  // createMessage({ message: 'hello world - 5', duration: 5000, showClose: true })

  // z-index 测试 、键盘关闭测试
  // createMessage({ message: 'hello world - 6', duration: 0, showClose: true })
  // createMessage({ message: 'hello world - 7', duration: 0, showClose: true })
  // createMessage({ message: 'hello world - 8', duration: 0, showClose: true })

  // 测试鼠标移入
  // createMessage({ message: 'hello world - 9', duration: 1000, showClose: true })

  // 测试动画
  createMessage({ message: 'hello world - 10', duration: 3000, showClose: true })
  createMessage({ message: 'hello world - 11', duration: 4000, showClose: true, type: 'success' })
  createMessage({ message: 'hello world - 12', duration: 5000, showClose: true, type: 'danger' })

  // 
  createMessage({ message: h('b', 'hello world - 13'), duration: 4000, showClose: true, type: 'success' })
})
</script>

<template>
  <main>
    <Button ref="buttonRef" @click="handleClick">Open Message</Button>

    <!-- <Message message="您有新的订单，请注意查收!" showClose /> -->
  </main>
</template>

<style>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  border: 1px solid green;
}
.vk-tooltip__popper {
  border: 1px solid red;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
