<template>
  <div class="login">

    <!--        账号输入框-->
    <mu-text-field v-model="account"
                   class="account-input"
                   label="邮箱"
                   icon="email"
                   label-float
    />
    <!--        密码输入框-->
    <mu-text-field v-model="password"
                   max-length="16"
                   class="password-input"
                   label="密码"
                   icon="lock"
                   label-float
                   :action-icon="visibility ? 'visibility_off' : 'visibility'"
                   :action-click="() => (visibility = !visibility)"
                   :type="visibility ? 'text' : 'password'"
    />

    <mu-button round class="login-button" @click="loginClick()">登录</mu-button>

    <mu-dialog title="提示" width="400" :open.sync="showTipMessage" class="tip-message">
      <span :class="this.loginSuccess ? 'tip-message-font-success' : 'tip-message-font'">{{tipMessage}}</span>
      <mu-button slot="actions" flat color="primary" @click="closeTipMessage">关闭</mu-button>
    </mu-dialog>
  </div>
</template>

<script>
  import * as validate from '../../utils/validate'
  import * as userAPI from '../../api/user'
  import Cookies from 'js-cookie'
  import config from '../../api/default'
  const key = config.key

  export default {
    name: "login",
    data() {
      return {
        visibility: false,
        account: '',
        password: '',
        isLogining: false,
        showTipMessage: false,
        tipMessage: '',
        loginSuccess:false
      }
    },
    mounted() {
      let token = Cookies.get('authorization')
      if( token ){
        token = `${key} ${token}`
        userAPI.getCurrent(token)
          .then( res => {
            this.showTipMessage = true
            this.tipMessage = `登陆成功，欢迎您：${res.data.name}`
            this.loginSuccess = true
          })
          .catch(error=>error.message)
      }
    },
    methods: {
      loginClick() {
        let result = validate.validateLogin(this.account, this.password);
        this.isLogining = result.condition;
        const loginData = {
          email: this.account,
          password: this.password
        }
        if (this.isLogining) {
          userAPI.login(loginData)
            .then(res=>{
              if(res.data.status === 200){
                this.showTipMessage = true
                Cookies.set('authorization', res.data.token , { expires: 7 });
                this.tipMessage = `登陆成功，欢迎您：${res.data.name}`
                this.loginSuccess = true
              }else{
                this.showTipMessage = true
                this.tipMessage = res.data.msg
              }
            })
            .catch(error=>error.message)
        } else {
          this.tipMessage = result.errors.message
          this.showTipMessage = true
          // console.log(result.errors)
        }
      },
      closeTipMessage() {
        if(this.loginSuccess){
          this.$router.replace('/mainPages/myNews')
        }
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
    background-image: linear-gradient(to right, #29bdd9 0%, #276ace 100%);
    width: 70vw;
    height: 50px;
    font-size: 16px;
    color: white;
  }

  .tip-message-font {
    color: #f34336;
  }

  .tip-message-font-success {
    color: #2ecc71;
  }
</style>
