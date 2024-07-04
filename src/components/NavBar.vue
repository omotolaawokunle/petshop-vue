<template>
    <nav class="bg-main">
        <div class="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
                    <button type="button" @click="isOpen = !isOpen"
                        class="relative inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                        aria-controls="mobile-menu" aria-expanded="false">
                        <span class="absolute -inset-0.5"></span>
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" :class="{ 'hidden': isOpen, 'block': !isOpen }" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                        <svg class="w-6 h-6" :class="{ 'hidden': !isOpen, 'block': isOpen }" fill="none"
                            viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div class="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
                    <div class="flex items-center flex-shrink-0 text-lg font-black text-white">
                        Petshop
                    </div>
                    <div class="hidden sm:ml-6 sm:block">
                        <div class="flex space-x-4">
                            <router-link :to="{ name: 'home' }"
                                :class="{ 'bg-white text-main': route.name == 'home', 'text-white hover:text-main hover:bg-white': route.name != 'home' }"
                                class="block px-3 py-2 text-base font-medium rounded-md">Orders</router-link>
                        </div>
                    </div>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                    <div class="relative ml-3">
                        <button type="button" v-if="store.isAuthenticated" @click="logout"
                            class="relative p-2 text-white border-white rounded hover:text-main hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-main">Logout</button>
                        <router-link v-else :to="{ name: 'login' }"
                            class="relative p-2 text-white border-white rounded hover:text-main hover:bg-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-main">Login</router-link>
                    </div>
                </div>
            </div>
        </div>

        <div class="sm:hidden" :class="{ 'hidden': !isOpen }" id="mobile-menu">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <router-link :to="{ name: 'home' }"
                    :class="{ 'bg-white text-main': route.name == 'home', 'text-white hover:text-main hover:bg-white': route.name != 'home' }"
                    class="block px-3 py-2 text-base font-medium rounded-md">Orders</router-link>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
    import { defineComponent, ref } from 'vue';
    import { useAuthStore } from '@/store/auth';
    import { useRoute } from 'vue-router'
    export default defineComponent({
        name: 'NavBar',
        setup() {
            const isOpen = ref(false);
            const store = useAuthStore();
            const route = useRoute();
            return { isOpen, store, route };
        },
        methods: {
            logout() {
                this.store.logout();
            }
        }
    });
</script>
