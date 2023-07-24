import { defineStore } from 'pinia'
import MainRepositories from '../services/mainRepositories.js'
import MainLocalStorage from '../services/mainLocalStorage.js'
import mainLocalStorage from '../services/mainLocalStorage.js'

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
          this.error = null
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
          this.success = true
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
    async listBayarBebas(data) {
      try {
        const response = await MainRepositories.getListBayarBebas(data)

        if (response.data.is_correct) {
          this.data = response.data
          this.loading = false
          this.success = true
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
    },
    async bayarBulanan(data) {
      var sendData = JSON.stringify({
        student_nis: MainLocalStorage.getAuth().nis,
        kode_sekolah: MainLocalStorage.getAuth().kode_sekolah,
        bayar: 'Bayar',
        bulan_id: data
      })
      try {
        const response = await MainRepositories.postBayarBulanan(sendData)
        if (response.data.no_ipaymu !== '') {
          mainLocalStorage.setNoIpaymu(response.data.no_ipaymu)
          this.success = true
          this.loading = false
          this.data = response.data.message
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
    async removeBulanan(data) {
      var sendData = JSON.stringify({
        student_nis: MainLocalStorage.getAuth().nis,
        kode_sekolah: MainLocalStorage.getAuth().kode_sekolah,
        bayar: 'Batal',
        bulan_id: [parseInt(data)],
        bebas_id: []
      })
      console.log('remove bulanan')
      console.log(sendData)
      try {
        const response = await MainRepositories.getListRingkasan(sendData)
        console.log('remove bulanan')
        console.log(response)
        if (response.data.no_ipaymu !== '') {
          this.success = true
          this.loading = false
          this.data = response.data.message
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
    async bayarBebas(data) {
      var sendData = JSON.stringify({
        student_nis: MainLocalStorage.getAuth().nis,
        kode_sekolah: MainLocalStorage.getAuth().kode_sekolah,
        bayar: 'Bayar',
        bebas_id: data.bebas_id,
        bebas_nominal: data.nominal_pay
      })
      try {
        const response = await MainRepositories.postBayarBebas(sendData)
        console.log('bayar bebas')
        console.log(response)
        if (response.data.no_ipaymu !== '') {
          mainLocalStorage.setNoIpaymu(response.data.no_ipaymu)
          this.success = true
          this.loading = false
          this.data = response.data.message
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
    async removeBebas(data) {
      var sendData = JSON.stringify({
        student_nis: MainLocalStorage.getAuth().nis,
        kode_sekolah: MainLocalStorage.getAuth().kode_sekolah,
        bayar: 'Batal',
        bulan_id: [],
        bebas_id: [parseInt(data)]
      })
      console.log('remove bebas')
      console.log(sendData)
      try {
        const response = await MainRepositories.getListRingkasan(sendData)
        console.log('remove bebas')
        console.log(response)
        if (response.data.no_ipaymu !== '') {
          this.success = true
          this.loading = false
          this.data = response.data.message
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
    async insertIpaymuBayar(data) {
      try {
        const response = await MainRepositories.getListRingkasan(data)
        console.log('insertIpaymu')
        console.log(response)
        if (response.data.is_correct) {
          this.success = true
          this.loading = false
          this.data = response.data.message
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
        let response = await MainRepositories.caraPembayaran(data)
        console.log(response)
        console.log(response.data.bank)
        if (
          response.data.is_correct &&
          response.data != ' ' &&
          response.data != null &&
          response.data.bank != null
        ) {
          this.data = response.data
          this.loading = false
          this.success = true
        } else {
          this.success = false
          this.data = null
          this.loading = false
          this.error =
            response.data.bank == null || response.data.bank == ' '
              ? 'Bank Masih Perbaikan'
              : response.data.message
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
