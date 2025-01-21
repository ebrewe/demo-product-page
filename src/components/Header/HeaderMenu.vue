<template>
  <div class="header-menu">
    <TCButtonHamburger 
      class="toggle-menu" 
      @click="toggleMenu(!menuOpen)" 
      aria-haspopup="menu" 
      aria-controls="header-menu-overlay"
      :active="menuOpen"
      :aria-expanded="menuOpen"
      :aria-label="menuLabel"
    >
      <span v-if="menuOpen">&times;</span>
      <img :src="MenuButton" alt="Menu button" v-else />
    </TCButtonHamburger>
    <div  id="header-menu-overlay" :class="{'header-menu-overlay': true, 'is-open': menuOpen}">
      <HeaderMenuItems />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router'; 
import HeaderMenuItems from './HeaderMenuItems.vue';
import TCButtonHamburger from '@/components/Button/TCButtonHamburger.vue';
import MenuButton from '@/assets/PNG/menu.png';

const router = useRouter();

const menuOpen = ref(false);
const menuLabel = computed(() => menuOpen.value ? 'Close menu' : 'Open menu');

const toggleMenu = (open:boolean = false) => {
  menuOpen.value = open;
};

// Close menu when route changes
watch(() => router.currentRoute, () => toggleMenu(false));

// Close menu when user clicks outside of menu
const handleClickOutside = (e:MouseEvent) => {
  if (!(e.target as Element).closest('.header-menu')) {
    toggleMenu(false);
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="scss" scoped>
.header-menu {
  position:absolute;
  right: 0;
  width: 60px;
  height: 60px;

  @media (min-width: 768px) {
    width: auto;
  }
}
.toggle-menu {
  display: flex;
  position:absolute;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  z-index: calc(var(--z-index-dropdown) + 1);

  span {
    font-size: 1.5rem;
  }

  @media (min-width: 768px) {
    display: none;
  }
}
.header-menu-overlay {
  position: fixed;
  top: 0;
  right:0;
  height: 100vh;
  background-color: var(--color-bg-body);
  padding: 60px calc(var(--base-padding-x) * 4) 100px calc(var(--base-padding-x) * 2);
  z-index: var(--z-index-dropdown);
  transform: translateX(100%);
  transition: transform .3s cubic-bezier(0.075, 0.82, 0.165, 1);

  &.is-open {
    box-shadow: var(--base-shadow);
    transform: translateX(0);

  }

  @media(min-width: 992px) {
    display: none;
  }
}

</style>