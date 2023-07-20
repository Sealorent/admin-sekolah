import { defineStore } from 'pinia'
import MainRepositories from '../services/mainRepositories.js'
// import MainLocalStorage from '../services/mainLocalStorage.js'

const state = {
  data: [],
  success: false,
  loading: true,
  error: null,
  formData: new FormData()
}

export const bayar = defineStore('bayar', {
  state: () => state,
  actions: {
    setFormData(data) {
      Object.entries(data).forEach(([key, value]) => {
        this.formData.append(key, value)
      })
    },
    async listBulanan(data) {
      try {
        const response = await MainRepositories.getListBulanan(data)
        if (response.data.is_correct) {
          this.data = response.data
          this.success = true
          this.loading = false
        } else {
          this.data = response.data
          this.success = false
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
    async listBebas(data) {
      try {
        const response = await MainRepositories.getListBebas(data)
        if (response.data.is_correct) {
          this.data = response.data
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
    async listRingkasan(data) {
      try {
        const response = await MainRepositories.getListRingkasan(data)
        if (response.data.is_correct) {
          this.data = response.data
          this.success = true
          this.loading = false
        } else {
          this.data = response.data
          this.success = false
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
