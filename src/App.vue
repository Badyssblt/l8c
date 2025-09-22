<template>
  <nav>
    <RouterLink to="/create-automation">Automatisation</RouterLink>
  </nav>
  <main>
    <RouterView/>
  </main>
</template>

<script setup>
import { RouterView } from 'vue-router';
</script>