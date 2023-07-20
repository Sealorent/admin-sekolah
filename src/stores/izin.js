import { defineStore } from 'pinia'
import mainRepositories from '@/services/mainRepositories.js'

const state = {
  data: [],
  loading: true,
  error: null
}

export const izin = defineStore('izin', {
  state: () => state,
  actions: {
    async listIzin(data) {
      try {
        let response = await mainRepositories.listIzin(data)
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
    },
    async addIzin(data) {
      try {
        let response = await mainRepositories.addIzin(data)
        if (response.data.is_correct == true) {
          this.data = response.data
          this.loading = false
          this.error = null
        } else {
          this.loading = false
          this.error = response.data.laporan
        }
        console.log(state)
        return JSON.stringify(state)
      } catch (err) {
        this.loading = false
        this.error = err.message
        return JSON.stringify(state)
      }
    }
  }
})
