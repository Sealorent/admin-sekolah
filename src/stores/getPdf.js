import { defineStore } from 'pinia'
import mainRepositories from '@/services/mainRepositories.js'
import mainLocalStorage from '@/services/mainLocalStorage.js'

const state = {
  success: false,
  data: [],
  loading: true,
  error: null
}

export const pdf = defineStore('pdf', {
  state: () => state,
  actions: {
    async getPdf() {
      try {
        let response = await mainRepositories.getPdf(mainLocalStorage.getAuth())
        if (response.data.is_correct == true) {
          this.success = true
          this.data = response.data.laporan
          this.loading = false
          this.error = null
        } else {
          this.success = false
          this.data = null
          this.loading = false
          this.error = 'error'
        }
        return JSON.stringify(state)
      } catch (err) {
        this.loading = false
        this.error = err.message
        return JSON.stringify(state)
      }
    },
    async getTagihanBulanan() {
      try {
        let response = await mainRepositories.getTagihanBulananPdf(mainLocalStorage.getAuth())
        console.log('pdf')
        console.log(response)
        if (response.data.is_correct == true) {
          this.success = true
          this.data = response.data.link
          this.loading = false
          this.error = null
        } else {
          this.success = false
          this.data = null
          this.loading = false
          this.error = 'error'
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
