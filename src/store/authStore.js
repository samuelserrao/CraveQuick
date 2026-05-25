import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { users as initialMockUsers } from '../data/mock';

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      registeredUsers: initialMockUsers.map(u => ({ ...u, password: 'password' })),
      login: (email, password) => {
        const { registeredUsers } = get();
        const foundUser = registeredUsers.find(u => u.email === email);
        if (foundUser && foundUser.password === password) {
          const userWithoutPassword = { ...foundUser };
          delete userWithoutPassword.password;
          set({ user: userWithoutPassword, isAuthenticated: true });
          return { success: true };
        }
        return { success: false, error: 'Invalid credentials' };
      },
      signup: (name, email, password) => {
        const { registeredUsers } = get();
        if (registeredUsers.find(u => u.email === email)) {
          return { success: false, error: 'Email already exists' };
        }
        const newUser = {
          id: Date.now().toString(),
          name,
          email,
          password,
          role: 'customer'
        };
        set({ registeredUsers: [...registeredUsers, newUser] });
        return { success: true };
      },
      logout: () => set({ user: null, isAuthenticated: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
