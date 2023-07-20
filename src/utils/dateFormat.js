class dateFormat {
  static fullYearInd(stringdate) {
    const date = new Date(stringdate)
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
    return date.toLocaleDateString('id-ID', options)
  }
}

export default dateFormat
