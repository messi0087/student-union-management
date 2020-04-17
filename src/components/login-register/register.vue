<template>
    <div class="register">
        <!--        账号输入框-->
        <mu-text-field v-model="account"
                       class="account-input"
                       label="邮箱"
                       icon="email"
                       label-float />
        <!--        密码输入框-->
        <mu-text-field v-model="password"
                       max-length="16"
                       class="password-input"
                       label="密码"
                       icon="lock"
                       label-float
                       :action-icon="visibility ? 'visibility_off' : 'visibility'"
                       :action-click="() => (visibility = !visibility)"
                       :type="visibility ? 'text' : 'password'"/>

        <mu-text-field v-model="confirmPassword"
                       max-length="16"
                       class="confirm-password-input"
                       label="确认密码"
                       icon="lock"
                       label-float
                       :type="visibility ? 'text' : 'password'"/>

        <!--个人信息-->
        <mu-text-field v-model="name"
                       class="account-input"
                       label="姓名"
                       icon="person"
                       label-float />

        <mu-text-field v-model="phone"
                       class="account-input"
                       label="电话号码"
                       icon="phone"
                       label-float />

        <mu-select label="部门选择" v-model="departmentChoice" chips tags class="select-department">
                <template slot="selection" slot-scope="scope">
                    <mu-chip :selected="scope.selected" color="teal">
                        {{scope.label}}
                    </mu-chip>
                </template>
                <mu-option v-for="(item,index) in department" :key="index" :label="item" :value="item"/>
            </mu-select>

        <mu-select label="职位选择" v-model="positionChoice" chips tags class="select-department">
            <template slot="selection" slot-scope="scope">
                <mu-chip :selected="scope.selected" color="teal">
                    {{scope.label}}
                </mu-chip>
            </template>
            <mu-option v-for="(item,index) in position" :key="index" :label="item" :value="item"/>
        </mu-select>
        <mu-button round class="login-button" @click="registerClick()">注册</mu-button>


        <mu-dialog title="提示" width="400" :open.sync="showTipMessage" class="tip-message">
            <span :class="this.registerSuccess ? 'tip-message-font-success' : 'tip-message-font'">{{tipMessage}}</span>
            <mu-button slot="actions" flat color="primary" @click="closeTipMessage">关闭</mu-button>
        </mu-dialog>
    </div>
</template>

<script>
    import * as validate from '../../utils/validate'
    import * as userAPI from '../../api/user'
    export default {
        name: "register",
        data(){
            return{
                account:'',
                password:'',
                confirmPassword:'',
                name:'',
                phone:'',
                visibility:false,
                isRegister:true,
                department: [
                    '主席团', '老师', '文体中心','学办中心','团学中心', '新闻中心','科创中心',
                    '办公室','外联部','体育部','文艺部','组织部','青年志愿者协会','宣传部','记者部','科竞部','创业部',
                ],
                position:[
                    '主席','老师','中心主任','中心副主任','部长','副部长','干事',
                ],
                departmentChoice:'',
                positionChoice:'',
                showTipMessage: false,
                tipMessage: '',
                registerSuccess:false
            }
        },
        methods:{
            registerClick(){
                const data ={
                    account:this.account,
                    password:this.password,
                    confirmPassword:this.confirmPassword,
                    name:this.name,
                    phone:this.phone,
                    positionChoice:this.positionChoice,
                    departmentChoice:this.departmentChoice,
                }
                let result = validate.validateRegister(data);
                this.isRegister=result.condition;
                if(this.isRegister) {
                    userAPI.register(data)
                    .then(res=>{
                        if(res.data.status === 200){
                            this.showTipMessage = true
                            this.tipMessage = res.data.msg
                            this.registerSuccess=true
                        }else{
                            this.showTipMessage = true
                            this.tipMessage = res.data.msg
                        }
                    })
                    .catch(error=>error.message)
                }
                else {
                    this.tipMessage = result.errors.message
                    this.showTipMessage = true
                }
            },
            closeTipMessage() {
                if(this.registerSuccess){
                    this.$emit('changeURl')
                    this.$router.push('/')
                }
                this.showTipMessage = false
            }
        }
    }
</script>

<style scoped>
    .register{
        display: flex;
        flex-direction: column;
        /*justify-content: center;*/
        align-items: center;
        height: 52vh;
        overflow: scroll;
    }

    /*.register::-webkit-scrollbar {*/
    /*    border-width:1px;*/
    /*}*/

    .account-input{
        width: 80vw;
        margin: 10px 0;
    }
    .password-input{
        width: 80vw;
    }

    .confirm-password-input{
        width: 80vw;
    }

    .login-button{
        background-image: linear-gradient(to right, #29bdd9 0%, #276ace 100%);
        width: 70vw;
        height: 50px;
        font-size: 16px;
        color: white;
    }

    .select-department{
        font-size: 20px;
    }

    .tip-message-font {
        color: #f34336;
    }

    .tip-message-font-success {
        color: #2ecc71;
    }
</style>
