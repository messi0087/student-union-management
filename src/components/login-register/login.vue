<template>
  <div class="login">

    <!--        账号输入框-->
    <mu-text-field v-model="account"
                   class="account-input"
                   label="Email"
                   icon="email"
                   label-float
    />
    <!--        密码输入框-->
    <mu-text-field v-model="password"
                   max-length="16"
                   class="password-input"
                   label="Password"
                   icon="lock"
                   label-float
                   :action-icon="visibility ? 'visibility_off' : 'visibility'"
                   :action-click="() => (visibility = !visibility)"
                   :type="visibility ? 'text' : 'password'"
    />

    <mu-button round class="login-button" @click="loginClick()">登录</mu-button>

    <mu-dialog title="提示" width="400" :open.sync="showTipMessage" class="tip-message">
      <span class="tip-message-font">{{tipMessage}}</span>
      <mu-button slot="actions" flat color="primary" @click="closeTipMessage">关闭</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  import *as validate from '../../utils/validate'

  export default {
    name: "login",
    data() {
      return {
        visibility: false,
        account: '',
        password: '',
        isLogining: false,
        showTipMessage: false,
        tipMessage: ''
      }
    },
    methods: {
      loginClick() {
        let result = validate.validateLogin(this.account, this.password);
        this.isLogining = result.condition;
        if (this.isLogining) {
          this.$router.push('/mainPages/myNews')
        } else {
          this.tipMessage = result.errors.message
          this.showTipMessage = true
          // console.log(result.errors)
        }
      },
      closeTipMessage() {
        this.showTipMessage =false
      }
    }
  }
</script>

<style scoped>
  .login {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .account-input {
    width: 80vw;
    margin: 40px 0;
  }

  .password-input {
    width: 80vw;
    margin-bottom: 80px;
  }

  .login-button {
    background-image: linear-gradient(left, #29bdd9 0%, #276ace 100%);
    width: 70vw;
    height: 50px;
    font-size: 16px;
    color: white;
  }

  .tip-message-font {
    color: #f34336;
  }
</style>
