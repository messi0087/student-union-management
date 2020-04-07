<template>
  <div class="index-information">
    <main>
      <mu-card class="information-card">
        <mu-card-header title="方志远" sub-title="体育部干事">
          <mu-avatar slot="avatar">
            <img src="../../assets/imgs/bg4.png">
          </mu-avatar>
        </mu-card-header>

        <mu-card-title sub-title="身份信息"></mu-card-title>
        <mu-card-text>
          部门：xxx
          <br>
          职位: xxx
          <br>
          电话号码:xxx
        </mu-card-text>
      </mu-card>

      <mu-divider class="divide-line"/>

      <mu-list>
        <mu-list-item class="list-button" button :ripple="true" @click="changeInformation()">
          <mu-list-item-action>
            <mu-icon value="inbox"/>
          </mu-list-item-action>
          <mu-list-item-title>修改信息</mu-list-item-title>
        </mu-list-item>
        <mu-list-item class="list-button" button :ripple="true" @click="changePassword()">
          <mu-list-item-action>
            <mu-icon value="grade"/>
          </mu-list-item-action>
          <mu-list-item-title>修改密码</mu-list-item-title>
        </mu-list-item>
        <mu-list-item class="list-button" button :ripple="true" @click="logOut()">
          <mu-list-item-action>
            <mu-icon value="send"/>
          </mu-list-item-action>
          <mu-list-item-title>退出登录</mu-list-item-title>
        </mu-list-item>
      </mu-list>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'my-news',
    data() {
      return {
      }
    },
    methods: {
      changeInformation(){
      },
      changePassword(){
      },
      logOut(){
        this.$router.replace('/')
      }
    }
  }
</script>

<style scoped>
  .information-card{
    width: 100%; max-width: 375px; margin: 40px auto;
  }

  .divide-line{
    margin: 20px 0;
  }

  .list-button{
    margin: 25px 0 25px 10vw;
  }
</style>
