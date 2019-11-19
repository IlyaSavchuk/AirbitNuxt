export default ({ store, redirect }) => {
  if (store.getters['chat/authenticated']) {
    redirect('/messages')
  }
}
