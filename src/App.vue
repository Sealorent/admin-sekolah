<script setup>
import { RouterView } from 'vue-router'
</script>

<template>
  <!-- <div class="flex items-center justify-center ">
    <div class="md:w-full lg:w-96"> -->
      <RouterView />
    <!-- </div>
  </div> -->
  <vue3-snackbar bottom  :duration="1000"/>
</template>


