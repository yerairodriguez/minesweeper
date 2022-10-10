export const parseMockDataToString = (data) => {
    let strData = data.split(/\r?\n/).join('-')
    strData = strData.replaceAll(' ', '')
    strData = strData.replaceAll('|', '')
    while (strData[strData.length - 1] === '-') {
      strData = strData.slice(0, -1)
    }
    return strData
  }
  
  export const validateMockData = (data) => {
    let isValidData
    if (data === undefined) {
      isValidData = false
    } else if (data.includes('-')) {
      isValidData = validateMockDataRows(data.split('-'))
    } else {
      isValidData = validateMockDataRow(data)
    }
    return isValidData
  }
  
  const validateMockDataRow = (data) => {
    const newLocal = '^[*o]*$'
    const regex = new RegExp(newLocal)
    return regex.test(data)
  }
  
  const validateMockDataRows = (dataRows) => {
    const currentLenght = dataRows[0].length
    let isValidData
    for (let i = 0; i < dataRows.length; i += 1) {
      if (dataRows[i].length !== currentLenght) {
        isValidData = false
        break
      }
      isValidData = validateMockDataRow(dataRows[i])
    }
    return isValidData
  }
