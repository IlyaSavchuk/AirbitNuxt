export const email = (rule, value, callback) => {
  const re = /^[a-zA-Z0-9-.()]+@[a-zA-Z0-9.]+\.[a-z]{1,3}$/

  if (!re.test(value)) {
    return callback(new Error('Email is not valid!'))
  } else {
    return callback()
  }
}

export const name = (rule, value, callback) => {
  const re = /^[a-zA-Z ]+$/

  if (!re.test(value)) {
    return callback(new Error('Name is not valid!'))
  } else {
    return callback()
  }
}
