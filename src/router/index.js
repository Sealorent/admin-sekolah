import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/login/LoginView.vue')
    },
    {
      path: '/resetPassword',
      name: 'resetPassword',
      component: () => import('../views/reset-password/ResetPasswordView.vue')
    },
    {
      path: '/verifyOtp',
      name: 'verifyOtp',
      component: () => import('../views/reset-password/VerifyOtpView.vue')
    },
    {
      path: '/changePassword',
      name: 'changePassword',
      component: () => import('../views/reset-password/ChangePasswordView.vue')
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/menu/HomeView.vue')
    },
    {
      path: '/transaksi',
      name: 'transaksi',
      component: () => import('../views/menu/TransaksiView.vue')
    },
    {
      path: '/akun',
      name: 'akun',
      component: () => import('../views/menu/AkunView.vue')
    },
    {
      path: '/bantuan',
      name: 'bantuan',
      component: () => import('../views/menu/BantuanView.vue')
    },
    {
      path: '/profil',
      name: 'profil',
      component: () => import('../views/menus/akun/profil/ProfilView.vue')
    },
    {
      path: '/editProfil',
      name: 'editProfil',
      component: () => import('../views/menus/akun/profil/EditProfilView.vue')
    },
    {
      path: '/editPassword',
      name: 'editPassword',
      component: () => import('../views/menus/akun/password/EditPasswordView.vue')
    },
    {
      path: '/kebijakanPrivasi',
      name: 'kebijakanPrivasi',
      component: () => import('../views/menus/akun/kebijakanPrivasi/KebijakanPrivasiView.vue')
    },
    {
      path: '/syaratKetentuan',
      name: 'syaratKetentuan',
      component: () => import('../views/menus/akun/syaratKetentuan/SyaratKetentuanView.vue')
    },
    {
      path: '/bayar',
      name: 'bayar',
      component: () => import('../views/menus/bayar/BayarView.vue')
    },
    {
      path: '/bayarBulanan',
      name: 'bayarBulanan',
      component: () => import('../views/menus/bayar/bulanan/BayarBulananView.vue')
    },
    {
      path: '/bayarBebas',
      name: 'bayarBebas',
      component: () => import('../views/menus/bayar/bebas/BayarBebasView.vue')
    },
    {
      path: '/tabungan',
      name: 'tabungan',
      component: () => import('../views/menus/tabungan/TabunganView.vue')
    },
    {
      path: '/setorTabungan',
      name: 'setorTabungan',
      component: () => import('../views/menus/tabungan/SetorTabunganView.vue')
    },
    {
      path: '/konfirmasi',
      name: 'konfirmasi',
      component: () => import('../views/menus/konfirmasi/KonfirmasiView.vue')
    },
    {
      path: '/uploadBuktiPembayaran',
      name: 'uploadBuktiPembayaran',
      component: () => import('../views/menus/konfirmasi/UploadKonfirmasiView.vue')
    },
    {
      path: '/detailKonfirmasi',
      name: 'detailKonfirmasi',
      component: () => import('../views/menus/konfirmasi/DetailKonfirmasiView.vue')
    },
    {
      path: '/tahfidz',
      name: 'tahfidz',
      component: () => import('../views/menus/tahfidz/TahfidzView.vue')
    },
    {
      path: '/izin',
      name: 'izin',
      component: () => import('../views/menus/izin/IzinView.vue')
    },
    {
      path: '/addIzin',
      name: 'addIzin',
      component: () => import('../views/menus/izin/AddIzinView.vue')
    },
    {
      path: '/konseling',
      name: 'konseling',
      component: () => import('../views/menus/konseling/KonselingView.vue')
    },
    {
      path: '/presensi',
      name: 'presensi',
      component: () => import('../views/menus/presensi/PresensiView.vue')
    },
    {
      path: '/ringkasanPembayaran',
      name: 'ringkasanPembayaran',
      component: () => import('../views/menus/bayar/RingkasanView.vue')
    },
    {
      path: '/informasi',
      name: 'informasi',
      component: () => import('../views/menus/informasi/InformasiView.vue')
    },
    {
      path: '/detailInformasi',
      name: 'detailInformasi',
      component: () => import('../views/menus/informasi/DetailInformasiView.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  let login = JSON.parse(localStorage.getItem('login'))

  if (
    to.name !== 'login' &&
    to.name !== 'verifyOtp' &&
    to.name !== 'changePassword' &&
    to.name !== 'resetPassword' &&
    !login
  ) {
    next({ name: 'login' })
  } else {
    // app.config.globalProperties.$user = login
    next()
  }
})

export default router
