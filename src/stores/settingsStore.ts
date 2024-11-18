import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  name: string;
  email: string;
  notifications: {
    email: boolean;
    push: boolean;
    desktop: boolean;
  };
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  saveSettings: (settings: Partial<SettingsState>) => Promise<void>;
  loadSettings: () => Promise<void>;
  toggleNotification: (type: 'email' | 'push' | 'desktop') => void;
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  setLanguage: (language: string) => void;
  setTimezone: (timezone: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      name: '',
      email: '',
      notifications: {
        email: true,
        push: true,
        desktop: true,
      },
      theme: 'system',
      language: 'en',
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

      saveSettings: async (newSettings) => {
        set((state) => ({
          ...state,
          ...newSettings,
        }));
      },

      loadSettings: async () => {
        // Settings are automatically loaded by persist middleware
      },

      toggleNotification: (type) => {
        set((state) => ({
          notifications: {
            ...state.notifications,
            [type]: !state.notifications[type],
          },
        }));
      },

      setTheme: (theme) => {
        set({ theme });
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },

      setLanguage: (language) => {
        set({ language });
      },

      setTimezone: (timezone) => {
        set({ timezone });
      },
    }),
    {
      name: 'user-settings',
    }
  )
);