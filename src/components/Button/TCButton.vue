<template>
  <button
    :class="[
      'tc-button',
      buttonClass,
      { 'button-loading': loading }
    ]"
    :disabled="disabled || loading"
    @click="onClick"
    ref="button"
  >
    <slot />
    <span v-if="loading" class="button-loading-spinner"></span>
  </button>
</template>

<script setup lang="ts">
import { ref, withDefaults, computed } from 'vue';

interface buttonProps {
  variant?: 'default' | 'secondary' | 'text';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
}

const props = withDefaults(defineProps<buttonProps>(), {
  variant: 'default',
  size: 'medium',
  disabled: false,
  loading: false,
});
const emit = defineEmits(['click']);

const button = ref<HTMLButtonElement | null>(null);

const buttonClass = computed(() => `button-${props.variant} tc-button-${props.size}`);

const onClick = (e: any) => {
  emit('click', e);
};

defineExpose({
  button,
}); 
</script>

<style lang="scss" scoped>
$button-padding: 12px 24px;
$button-bg-default: var(--color-primary);
$button-color-default: #fff;
$button-color-default-shade: #fff;
$button-bg-default-shade: var(--color-primary-dark);
$button-bg-secondary: var(--color-button-secondary);
$button-color-secondary: #000;
$button-color-secondary-shade: var(--color-primary);

.tc-button {
  display: inline-block;
  padding: $button-padding;
  font-size: var(--button-font-size);
  line-height: var(--base-line-height);
  color: $button-color-default;
  background-color: $button-bg-default;
  border: none;
  border-radius: var(--base-radius);
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: $button-bg-default-shade;
  }

  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  &.button-secondary {
    color: $button-color-secondary;
    background-color: $button-bg-secondary;

    &:hover {
      color: $button-color-secondary-shade;
    }
  }

  &.button-text {
    color: $button-color-secondary;
    background-color: transparent;

    &:hover {
      color: $button-color-secondary-shade;
    }
  }

  &-small {
    padding: 4px 8px;
    font-size: 0.875rem;
  }

  &-large {
    padding: 12px 24px;
    font-size: 1.25rem;
  }

  &-icon-before {
    position: relative;
  }

  &-icon-before::before {
    content: '';
    position: absolute;
    left: 8px;
    top: 50%;
    transform: translateY(-50%);
  }
}

.button-loading {
  pointer-events: none;
}

.button-loading-spinner {
  display: inline-block;
  width: 1rem;
  height: 1rem;
  border: 2px solid #fff;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
