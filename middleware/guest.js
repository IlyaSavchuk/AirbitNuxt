export default ({ store, redirect }) => {
  if (store.getters['auth/authenticated']) {
    redirect({ name: 'messages' })
  }
}
