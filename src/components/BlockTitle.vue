<template>
  <div class="container">
    <span class="title">{{ name }}</span>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BlockTitle',
  props: {
    name: {
      type: String,
      default: '标题'
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  // margin-top: 10px;
  margin-bottom: 10px;
}
.title {
  padding-left: 10px;
  color: #303030;
  font-size: 16px;
  line-height: 1.5;
  border-left: 5px solid $primary;
}
</style>
