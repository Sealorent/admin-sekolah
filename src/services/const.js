class Const {
  getUrl(url) {
    // return 'https://mobile.adminsekolah.net/walsan/' + url
    return 'https://mobile.adminsekolah.net/rest-api-dev/' + url
  }
}
export default new Const()

export const ApiUrl = {
  LOGIN_PESANTREN: "get_ponpes.php",
  LOGIN_STUDENT: "get_student.php",
  INFORMATION: "informasi.php",
  SAVING: "tabungan.php",
  TAHFIDZ: "tahfidz.php",
  REKAM_MEDIS: "kesehatan.php",
  KONSELING: "konseling.php",
  IZIN_KELUAR: "izin.php",
  IZIN_PULANG: "pulang.php",
  MUDIF: "mudif.php",
  ADD_IZIN: "add_izin.php",
  ADD_PULANG: "add_pulang.php",
  PAYMENTS: "pembayaran.php",
  LIST_PAYMENT_MONTHLY: "pembayaran_ringkasan.php",
  LIST_PAYMENT_DETAIL_MONTHLY: "pembayaran_detail.php",
  PRESENSI: "presensi.php",
  PRESENSI_PELAJARAN: "presensi_pelajaran.php",
  PROFILE: "profil.php",
  PAYMENT_BEBAS: "pembayaran_bebas.php",
  EDIT_PROFILE: "edit_profil.php",
  CHANGE_PASSWORD: "edit_password.php",
  BAYAR_BEBAS: "bayar_tagihan_bebas.php",
  BAYAR_BULANAN: "bayar_tagihan_bulan.php",
  LIST_TRANSAKSI: "list_transaksi.php",
  BAYAR: "bayar.php",
  TAGIHAN_BAYAR_BULANAN: "tagihan_bulan_bayar.php",
  TAGIHAN_BAYAR_BEBAS: "tagihan_bebas_bayar.php",
  SETTING: "setting.php",
  RINGKASAN: "ringkasan_pembayaran.php",
  FLIP: "insert_flip_ipaymu.php",
  CARA_BAYAR: "cara_pembayaran_flip_ipaymu.php",
  CARA_BAYAR_TABUNGAN: "cara_pembayaran_flip_ipaymu_tabungan.php",
  TOPUP_TABUNGAN: "top_up_tabungan.php",
  UNDUH_TAGIHAN: "unduh_tagihan.php",
  GET_OTP: "get_otp.php",
  VERIFY_OTP: "verify_otp.php",
  RESET_PASSWORD: "reset_password.php",
  KONFIRMASI: "info_upload_pembayaran.php",
  TAHUN_AJARAN: "tahun_ajaran.php",
  PELAJARAN: "lesson.php",
  UPLOAD_BUKTI: "upload_bukti_bayar.php",
  DETAIL_TRANSAKSI: "detail_transaksi.php",
  IPAYMU_TABUNGAN: "insert_flip_ipaymu_tabungan.php",
  TRANSAKSI_TABUNGAN: "list_transaksi_tabungan.php",
  DETAIL_TRANSAKSI_TABUNGAN: "detail_transaksi_tabungan.php",
  LESSON: "lesson.php",
  SEMESTER: "semester.php",
  PRESENSI_NEW: "presensi_pelajaran.php",

  //  PENGINAPAN
  PAYMENT_METHOD_PENGINAPAN: "cara_pembayaran_flip_ipaymu_penginapan.php",
  PENGINAPAN: "list_homestay.php",
  DETAIL_PENGINAPAN: "detail_homestay.php",
  BOOKING_PENGINAPAN: "insert_flip_ipaymu_penginapan.php",

  //  DONASI
  LIST_DONASI: "program_donasi.php",
  SEND_DONASI: "insert_flip_ipaymu_donasi.php",
  PAYMENT_METHOD_DONASI: "cara_pembayaran_flip_ipaymu_donasi.php",

  //  PEMBAYARAN PAKET
  LIST_PAKET: "pembayaran_bulan_paket.php",
  SELECT_PAKET: "tagihan_paket_bayar.php",
  RINGKASAN_PAKET: "ringkasan_pembayaran_paket.php",
};