import { defineStore } from 'pinia'
import MainRepositories from '../services/mainRepositories.js'
import mainLocalStorage from '../services/mainLocalStorage.js'

const state = {
  data: [],
  success: false,
  loading: true,
  error: null,
  formData: new FormData()
}

export const password = defineStore('password', {
  state: () => state,
  actions: {
    setFormData(data) {
      Object.entries(data).forEach(([key, value]) => {
        this.formData.append(key, value)
      })
    },
    async sendOtp(data) {
      try {
        this.setFormData(data)
        const response = await MainRepositories.sendOtp(this.formData)
        if (response.data.is_correct) {
          mainLocalStorage.setParamsChangePassword(response.data)
          this.data = response.data.message
          this.success = true
          this.loading = false
        } else {
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
    async verifyOtp(data) {
      const { kode_sekolah, nis } = mainLocalStorage.getParamsChangePassword()
      const sendData = {
        kode_sekolah: kode_sekolah,
        nis: nis,
        code: data
      }
      this.setFormData(sendData)
      try {
        const response = await MainRepositories.verifyOtp(this.formData)
        // console.log('verifyOtp')
        // console.log(response)
        if (response.data.is_correct) {
          mainLocalStorage.setParamsChangePassword(response.data)
          this.data = response.data.message
          this.success = true
          this.loading = false
        } else {
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
    async editPassword(data) {
      const { kode_sekolah, nis } = mainLocalStorage.getParamsChangePassword()
      const sendData = {
        kode_sekolah: kode_sekolah,
        nis: nis,
        reset: data
      }
      console.log('resetPassword')
      console.log(sendData)
      this.setFormData(sendData)
      try {
        const response = await MainRepositories.resetPassword(this.formData)
        console.log('changePassword')
        console.log(response)
        if (response.data.is_correct) {
          this.success = true
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
    }
  }
})
