<template>
  <div class="index-information">
    <main>
      <mu-card class="information-card">
        <mu-card-header :title="name" :sub-title="email">
          <mu-avatar slot="avatar">
            <img src="../../assets/imgs/bg4.png">
          </mu-avatar>
        </mu-card-header>

        <mu-card-title sub-title="身份信息"></mu-card-title>
        <mu-card-text>
          部门：{{department}}
          <br>
          职位：{{position}}
          <br>
          电话号码：{{phone}}
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

    <!--修改个人信息的弹出-->
    <mu-dialog
            :esc-press-close="false"
            :overlay-close="false"
            :open.sync="isShowChangeInformation">
      <p class="add-card-title">修改个人信息</p>

      <mu-text-field v-model="newName"
                     class="account-input"
                     label="姓名"
                     icon="person"
                     label-float />

      <mu-text-field v-model="newPhone"
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
        <mu-option v-for="(item,index) in departments" :key="index" :label="item" :value="item"/>
      </mu-select>

      <mu-select label="职位选择" v-model="positionChoice" chips tags class="select-department">
        <template slot="selection" slot-scope="scope">
          <mu-chip :selected="scope.selected" color="teal">
            {{scope.label}}
          </mu-chip>
        </template>
        <mu-option v-for="(item,index) in positions" :key="index" :label="item" :value="item"/>
      </mu-select>

      <mu-button color="primary" @click="sendChangeInformation()" class="button-position">
        确认修改
        <mu-icon right value="send"></mu-icon>
      </mu-button>

      <mu-button slot="actions" flat color="primary" @click="closeChangeInformation()">关闭</mu-button>
    </mu-dialog>

    <!--修改密码的弹出-->
    <mu-dialog
            :esc-press-close="false"
            :overlay-close="false"
            :open.sync="isShowChangePassword">
      <p class="add-card-title">修改密码</p>

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
                     label="原密码"
                     icon="lock"
                     label-float
                     :action-icon="visibility ? 'visibility_off' : 'visibility'"
                     :action-click="() => (visibility = !visibility)"
                     :type="visibility ? 'text' : 'password'"/>

      <mu-text-field v-model="confirmPassword"
                     max-length="16"
                     class="confirm-password-input"
                     label="新密码"
                     icon="lock"
                     label-float
                     :type="visibility ? 'text' : 'password'"/>

      <mu-button color="primary" class="button-position" @click="sendChangePassword">
        确认修改密码
        <mu-icon right value="send"></mu-icon>
      </mu-button>

      <mu-button slot="actions" flat color="primary" @click="closeChangePassword()">关闭</mu-button>
    </mu-dialog>

  </div>
</template>

<script>
  //引入配置和Cookie
  import config from '../../api/default'
  const key =config.key
  import Cookies from 'js-cookie'
  //引入工具
  import * as userAPI from '../../api/user'
  import * as getData from '../../utils/get-position'
  import * as validate from '../../utils/validate'
  //引入muse的Toast
  import Vue from 'vue'
  import Toast from 'muse-ui-toast';
  Vue.use(Toast);
  let token = ''

  export default {
    name: 'my-information',
    data() {
      return {
        //修改密码
        account:'',
        password:'',
        confirmPassword:'',
        visibility: false,
        isShowChangePassword: false,
        //新的用户信息
        newName: '',
        departmentChoice: '',
        positionChoice : '',
        newPhone: '',
        departments: [
          '主席团', '老师', '文体中心','学办中心','团学中心', '新闻中心','科创中心',
          '办公室','外联部','体育部','文艺部','组织部','青年志愿者协会','宣传部','记者部','科竞部','创业部',
        ],
        positions:[
          '主席','老师','中心主任','中心副主任','部长','副部长','干事',
        ],
        isShowChangeInformation : false,
        //获取用户信息
        department:'',
        name:'',
        phone:'',
        position:'',
        email:'',
      }
    },
    beforeCreate() {
      token = `${key} ${Cookies.get('authorization')}`
      userAPI.getCurrent(token)
      .then( res => {
        this.email = res.data.email
        this.department = res.data.departmentChoice
        this.name = res.data.name
        this.phone = res.data.phone
        this.position = getData.getPosition(res.data.positionChoice)
      })
    },
    methods: {
      //登出
      logOut(){
        Cookies.remove('authorization');
        this.$router.replace('/')
      },
      //修改密码
      changePassword(){
        this.isShowChangePassword = true
      },
      closeChangePassword(){
        this.isShowChangePassword = false
        this.account = ''
        this.password = ''
        this.confirmPassword = ''
      },
      sendChangePassword(){
        const data ={
          email:this.account,
          currntPassword:this.password,
          newPassward:this.confirmPassword
        }
        let result = validate.validateChangePassword(data);
        if( !result.condition ){
          this.$toast.error(result.errors.message)
        }else {
          userAPI.changePassword(data)
          .then(res => {
            if(res.data.status === 200){
              this.$toast.success(res.data.msg)
              this.closeChangePassword()
            } else {
              this.$toast.error(res.data.msg)
            }
          })
          .catch(error => console.log(error.message))
        }
      },
      //修改信息
      changeInformation(){
        this.isShowChangeInformation = true
      },
      closeChangeInformation(){
        this.isShowChangeInformation = false
        this.newName =''
        this.departmentChoice =''
        this.positionChoice =''
        this.newPhone =''
      },
      sendChangeInformation(){
        const body={
          newName: this.newName,
          departmentChoice: this.departmentChoice,
          positionChoice : this.positionChoice,
          newPhone: this.newPhone,
        }
        userAPI.changeInformation(token,body)
        .then(res =>{
          if(res.data.status === 200){
            this.department = res.data.departments
            this.name = res.data.name
            this.phone = res.data.phone
            this.position = getData.getPosition(res.data.authority)
            this.$toast.success(res.data.msg)
            this.closeChangeInformation()
          }else {
            this.$toast.error(res.data.msg)
          }
        })
        .catch(error =>console.log(error.message))
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

  .add-card-title{
    text-align: center;
    font-weight: 600;
    font-size: 20px;
  }

  .button-position{
    position: relative;
    left : 50%;
    margin-left:-60px;
  }

  .select-department{
    font-size: 20px;
  }
</style>
