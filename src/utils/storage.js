// 本地存储

export const getItem = name => {
  const data = window.sessionStorage.getItem(name)

  try {
    // data 为 JSON格式字符串时
    return JSON.parse(data)
  } catch(err) {
    // data 不是 JSON格式字符串时
    return data
  }
}

export const setItem = (name, value) => {
  // 如果data 是对象，先把它转为 JSON格式字符串在进行存储
  if(typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(name, value)
}

export const removeItem = name => {
  window.sessionStorage.removeItem(name)
}

