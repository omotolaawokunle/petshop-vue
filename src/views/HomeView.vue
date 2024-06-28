<template>
  <div class="home">
    
    <p>"Welcome to Your Vue.js + TypeScript App"</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'HomeView',
  setup() {
    const orders = ref([]);

    return { orders };
  }
});
</script>
