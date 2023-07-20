import { defineStore } from 'pinia'
import mainRepositories from '@/services/mainRepositories.js'

const state = {
  data: [],
  loading: true,
  error: null
}

export const tahfidz = defineStore('tahfidz', {
  state: () => state,
  actions: {
    async listTahfidz(data) {
      try {
        let response = await mainRepositories.listTahfidz(data)
        if (response.data.is_correct == true) {
          this.data = response.data.laporan
          this.loading = false
          this.error = null
        } else {
          this.loading = false
          this.error = response.data.laporan
        }
        return JSON.stringify(state)
      } catch (err) {
        this.loading = false
        this.error = err.message
        return JSON.stringify(state)
      }
    }
  }
})
