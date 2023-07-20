import { defineStore } from 'pinia'
import mainRepositories from '@/services/mainRepositories.js'
import mainLocalStorage from '@/services/mainLocalStorage.js'

const state = {
  user: [],
  loading: true,
  error: null,
  formData: new FormData()
}

export const auth = defineStore('auth', {
  state: () => state,
  actions: {
    setFormData(data) {
      Object.entries(data).forEach(([key, value]) => {
        this.formData.append(key, value)
      })
    },
    async login(data) {
      this.setFormData(data)
      try {
        this.profil(data)
        this.period(data)
        let response = await mainRepositories.login(this.formData)
        if (response.data.is_correct) {
          this.user = response.data
          this.loading = false

          /* set auth and user to local storage */
          mainLocalStorage.setSessionLogin(data, response.data)
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
    /* get profil */
    async profil(data) {
      try {
        let response = await mainRepositories.profil(data)
        if (response.data.is_correct) {
          this.loading = false
          console.log(response.data)
          this.user = response.data
          mainLocalStorage.setProfil(response.data)
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
    /* tahun ajaran */
    async period(data) {
      try {
        let response = await mainRepositories.period(data)
        if (response.data.is_correct) {
          this.loading = false
          mainLocalStorage.setPeriod(response.data.Tahunajaran)
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
    logout() {
      mainLocalStorage.logOut()
    }
  }
})
