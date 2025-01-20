import { defineStore } from 'pinia';
import { type User } from '@/types/User';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

const demoUser: User = {
  id: '1',
  name: 'Adriana Arias',
};

const initialState: AuthState = {
  isAuthenticated: false,
  user: demoUser
};

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => initialState,
  actions: {
    login(user: { id: string; name: string }) {
      this.isAuthenticated = true;
      this.user = user;
    },
    logout() {
      this.isAuthenticated = false;
      this.user = null;
    },
    demoLogin() {
      this.login(demoUser);
    }
  },
});
