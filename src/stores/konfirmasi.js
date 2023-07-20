import { defineStore } from 'pinia'
import MainRepositories from '../services/mainRepositories.js'
import mainLocalStorage from '@/services/mainLocalStorage.js'

const state = {
  data: [],
  success: false,
  loading: true,
  error: null,
  formData: new FormData()
}

export const konfirmasi = defineStore('konfirmasi', {
  state: () => state,
  actions: {
    setFormData(data) {
      Object.entries(data).forEach(([key, value]) => {
        this.formData.append(key, value)
      })
    },
    async getListKonfirmasi() {
      var data = {
        nis: mainLocalStorage.getAuth().nis,
        kode_sekolah: mainLocalStorage.getAuth().kode_sekolah
      }
      this.setFormData(data)
      try {
        const response = await MainRepositories.listKonfirmasi(this.formData)
        if (response.data.is_correct) {
          this.data = response.data.upload
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
    async uploadBukti(data) {
      this.setFormData(data)
      try {
        const response = await MainRepositories.uploadBuktiKonfirmasi(this.formData)
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
    async detailKonfirmasi(data) {
      mainLocalStorage.setDetailKonfirmasi(data)
      this.loading = false
      this.data = null
      this.error = null
      return JSON.stringify(state)
    }
  }
})
