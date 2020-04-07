<template>
    <div class="register">
        <!--        账号输入框-->
        <mu-text-field v-model="account"
                       class="account-input"
                       label="Email"
                       icon="email"
                       label-float />
        <!--        密码输入框-->
        <mu-text-field v-model="password"
                       max-length="16"
                       class="password-input"
                       label="Password"
                       icon="lock"
                       label-float
                       :action-icon="visibility ? 'visibility_off' : 'visibility'"
                       :action-click="() => (visibility = !visibility)"
                       :type="visibility ? 'text' : 'password'"/>

        <mu-text-field v-model="confirmPassword"
                       max-length="16"
                       class="confirm-password-input"
                       label="ConfirmPassword"
                       icon="lock"
                       label-float
                       :type="visibility ? 'text' : 'password'"/>

        <mu-button round class="login-button" @click="registerClick()">注册</mu-button>
    </div>
</template>

<script>
    import vali from '../../utils/validate'
    export default {
        name: "register",
        data(){
            return{
                account:'',
                password:'',
                confirmPassword:'',
                visibility:false,
                isRegister:true,
            }
        },
        methods:{
            registerClick(){
                let result = vali(this.account,this.password,this.confirmPassword);
                this.isRegister=result.condition;
                if(this.isRegister){
                    this.$router.push('/')
                }
            }
        }
    }
</script>

<style scoped>
    .register{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }
    .account-input{
        width: 80vw;
        margin: 40px 0;
    }
    .password-input{
        width: 80vw;
        margin-bottom: 40px;
    }

    .confirm-password-input{
        width: 80vw;
        margin-bottom: 40px;
    }

    .login-button{
        background-image: linear-gradient(left, #29bdd9 0%, #276ace 100%);
        width: 70vw;
        height: 50px;
        font-size: 16px;
        color: white;
    }
</style>
