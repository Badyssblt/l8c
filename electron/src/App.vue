<template>
  <div class="flex">
    <NavBar/>
  <main class="flex-1">
    <RouterView/>
  </main>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import NavBar from './components/automation/NavBar/NavBar.vue';
</script>