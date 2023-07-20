import { defineStore } from 'pinia'
import mainRepositories from '@/services/mainRepositories.js'
import mainLocalStorage from '@/services/mainLocalStorage.js'
// import { showAlert } from '../utils/alert.js'

const state = {
  data: [],
  loading: true,
  error: null
}

export const information = defineStore('information', {
  state: () => state,
  actions: {
    async getInformation() {
      try {
        let data = mainLocalStorage.getAuth()
        let response = await mainRepositories.informasi(data)
        if (response.data.is_correct) {
          this.data = response.data.informasi
          this.loading = false
        } else {
          this.loading = false
          this.error = response.data.message
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
