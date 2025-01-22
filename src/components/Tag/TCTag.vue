<template>
  <div :class="['tc-tag', `tag-${status}`]">
    <slot />
  </div>
</template>

<script setup lang="ts">
  const props = defineProps({
    status: {
      type: String,
      required: true,
    },
  });
</script>

<style scoped>
.tc-tag {
  display: inline-block;
  border-radius: 12px;
  border: 1px solid transparent;
  padding: 4px 24px;

  &:hover {
    border-color: black;
  }

  &.tag-Primary {
    background-color: var(--color-primary-light);
    color: var(--color-primary);
  }
  &.tag-Secondary {
    background-color: var(--color-secondary-light);
    color: var(--color-secondary);
  }
  &.tag-Warning {
    background-color: var(--color-warning-light);
    color: var(--color-warning);
  }
  &.tag-Danger {
    background-color: var(--color-danger-light);
    color: var(--color-danger);
  }
}
</style>