import http from '@/services/httpCommon.js'
import Const from '@/services/const.js'
import axios from 'axios'
import { ApiUrl } from './const';

class mainRepositories {
  login(data) {

    const params = new URLSearchParams({
        kode_sekolah: data.kode_sekolah,
        nis: data.nis,
        password: data.password
      });

    return http.get(ApiUrl.LOGIN_STUDENT, {
      params
    });
  }

  profil(data) {
    return http.get(ApiUrl.PROFILE, {
      params: { kode_sekolah: data.kode_sekolah, nis: data.nis }
    })
  }

  /* tahun ajaran */
  period(data) {
    return http.get(ApiUrl.TAHUN_AJARAN, {
      params: { kode_sekolah: data.kode_sekolah, nis: data.nis }
    })
  }

  sendOtp(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.GET_OTP),
      data: data
    }
    return axios(config)
  }

  verifyOtp(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.VERIFY_OTP),
      data: data
    }
    return axios(config)
  }

  resetPassword(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.RESET_PASSWORD),
      data: data
    }
    return axios(config)
  }
  
  changePassword(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.CHANGE_PASSWORD),
      data: data
    }
    return axios(config)
  }

  informasi(data) {
    return http.get(ApiUrl.INFORMATION, {
      params: { kode_sekolah: data.kode_sekolah, nis: data.nis }
    })
  }

  historyTransaksi(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.LIST_TRANSAKSI),
      data: data
    }
    return axios(config)
  }

  updateProfil(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.EDIT_PROFILE),
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    }
    return axios(config)
  }

  editPassword(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.CHANGE_PASSWORD),
      data: data
    }
    return axios(config)
  }

  getListBulanan(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.PAYMENTS),
      data: data
    }
    return axios(config)
  }

  postBayarBulanan(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.BAYAR_BULANAN),
      data: data
    }
    return axios(config)
  }

  postBayarBebas(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.TAGIHAN_BAYAR_BEBAS),
      data: data
    }
    return axios(config)
  }

  getListBebas(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.PAYMENT_BEBAS),
      data: data
    }
    return axios(config)
  }

  getListBayarBebas(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.BAYAR_BEBAS),
      data: data
    }
    return axios(config)
  }

  getListRingkasan(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.RINGKASAN),
      data: data
    }
    return axios(config)
  }

  getListTabungan(data) {
    return http.get(ApiUrl.TABUNGAN, {
      params: { kode_sekolah: data.kode_sekolah, nis: data.nis }
    })
  }

  listMetodeBayarTabungan(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.TOPUP_TABUNGAN),
      data: data
    }
    return axios(config)
  }

  topUpTabungan(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.TOPUP_TABUNGAN),
      data: data
    }
    return axios(config)
  }

  insertIpaymu(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.FLIP),
      data: data
    }
    return axios(config)
  }

  insertIpaymuTabungan(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.IPAYMU_TABUNGAN),
      data: data
    }
    return axios(config)
  }

  caraPembayaran(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.CARA_BAYAR),
      data: data
    }
    return axios(config)
  }

  caraPembayaranTabungan(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.CARA_BAYAR_TABUNGAN),
      data: data
    }
    return axios(config)
  }

  listKonfirmasi(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.KONFIRMASI),
      data: data
    }
    return axios(config)
  }

  uploadBuktiKonfirmasi(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.UPLOAD_BUKTI),
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      data: data
    }
    return axios(config)
  }

  listTahfidz(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.TAHFIDZ),
      data: data
    }
    return axios(config)
  }

  listIzin(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.IZIN_KELUAR),
      data: data
    }
    return axios(config)
  }

  addIzin(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.ADD_IZIN),
      data: data
    }
    return axios(config)
  }

  listKonseling(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.KONSELING),
      data: data
    }
    return axios(config)
  }

  listPresensi(data) {
    var config = {
      method: 'post',
      url: Const.getUrl(ApiUrl.PRESENSI),
      data: data
    }
    return axios(config)
  }

  getPdf(data) {
    return http.get('kwitansi.php', {
      params: { kode_sekolah: data.kode_sekolah, nis: data.nis }
    })
  }

  getTagihanBulananPdf(data) {
    return http.get(ApiUrl.UNDUH_TAGIHAN, {
      params: { kode_sekolah: data.kode_sekolah, nis: data.nis }
    })
  }
}

export default new mainRepositories()
