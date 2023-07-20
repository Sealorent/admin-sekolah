import http from '@/services/httpCommon.js'
import Const from '@/services/const.js'
import axios from 'axios'

class mainRepositories {
  login(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('get_student_2.php'),
      data: data
    }
    return axios(config)
  }

  profil(data) {
    return http.get('profil.php', {
      params: { kode_sekolah: data.kode_sekolah, nis: data.nis }
    })
  }

  /* tahun ajaran */
  period(data) {
    return http.get('tahun_ajaran.php', {
      params: { kode_sekolah: data.kode_sekolah, nis: data.nis }
    })
  }

  sendOtp(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('get_otp.php'),
      data: data
    }
    return axios(config)
  }

  verifyOtp(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('verify_otp.php'),
      data: data
    }
    return axios(config)
  }

  resetPassword(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('reset_password.php'),
      data: data
    }

    return axios(config)
  }

  informasi(data) {
    return http.get('informasi.php', {
      params: { kode_sekolah: data.kode_sekolah, nis: data.nis }
    })
  }

  historyTransaksi(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('list_transaksi.php'),
      data: data
    }
    return axios(config)
  }

  updateProfil(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('edit_profil1.php'),
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
      url: Const.getUrl('edit_password.php'),
      data: data
    }
    return axios(config)
  }

  getListBulanan(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('pembayaran_2.php'),
      data: data
    }
    return axios(config)
  }

  getListBebas(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('pembayaran_bebas2.php'),
      data: data
    }
    return axios(config)
  }

  getListRingkasan(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('ringkasan_pembayaran.php'),
      data: data
    }
    return axios(config)
  }

  getListTabungan(data) {
    return http.get('tabungan.php', {
      params: { kode_sekolah: data.kode_sekolah, nis: data.nis }
    })
  }

  listMetodeBayarTabungan(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('top_up_tabungan.php'),
      data: data
    }
    return axios(config)
  }

  insertIpaymuTabungan(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('insert_ipaymu_tabungan.php'),
      data: data
    }
    return axios(config)
  }

  caraPembayaranTabungan(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('cara_pembayaran_tabungan.php'),
      data: data
    }
    return axios(config)
  }

  listKonfirmasi(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('info_upload_pembayaran.php'),
      data: data
    }
    return axios(config)
  }

  uploadBuktiKonfirmasi(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('upload_bukti_bayar.php'),
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
      url: Const.getUrl('tahfidz2.php'),
      data: data
    }
    return axios(config)
  }

  listIzin(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('izin2.php'),
      data: data
    }
    return axios(config)
  }

  addIzin(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('add_izin.php'),
      data: data
    }
    return axios(config)
  }

  listKonseling(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('konseling2.php'),
      data: data
    }
    return axios(config)
  }

  listPresensi(data) {
    var config = {
      method: 'post',
      url: Const.getUrl('presensi2.php'),
      data: data
    }
    return axios(config)
  }
}

export default new mainRepositories()
