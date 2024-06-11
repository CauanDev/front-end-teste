import { computed, ref } from 'vue';
import { defineStore } from "pinia";
import httpAuth from '@/services/httpAuth.js';

export const useAuth = defineStore('auth', () => {
  const token = ref(localStorage.getItem("token"));
  const user = ref(JSON.parse(localStorage.getItem("user")));

  function setToken(tokenValue) {
    localStorage.setItem('token', tokenValue);
    token.value = tokenValue;
  }

  function setUser(userValue) {
    localStorage.setItem('user', JSON.stringify(userValue));
    user.value = userValue;
  }

  const isAuthenticated = computed(() => {
    return token.value && user.value;
  });

  function clear() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    user.value = '';
    token.value = '';
  }

  async function checkToken() {
    try {
      const tokenAuth = 'Bearer ' + token.value;
      const { data } = await httpAuth.get('/auth/verify', {
        headers: {
          Authorization: tokenAuth
        }
      });
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    checkToken,
    token,
    user,
    setToken,
    setUser,
    isAuthenticated,
    clear
  };
});
