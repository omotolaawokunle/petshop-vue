<template>
  <div>
    <div class="w-full md:h-screen">
      <div class="py-12">
        <h4 class="text-lg font-bold text-center text-main">Petshop</h4>
        <div class="flex items-center justify-center w-full">
          <div class="w-full p-10 bg-white rounded-md shadow-md md:max-w-lg">
            <h3 class="text-xl font-medium">Sign In</h3>
            <p class="mb-6 text-sm text-gray-500">
              Enter your details to proceed
            </p>
            <form action="" @submit.prevent="login">
              <div class="mb-2 form-group">
                <label for="email" class="block text-sm font-bold text-left">Email Address</label>
                <input v-model="email" type="email" class="w-full p-3 text-sm bg-white border border-gray-300 rounded"
                  id="email" required />
              </div>
              <div class="relative mb-2 form-group">
                <label for="password" class="block text-sm font-bold text-left">Password</label>
                <input v-model="password" type="password" minlength="4"
                  class="relative w-full px-3 py-3 text-sm bg-white border border-gray-300 rounded" id="password"
                  required />
              </div>
              <div class="flex flex-wrap justify-between gap-4 my-3 text-xs item-center">
                <label for="remember_me" class="flex items-center">
                  <input type="checkbox" id="remember_me" />
                  <span class="ml-1.5">Remember me</span>
                </label>
              </div>
              <button type="submit"
                class="inline-flex items-center justify-center w-full p-4 text-center text-white rounded login bg-main disabled:bg-opacity-50">
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { useAuthStore } from '@/store/auth';
  import { useToast } from 'vue-toastification';
  import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'LoginView',
  setup() {
    const email = ref('');
    const password = ref('');
    const authStore = useAuthStore();
    const toast = useToast();
    const router = useRouter();
    const login = async () => {
      await authStore.login({ email: email.value, password: password.value }).then(() => {
        router.push('/');
      }).catch((error) => {
        toast.error(error.response.data.error ?? error.response.data.message)
      });
    };

    return { email, password, login };
  },
});
</script>