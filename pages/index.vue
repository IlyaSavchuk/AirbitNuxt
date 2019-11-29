<template>
  <nuxt-child />
</template>

<script>
export default {
  name: 'Index',
  middleware({ route, redirect }) {
    if (route.name === 'index') return redirect({ name: 'messages' })
  }
}
</script>
