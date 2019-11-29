export default ({ store, route, redirect }) => {
  if (!store.state.auth.authenticated) {
    return redirect({ name: 'login' })
  }

  if (store.state.auth.authenticated && route.name === 'login') {
    return redirect({ name: 'index' })
  }
}
