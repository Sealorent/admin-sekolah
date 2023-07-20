import { defineStore } from 'pinia'
import mainRepositories from '@/services/mainRepositories.js'
// import mainLocalStorage from '@/services/mainLocalStorage.js'

const state = {
  data: [],
  success: false,
  loading: true,
  error: null,
  formData: new FormData()
}

export const profil = defineStore('profil', {
  state: () => state,
  actions: {
    setFormData(data) {
      Object.entries(data).forEach(([key, value]) => {
        this.formData.append(key, value)
      })
    },
    async updateProfil(data) {
      this.setFormData(data)
      console.log(this.formData.get('nama_santri'))
      try {
        let response = await mainRepositories.updateProfil(this.formData)
        console.log(response)
        if (response.data.is_correct) {
          this.data = response.data.informasi
          this.success = true
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
