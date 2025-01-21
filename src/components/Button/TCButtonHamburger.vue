<template>
  <button
    @click="onClick"
    :class="[
      'tc-button-hamburger',
      { 'is-active': props.active }
    ]"
  >
    <span class="hamburger-bar"></span>
    <span class="hamburger-bar"></span>
    <span class="hamburger-bar"></span>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['click']);
const props = defineProps<{
  active: boolean;
}>();


const onClick = (e: any) => {
  emit('click', e);
};
</script>

<style lang="scss" scoped>
button {
  display:flex;
  flex-direction: column;
  align-items: center;
  width: 44px;  
  height: 44px;
  background: transparent;
  border: none;
  cursor: pointer;

}
.hamburger-bar {
  display: block;
  width: 18px;
  height: 2px;
  margin: 2px auto;
  background-color: var(--color-primary);
  transition: all 0.3s;
  transform-origin: 50%;

  :focus &,
  :hover & {
    background-color: #000;
  }

  .is-active & {
    background-color: var(--color-primary-dark);
    transform: rotate(45deg);
    position:absolute;
    top: 45%;
    left: 30%;


    &:nth-child(1){
      transform: rotate(-45deg);
    }

    &:nth-child(2){
      opacity: 0;
      transform: translateX(10px);
    }
  }
}
</style>