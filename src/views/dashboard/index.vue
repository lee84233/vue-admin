<template>
  <div class="app-container">
    <h1>登录人: {{ name }}</h1>
    <h1>登录Token: {{ token }}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'token',
      'name'
    ])
  }
}
</script>
