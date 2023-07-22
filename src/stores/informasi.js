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
    },
    setInformation(data) {
      if (data != null) {
        mainLocalStorage.setInformation(data)
        this.data = mainLocalStorage.getInformation()
        this.loading = false
        this.error = null
      } else {
        this.loading = false
        this.error = 'Data tidak ditemukan'
      }
      return JSON.stringify(state)
    },
    detailInformation() {
      let data = mainLocalStorage.getInformation()
      if (data != null) {
        this.loading = false
        this.data = data
        this.error = null
        return JSON.stringify(state)
      } else {
        this.data = null
        this.loading = false
        this.error = null
        return JSON.stringify(state)
      }
    }
  }
})
