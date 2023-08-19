import { defineStore } from 'pinia'
import mainRepositories from '@/services/mainRepositories.js'
import mainLocalStorage from '@/services/mainLocalStorage.js'

const state = {
  data: [],
  success: false,
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
          this.success = true
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
          this.success = true
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
        console.log('insertIpaymu')
        console.log(response)
        if (response.data.is_correct) {
          this.data = response.data
          this.loading = false
          this.success = true
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
    async topUpTabungan(data) {
      try {
        const response = await mainRepositories.topUpTabungan(data)
        if (response.data.is_correct) {
          this.success = true
          this.loading = false
          this.data = response.data
          this.error = null
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
    async caraPembayaran(data) {
      try {
        let response = await mainRepositories.caraPembayaran(data)
        console.log(response)
        console.log(response.data.bank)
        if (response.data.is_correct && response.data.bank != null) {
          console.log('success')
          this.data = response.data
          this.loading = false
          this.success = true
        } else {
          console.log('error')
          this.success = false
          this.data = null
          this.loading = false
          this.error =
            response.data.bank == null || response.data.bank == ' '
              ? 'Bank Masih Perbaikan'
              : response.data.message

          console.log(this.error)
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
