<template>
  <div
    v-show="visible"
    class="vk-message"
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
import { ref, defineProps, withDefaults, defineOptions, onMounted } from "vue";
import RenderVnode from "../Common/RenderVnode";
import Icon from '../Icon/Icon.vue'
import type { MessageProps } from "./types";

defineOptions({
  name: 'VkMessage'
})

// 1.定义 props
const props = withDefaults(defineProps<MessageProps>(), {
  type: "info",
  duration: 3000,
});

let timer: any;

const visible = ref(false);

function startTimer() {
  if (props.duration === 0) return;
  timer = setTimeout(() => {
    visible.value = false;
  }, props.duration);
}

onMounted(async () => {
  visible.value = true;
  startTimer();
});
</script>
