import { defineStore } from 'pinia'
import mainRepositories from '@/services/mainRepositories.js'
import mainLocalStorage from '@/services/mainLocalStorage.js'

const state = {
  data: [],
  loading: true,
  error: null
}

export const tabungan = defineStore('tabungan', {
  state: () => state,
  actions: {
    async listTabungan() {
      try {
        let sendData = mainLocalStorage.getAuth()
        let response = await mainRepositories.getListTabungan(sendData)
        if (response.data.is_correct) {
          this.data = response.data.laporan
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
    async listMetodeBayar() {
      let sendData = JSON.stringify({
        kode_sekolah: mainLocalStorage.getAuth().kode_sekolah,
        nis: mainLocalStorage.getAuth().nis,
        nominal: '',
        bayar: '',
        catatan: ''
      })
      console.log(sendData)
      try {
        let response = await mainRepositories.listMetodeBayarTabungan(sendData)
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
    async insertIpaymu(data) {
      try {
        let response = await mainRepositories.insertIpaymuTabungan(data)
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
    async caraPembayaran(data) {
      try {
        let response = await mainRepositories.caraPembayaranTabungan(data)
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
    }
  }
})
