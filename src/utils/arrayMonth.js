class arrayMonth {
  static getListMonth() {
    return [
      { month: 'Januari', number: 7 },
      { month: 'Februari', number: 8 },
      { month: 'Maret', number: 9 },
      { month: 'April', number: 10 },
      { month: 'Mei', number: 11 },
      { month: 'Juni', number: 12 },
      { month: 'Juli', number: 1 },
      { month: 'Agustus', number: 2 },
      { month: 'September', number: 3 },
      { month: 'Oktober', number: 4 },
      { month: 'November', number: 5 },
      { month: 'Desember', number: 6 }
    ]
  }

  static getFirstMonth() {
    let arr = this.getListMonth()
    var currentDate = new Date()
    return arr.filter((item) => item.number == currentDate.getMonth() + 1 - 6)[0]
  }

  static getArrayMonth() {
    let arr = this.getListMonth()
    return arr.map((item) => item.number)
  }
}

export default arrayMonth
