export const generatePath = (url: string, data: any) => {
  const keys = Object.keys(data)

  keys.forEach((key: string) => {
    const paramName = `:${key}`
    if (url.indexOf(paramName) >= 0) {
      url = url.replace(paramName, data[key] ?? '')
    }
  })

  return url
}

export const formatErrorMessage = (msg?: string | string[]) =>
  Array.isArray(msg) ? msg.join(', ') : msg
