<template>
<div id="login">
  <div class="login-header">
    <content-operation/>
  </div>
  <div class="view-content">
    <div class="login-illustration">
      <img src="src/assets/illustration/login.svg" alt="LOGIN">
    </div>
    <div class="login-content">
      <n-input v-model:value="username" placeholder="请输入用户名" clearable autofocus size="large"/>
      <n-input v-model:value="password" type="password" placeholder="请输入密码" clearable size="large"/>

      <n-button type="primary" @click="login" :loading="isLogging">{{ isLogging ? '登录中' : '登录' }}</n-button>
    </div>
  </div>
</div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import {useMessage} from 'naive-ui'
import router from "@/router";
import useService from "@/service/useService";
import ContentOperation from "../home/content-operation.vue";

const {loginService} = useService()

const username = ref(loginService.username)
const password = ref(loginService.password)

const isLogging = ref(false)

const message = useMessage()

async function login() {
  if (!username.value) return message.warning('请输入用户名')
  if (!password.value) return message.warning('请输入密码')

  isLogging.value = true

  await loginService
    .login(username.value, password.value)
    .then(() => {
      message.success('登录成功')

      return router.push('/home/welcome')
    })
    .catch((error) => {
      message.error(error.message)
    })

  isLogging.value = false
}

</script>

<style lang="less">
#login {
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: 100%;

  .login-header {
    display: flex;
    height: 44px;
    align-items: center;
    justify-content: flex-end;

    -webkit-app-region: drag;
  }

  .view-content {
    display: flex;
    flex-grow: 1;
    align-items: center;
    justify-content: space-between;


    > .login-illustration {
      width: 50%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      > img {
        width: 50%;
      }
    }

    > .login-content {
      width: 50%;
      display: flex;
      flex-direction: column;
      align-items: center;

      .n-input {
        width: 320px;
        margin: 8px 0;
      }
      .n-button {
        margin-top: 20px;
        width: 320px;
      }
    }
  }
}
</style>