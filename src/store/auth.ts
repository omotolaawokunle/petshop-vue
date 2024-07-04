import { defineStore } from 'pinia';
import axios from 'axios';
import LoginCredentials from '@/types/LoginCredentials';

interface AuthState {
  isAuthenticated: boolean,
  accessToken: string | null,
}


export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({
        isAuthenticated: localStorage.getItem('auth_token') != undefined,
        accessToken: localStorage.getItem('auth_token') != undefined ? localStorage.getItem('auth_token') : null,
    }),
    actions: {
        login(credentials: LoginCredentials) {
            return new Promise((resolve, reject) => {
                const baseUrl = 'https://pet-shop.buckhill.com.hr/api/v1/';
                axios.post(baseUrl + 'user/login', credentials).then(res => {
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
            localStorage.setItem('auth_token', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        },
        getAccessToken() {
            return localStorage.getItem('auth_token') != undefined ? localStorage.getItem('auth_token') : null ;
        },
        removeAccessToken() {
            localStorage.removeItem('auth_token');
            delete axios.defaults.headers.common['Authorization'];
        },
    },
})