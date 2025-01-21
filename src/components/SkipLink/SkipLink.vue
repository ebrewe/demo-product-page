<template>  
  <a href="#main" class="skip-link">Skip to main content</a>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background-color: #000;
  color: #fff;
  padding: 10px;
  z-index: 1000;
  text-decoration: none;
  transition: top 0.3s;

  &:focus {
    top: 0;
  }
}
</style>