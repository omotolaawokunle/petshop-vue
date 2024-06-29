import { defineStore } from 'pinia';
import axios from 'axios';
import LoginCredentials from '@/types/LoginCredentials';

interface AuthState {
  isAuthenticated: boolean,
  accessToken: string | null,
}


export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        isAuthenticated: false,
        accessToken: null,
    }),
    actions: {
        login(credentials: LoginCredentials) {
            return new Promise((resolve, reject) => {
                axios.post('', credentials).then(res => {
                    this.isAuthenticated = true;
                    this.accessToken = res.data.data.token;
                    this.setAccessToken(res.data.data.token);
                    resolve(res);
                }).catch(err => {
                    reject(err);
                });
            });
        },
        logout() {
            this.isAuthenticated = false;
            this.accessToken = null;
            this.removeAccessToken();
        },
        setAccessToken(token: string) {
            const today = new Date();
            let tomorrow = new Date(new Date().setDate(today.getDate() + 1));
            tomorrow = new Date(tomorrow.setHours(0, 0, 0));
            document.cookie = `auth_token=${token}; expires=${tomorrow.toISOString()}`;
        },
        getAccessToken() {
            const allCookieParts = document.cookie.split(';');
            const matchingCookie = allCookieParts.find(part => part.trim().startsWith('auth_token='));
            if (matchingCookie) {
                return matchingCookie.split('=')[1];
            }
            return null;
        },
        removeAccessToken() {
            document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC";
        },
    },
})