<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <div class="md:w-full lg:w-80">
      <RouterView />
    </div>
  </div>
  <vue3-snackbar bottom  :duration="1000"/>
</template>


