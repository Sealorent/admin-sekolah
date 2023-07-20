import { defineStore } from 'pinia'
import mainRepositories from '@/services/mainRepositories.js'

const state = {
  data: [],
  loading: true,
  error: null
}

export const konseling = defineStore('konseling', {
  state: () => state,
  actions: {
    async listKonseling(data) {
      try {
        let response = await mainRepositories.listKonseling(data)
        console.log(response)
        if (response.data.is_correct == true) {
          this.data = response.data.laporan
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
