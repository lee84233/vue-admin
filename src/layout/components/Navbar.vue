<template>
  <div class="navbar">
    <hamburger :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />

    <breadcrumb class="breadcrumb-container" />

    <div class="right-menu">
      <span class="name">{{ name || '用户' }}</span>
      <el-dropdown class="avatar-container" trigger="hover">
        <div class="avatar-wrapper">
          <img :src="avatar" class="user-avatar">
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item>消息中心</el-dropdown-item>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import avatar from '@/assets/images/avatar.jpeg'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  components: {
    Breadcrumb,
    Hamburger
  },
  data() {
    return {
      avatar,
      loading: null
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'name'
      // 'avatar'
    ])
  },
  destroyed() {
    this.loading && this.loading.close()
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      this.loading = this.$loading({
        lock: true,
        text: '正在退出...'
      })
      this.$store.dispatch('user/logout').then(res => {
        this.logoutAction()
      }).catch(e => {
        this.logoutAction()
      })
    },
    logoutAction() {
      this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      this.loading && this.loading.close()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow:0px 0px 10px 5px rgba(5, 3, 20, 0.04);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    float: right;
    height: 100%;
    padding: 5px 0;

    &:focus {
      outline: none;
    }

    .name {
      color: $gray;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-left: 10px;
      margin-right: 30px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          display: block;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          cursor: pointer;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 14px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
