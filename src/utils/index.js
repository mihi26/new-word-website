export const convertQueryString = (payload) => {
  const queryString = Object.entries(payload)
    .filter(([, val]) => {
      if (Array.isArray(val)) return val.length
      return val
    })
    .map(([key, val]) => {
      if (Array.isArray(val)) {
        let convertString = ""
        val.forEach((item) => (convertString += `${key}=${item}&`))
        return convertString.slice(0, -1)
      }
      return `${key}=${val}`
    })
    .join("&")
  return `?${queryString}`
}

