class FilterArrayObject {
  filterArraysByProperty(array1, array2, property) {
    return array1.filter((obj1) => array2.some((obj2) => obj2[property] === obj1[property]))
  }
}

export default new FilterArrayObject()
