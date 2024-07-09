<script setup lang="ts">
import Button from './components/Button/Button.vue'
import Message from './components/Message';

</script>

<template>
  <main>
    <Button ref="buttonRef">Test Button</Button>

    <Message message="您有新的订单，请注意查收!" showClose />
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
