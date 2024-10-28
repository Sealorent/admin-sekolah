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
    const period = localStorage.getItem('period');
    return period ? JSON.parse(period) : {};
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

  setNoIpaymu(data) {
    localStorage.setItem('noIpaymu', JSON.stringify(data))
  }

  getNoIpaymu() {
    return JSON.parse(localStorage.getItem('noIpaymu'))
  }

  setInformation(data) {
    localStorage.setItem('information', JSON.stringify(data))
  }

  getInformation() {
    return JSON.parse(localStorage.getItem('information'))
  }
}

export default new MainLocalStorage()
