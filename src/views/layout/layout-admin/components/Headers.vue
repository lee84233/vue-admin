<template>
  <header class="h-layout-header">
    <ul class="header-nav header-nav_right">
      <li class="header-nav-item">
        <a href="javascript:;" title="消息">
          <i class="iconfont icon-notice"></i>
          <span class="badge badge-pill badge-danger">3</span>
        </a>
      </li>
      <li class="header-nav-item">
        <a href="javascript:;" :title="screen.title" @click="fullScreen">
          <i :class="['iconfont', screen.icon]"></i>
        </a>
      </li>
      <li class="header-nav-item" @mouseenter="personMore=true" @mouseleave="personMore=false">
        <a href="javascript:;" title="个人中心">
          <span>李成</span>
          <i class="nav-more"></i>
        </a>
        <dl class="header-children" v-show="personMore">
          <dd>
            <a href="javascript:;">基本信息</a>
          </dd>
          <dd>
            <a href="javascript:;">修改密码</a>
          </dd>
          <hr>
          <dd>
            <a href="javascript:;">退出</a>
          </dd>
        </dl>
      </li>
      <li class="header-nav-item">
        <a href="javascript:;" title="设置">
          <i class="iconfont icon-setting"></i>
        </a>
      </li>
    </ul>
  </header>
</template>

<script>
// import fullsceen from '@/assets/utils/full-screen';
export default {
  name: 'headers',
  data() {
    return {
      screen: {
        icon: 'icon-full-screen',
        title: '全屏'
      },
      personMore: false
    };
  },
  methods: {
    fullScreen() {
      // if (fullsceen.isFullscreen) {
      //   fullsceen.exit();
      //   this.screen = {
      //     icon: 'icon-full-screen',
      //     title: '全屏'
      //   };
      // } else {
      //   fullsceen.request();
      //   this.screen = {
      //     icon: 'icon-minimize',
      //     title: '退出全屏'
      //   };
      // }
    }
  }
};
</script>
