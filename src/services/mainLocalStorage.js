class MainLocalStorage {
  setSessionLogin(auth, user) {
    localStorage.setItem('login', true)
    localStorage.setItem('auth', JSON.stringify(auth))
    localStorage.setItem('user', JSON.stringify(user))
  }

  setProfil(data) {
    localStorage.setItem('profil', JSON.stringify(data))
  }

  /* tahun ajaran */
  setPeriod(data) {
    localStorage.setItem('period', JSON.stringify(data))
  }

  getProfil() {
    return JSON.parse(localStorage.getItem('profil'))
  }

  getPeriod() {
    return JSON.parse(localStorage.getItem('period'))
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'))
  }

  getAuth() {
    return JSON.parse(localStorage.getItem('auth'))
  }

  logOut() {
    localStorage.clear()
  }

  setDetailKonfirmasi(data) {
    localStorage.setItem('konfirmasi', JSON.stringify(data))
  }

  getDetailKonfirmasi() {
    return JSON.parse(localStorage.getItem('konfirmasi'))
  }

  setParamsChangePassword(data) {
    localStorage.setItem('params', JSON.stringify(data))
  }

  getParamsChangePassword() {
    return JSON.parse(localStorage.getItem('params'))
  }
}

export default new MainLocalStorage()
