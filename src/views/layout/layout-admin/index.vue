<template>
  <div class="h-layout-admin">
    <!-- 页头 -->
    <!-- <headers></headers> -->
    <!-- 左菜单 -->
    <sidebar></sidebar>
    <!-- 主体栏 -->
    <section class="h-layout-body">
      <transition name="page-fade">
        <router-view/>
      </transition>
    </section>
  </div>
</template>

<script>
// import Headers from './components/Headers';
import Sidebar from './components/Sidebar';
export default {
  name: 'layout-base',
  components: {
    // Headers
    Sidebar
  },
  mounted() {
  }
};
</script>

<style lang="sass" scoped>
@import "~@/assets/css/admin.scss"
</style>
