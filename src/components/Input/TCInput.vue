<template>
  <div class="tc-input--wrapper">
    <label v-if="label" :for="id" class="tc-input--label input-label">{{ label }}</label>
    <div class="tc-input--container">
      <div class="slot-icon slot-icon--before" v-if="hasIconBefore">
        <slot name="icon-before" />
      </div>
      <input 
        :id="id" 
        class="tc-input--input" 
        :class="{'has-icon-before': hasIconBefore, 'has-icon-after': hasIconAfter}"
        :placeholder="props.placeholder" 
        v-model="model" 
      />
      <div class=" slot-icon slot-icon--after" v-if="hasIconAfter">
        <slot name="icon-after" />
      </div>  
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, useSlots, toRef } from 'vue';

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  }
});

const slots = useSlots();

const model = defineModel();

const hasIconBefore = computed(() => slots['icon-before']);
const hasIconAfter = computed(() => slots['icon-after']);

</script>

<style lang="scss" scoped>
.tc-input--wrapper {
  display: flex;
  align-items: center;
}

.tc-input--label {
  margin-right: 8px;
  font-weight: bold;
}

.tc-input--container {
  position: relative;
  flex: 1;
}

.tc-input--input {
  padding: var(--input-padding-y) var(--input-padding-x);
  height: var(--input-height);
  border: 1px solid #ccc;
  border-radius: 0 var(--input-border-radius) var(--input-border-radius) 0; //lame gotcha
  
  &::placeholder {
    color: #999;
  }

  &:focus {
    outline: none;
    border-color: #333;
  }

  &.has-icon-before {
    padding-left: calc(var(--input-padding-x) * 3);
  }
  &.has-icon-after {
    padding-right: calc(var(--input-padding-x) * 3);
  }
}
.slot-icon {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  width: 24px;
  height: 24px;
}

.slot-icon--before {
  left: 16px;
}

.slot-icon--after {
  right: 16px;
}
</style>
