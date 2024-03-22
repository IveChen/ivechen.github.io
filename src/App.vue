<template>
  <el-config-provider :locale="zhCn">
    <el-container class="container layout-full layout-v">
      <el-header>
        <div class="layout-h layout-align-center">
          <div class="title layout-h gutter-h">TICU-数据库</div>
          <div class="layout-fill">
            <el-menu mode="horizontal" :ellipsis="false">
              <el-menu-item>
                <router-link to="/" active-class="active">首页</router-link>
              </el-menu-item>
              <!-- <el-menu-item>
                <router-link to="/player" active-class="active">个人维度</router-link>
              </el-menu-item>
              <el-menu-item >
                <router-link to="/hero" active-class="active">英雄维度</router-link></el-menu-item> -->
              <el-menu-item>
                <router-link to="/matchList" active-class="active"
                  >比赛数据</router-link
                >
              </el-menu-item>
              <el-menu-item>
                <router-link to="/matchCompare" active-class="active"
                  >年度数据</router-link
                >
              </el-menu-item>
              <!-- <el-menu-item>
                <router-link to="/matchVersus" active-class="active"
                  >对抗数据</router-link
                >
              </el-menu-item> -->
            </el-menu>
          </div>
        </div>
      </el-header>
      <el-main class="layout-padding layout-fill">
        <router-view />
      </el-main>
    </el-container>
  </el-config-provider>
</template>
<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
</script>

<style lang="less">
#app {
  height: 100%;
  color: #2c3e50;
  font-family: Avenir, Helvetica, Arial, sans-serif;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

nav {
  padding: 30px;

  a {
    color: #2c3e50;
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
<style lang="less" scoped>
.container {
  .el-header {
    border-bottom: 1px solid #e1e1e1;
  }
  :deep {
    .el-menu--horizontal {
      border-bottom: 0 none;
    }
    .router-link-exact-active {
      color: blue;
    }
  }
}
.title {
  font-weight: bold;
}
</style>
