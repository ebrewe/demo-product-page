<template>
  <teleport to="body">
    <div class="tc-modal-overlay" :class="{'is-open': isOpen}" ref="modal">
      <div class="tc-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <header class="tc-modal-header">
          <h2 id="modal-title">{{ props.title }}</h2>
          <TCButton variant="text" size="large" @click="close" aria-label="Close" ref="closeX">&times;</TCButton>
        </header>
        <div class="tc-modal-body">
          <slot></slot>
        </div>
        <footer class="tc-modal-footer">
          <TCButton variant="secondary" @click="close">Close</TCButton>
        </footer>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
import { ref, toRef, onMounted, onBeforeUnmount, nextTick, watch } from 'vue';
import TCButton from '@/components/Button/TCButton.vue';

interface TCButton {
  button: HTMLElement | null;
}

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  title: {
    type: String,
    required: false,
  },
});

const emit = defineEmits(['close']);

const modal = ref<HTMLElement | null>(null);
const closeX = ref<TCButton | null>(null);

const isOpen = toRef(props, 'isOpen');

const close = () => {
  emit('close');
};


const handleKeydown = (e: KeyboardEvent) => {
  if(!modal.value || !isOpen.value) return;
  if (e.key === 'Escape') {
    close();
  }
  // handle tab for trap
  if (e.key === 'Tab') {
    const focusableElements = modal.value?.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (!focusableElements) return;

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
    if (e.shiftKey && document.activeElement === firstElement) {
      lastElement.focus();
      e.preventDefault();
    } else if (!e.shiftKey && document.activeElement === lastElement) {
      firstElement.focus();
      e.preventDefault();
    }
  }
};

watch(modal, (el) => {
  if (el) {
    document.addEventListener('keydown', handleKeydown);
  }
});

watch(isOpen, async (open) => {
  if (open) {
    // prevent scrolling while the modal is open
    document.body.style.overflow = 'hidden';
    await nextTick();
    if (closeX.value?.button) {
      closeX.value.button.focus();
    }
  } else {
    document.body.style.overflow = '';
  }
});

onMounted(async() => {
  await nextTick();
});

onBeforeUnmount(() => {
  document.removeEventListener('keydown', handleKeydown);
});
</script>

<style lang="scss" scoped>
.tc-modal-overlay {
  position: fixed;
  display: none;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: transparent;
  align-items: center;
  justify-content: center;
  z-index: var(--z-index-modal);

  @media (min-width: 992px) {
    background: rgba(0, 0, 0, 0.4);
  }

  &.is-open {
    display: flex;
  }
}

.tc-modal {
  background: white;
  display: flex;
  flex-direction: column;
  border-radius: 0.5rem;
  width: calc(100vw - var(--gap-site-small) * 2);
  padding: var(--gap-site-small);
  height: calc(100vh - 120px);
  position:fixed;
  bottom:0;
  animation: fadeUp 0.3s ease-out;

  @media(min-width: 992px) {
    width: 684px;
    padding: 40px;
    position: relative;
    height: auto;
    max-width: 800px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
}

.tc-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  button {
    margin-left: auto;
  }
}

.tc-modal-body {
  margin: 1rem 0 60px;
  display: flex;
  flex-direction: column;
}

.tc-modal-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: auto;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
