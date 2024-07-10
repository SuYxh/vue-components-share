<template>
  <div
    v-show="visible"
    class="vk-message"
    ref="messageRef"
    :style="cssStyle"
    role="alert"
    :class="{
      [`vk-message--${type}`]: type,
      'is-close': showClose,
    }"
  >
    <div class="vk-message__content">
      <slot>
        <RenderVnode v-if="message" :vNode="message" />
      </slot>
    </div>
    <div class="vk-message__close" v-if="showClose">
      <Icon @click.stop="visible = false" icon="xmark" />
    </div>
  </div>
</template>

<script setup lang="ts">
console.log('Message setup');
import {
  ref,
  defineProps,
  withDefaults,
  defineOptions,
  defineExpose,
  onMounted,
  watch,
  computed,
  nextTick,
  getCurrentInstance
} from "vue";
import RenderVnode from "../Common/RenderVnode";
import Icon from "../Icon/Icon.vue";
import { getLastBottomOffset } from "./method";
import type { MessageProps } from "./types";

defineOptions({
  name: "VkMessage",
});

// 1.定义 props
const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
  offset: 20,
});

let timer: any;

const messageRef = ref<HTMLDivElement>();

const instance = getCurrentInstance()
console.log('Message-instance', instance);

const visible = ref(false);
// 计算偏移高度
// 这个 div 的高度
const height = ref(0);
// 上一个实例的最下面的坐标数字，第一个是 0
const lastOffset = computed(() => {
  console.log('computed--lastOffset');
  return getLastBottomOffset(props.id)
});
// 这个元素应该使用的 top
const topOffset = computed(() => {
  console.log('computed--topOffset');
  return props.offset + lastOffset.value
});
// 这个元素为下一个元素预留的 offset，也就是它最低端 bottom 的 值
const bottomOffset = computed(() => {
  console.log('computed--bottomOffset');
  return height.value + topOffset.value
});

const cssStyle = computed(() => ({
  top: topOffset.value + "px",
}));

function startTimer() {
  if (props.duration === 0) return;
  timer = setTimeout(() => {
    visible.value = false;
  }, props.duration);
}

function destroyComponent() {
  props.onDestory();
}

watch(visible, (newVal) => {
  if (!newVal) {
    destroyComponent();
  }
});

onMounted(async () => {
  console.log('Message onMounted');
  visible.value = true;
  startTimer();
  await nextTick()
  height.value = messageRef.value!.getBoundingClientRect().height
  console.log('height.value', height.value);
});

defineExpose({
  bottomOffset,
  visible
})
</script>
