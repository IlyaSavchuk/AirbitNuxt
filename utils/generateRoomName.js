export default (initiator, receiver) => {
  const names = [initiator, receiver]

  names.sort()

  return `${names[0]}-${names[1]}`
}
