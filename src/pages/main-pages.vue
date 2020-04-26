<template>
  <div class="index">
    <header>
      <top-message>
        <span>{{title}}</span>
      </top-message>
    </header>

    <main class="main">
      <router-view/>
    </main>

    <footer class="footer">
      <mu-bottom-nav :value.sync="shift" class="bottom-nav" shift>
        <mu-bottom-nav-item :value='myNews' title="我的消息" icon="message" :to="myNewsUrl"/>
        <mu-bottom-nav-item :value='addressBook' title="通讯录" icon="contact_phone" :to="addressBookUrl"/>
        <mu-bottom-nav-item :value='commonFunctions' title="常用功能" icon="apps" :to="commonFunctionsUrl"/>
        <mu-bottom-nav-item :value='myInformation' title="我的信息" icon="account_circle" :to="myInformationUrl"/>
      </mu-bottom-nav>
    </footer>
  </div>
</template>

<script>
  import topMessage from '../components/top-message'
  import Cookies from 'js-cookie'
  import config from '../api/default'
  import * as userAPI from '../api/user'
  const key = config.key
  //引入muse的Message
  import 'muse-ui-message/dist/muse-ui-message.css';
  import Vue from 'vue';
  import Message from 'muse-ui-message';
  import Toast from 'muse-ui-toast';
  Vue.use(Message).use(Toast)

  export default {
    name: "main-pages",
      sockets: {
        // connect: function () {
        //   console.log('socket connected')
        // },
        messageAnnouncement: function (data) {
          if(data.id !==this.$store.state.id){
            this.$toast.message(data.msg)
          }
        },
        messageMeeting: function (data) {
          let condition = data.id.findIndex(item =>item ===this.$store.state.id)
          if(condition !== -1){
              this.$toast.message(data.msg)
          }
        },
        messageActivity: function (data) {
          let condition = data.id.findIndex(item =>item ===this.$store.state.id)
          if(condition !== -1){
            this.$toast.message(data.msg)
          }
        },
        messageTalk(data){
          if(data.id ===this.$store.state.id){
            this.$toast.message(data.msg)
          }
        }
      },
    data() {
      return {
        direction: 'slide-right',
        shift: this.$route.name,
        myNews: 'myNews',
        addressBook: 'addressBook',
        commonFunctions: 'commonFunctions',
        myInformation: 'myInformation',
        myNewsUrl: '/mainPages/myNews',
        addressBookUrl: '/mainPages/addressBook',
        commonFunctionsUrl: '/mainPages/commonFunctions',
        myInformationUrl: '/mainPages/myInformation',
      }
    },
    beforeRouteUpdate(to, from, next) {
      this.shift = to.name
      next()
    },
    beforeCreate() {
      let token = Cookies.get('authorization')
      if(!token){
        Message.alert('身份信息失效请重新登录', '提示')
          .then(res =>{
            if(res.result) {
              this.$router.replace('/')
            }
          })
      }
      else {
        userAPI.getCurrent(`${key} ${token}`)
        .then(res => {
          if(res.data.status === 200){
            this.$store.commit('setToken',`${key} ${token}`)
            this.$store.commit('setName',res.data.name)
            this.$store.commit('setId',res.data.id)
            this.$store.commit('setDepartment',res.data.departmentChoice)
            this.$store.commit('setPosition',res.data.positionChoice)
          }else {
            Message.alert('身份信息失效请重新登录', '提示')
              .then(res =>{
                if(res.result) {
                  this.$router.replace('/')
                }
              })
          }
        })
        .catch(()=>{
          Message.alert('身份信息失效请重新登录', '提示')
            .then(res =>{
              if(res.result) {
                this.$router.replace('/')
              }
            })
        })

      }
    },
    computed:{
      title(){
        let title=''
        switch(this.$route.path)
        {
          case this.myNewsUrl:
            title ='我的消息'
            break;
          case this.addressBookUrl:
            title ='通讯录'
            break;
          case this.commonFunctionsUrl:
            title ='常用功能'
            break;
          case this.myInformationUrl:
            title ='我的信息'
            break;
        }
        return title
      }
    },
    created() {
      this.chageRouterUrl()
    },
    methods:{
      chageRouterUrl(){
        if(this.$route.path ==='/mainPages') {
          this.$router.push(this.myNewsUrl)
          this.shift = this.myNewsUrl
        }
      }
    },
    components:{
      topMessage
    },
  }
</script>

<style scoped>
  .index {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    height: 100vh;
    width: 100vw;
  }

  .main {
    width: 100vw;
    height: 85vh;
    overflow: hidden;
  }

  .bottom-nav {
    width: 100vw;
    position: absolute;
    bottom: 0;
  }
</style>
