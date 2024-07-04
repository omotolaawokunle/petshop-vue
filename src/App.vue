<template>
  <NavBar />
  <router-view />
</template>

<script lang="ts">
  import axios from 'axios';
  import { defineComponent } from 'vue';
  import { useAuthStore } from '@/store/auth';
  import NavBar from '@/components/NavBar.vue';
  export default defineComponent({
    name: 'HomeView',
    inject: ['baseUrl'],
    components: { NavBar },
    created() {
      axios.interceptors.response.use((response) => {
        return response;
      }, function (err) {
        let res = err.response;
        const store = useAuthStore();
        return new Promise(function (resolve, reject) {
          if (res.status === 401 && res.config && !res.config.__isRetryRequest) {
            store.logout();
          }
          reject(err);
          throw err;
        });
      });
    },
  });
</script>
<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>