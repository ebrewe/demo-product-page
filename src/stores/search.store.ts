import { defineStore } from 'pinia'

export const useSearchStore = defineStore({
  id: 'search',
  state: () => ({
    query: '',
  }),
  actions: {
    setQuery(query: string) {
      this.query = query
    },
  },
  getters: {
    getQuery(): string {
      return this.query
    },
  }
})