import { defineStore } from 'pinia'
import mainRepositories from '@/services/mainRepositories.js'
import mainLocalStorage from '@/services/mainLocalStorage.js'

const state = {
  data: [],
  loading: true,
  error: null
}

export const transaksi = defineStore('transaksi', {
  state: () => state,
  actions: {
    async getHistoryTransaksi() {
      try {
        let data = mainLocalStorage.getAuth()

        let sendData = JSON.stringify({
          nis: data.nis,
          kode_sekolah: data.kode_sekolah,
          status: ['PENDING', 'LUNAS', 'EXPIRED']
        })

        let response = await mainRepositories.historyTransaksi(sendData)
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
