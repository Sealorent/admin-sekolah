import mainLocalStorage from '../services/mainLocalStorage.js'

class arrayPeriod {
  static getList() {
    return mainLocalStorage.getPeriod().map((item) => {
      return {
        id: item.id,
        label: item.period_start + '/' + item.period_end
      }
    })
  }
  static getArray() {
    return mainLocalStorage.getPeriod().map((item) => {
      return parseInt(item.id)
    })
  }
}

export default arrayPeriod
