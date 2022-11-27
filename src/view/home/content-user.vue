<template>
<div id="user-content">
  <div class="avatar">Hi</div>

  <div class="user-details">
    <div class="user-name">B站 我在临安修代码</div>
    <div class="user-address">中国 杭州</div>
  </div>
</div>
</template>

<script setup lang="ts">
const options = [
  { label: '个人中心', key: 'user-center' },
  { label: '退出登录', key: 'logout' },
]

</script>

<style lang="less">
#user-content {
  display: flex;
  align-items: center;

  padding-left: 12px;

  .avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    cursor: pointer;
    background-color: #d53939;

    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 14px;

    color: #FFFFFF;
  }

  .user-details {
    display: flex;
    flex-direction: column;
    margin-left: 8px;
    justify-content: center;
    user-select: none;

    .user-name {
      font-size: 14px;
      line-height: 20px;
    }
    .user-address {
      font-size: 12px;
      color: #999999;
      line-height: 16px;
    }
  }
}
</style>