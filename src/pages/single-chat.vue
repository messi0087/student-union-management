<template>
  <div class="index">
    <header>
      <top-message>
        <span>{{title}}</span>
      </top-message>
      <svg  @click="onBack()" t="1587830049462" class="icon title-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1925" width="35" height="35"><path d="M967.111111 455.111111v113.777778H170.666667V455.111111z" fill="#ffffff" p-id="1926"></path><path d="M477.866667 955.733333L34.133333 517.688889l443.733334-443.733333 79.644444 79.644444-364.088889 364.088889 364.088889 358.4z" fill="#ffffff" p-id="1927"></path></svg>
    </header>

    <main>
      <div class="line" />
      <message  v-for="(item,index) in data" :time="item.time" :content="item.content" :situation="item.situation" :key="index" ref="message"/>
    </main>

    <footer>
      <div class="line-footer" />
      <div class="footer-input">
        <div @click="clearInputText()">
          <svg t="1587893369496" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1905" width="20" height="20"><path d="M307.2 307.2c-12.8 12.8-12.8 44.8 0 57.6L460.8 512l-147.2 147.2c-12.8 12.8-12.8 38.4 0 51.2 12.8 12.8 38.4 12.8 51.2 0L512 563.2l147.2 147.2c12.8 12.8 38.4 12.8 51.2 0 12.8-12.8 12.8-38.4 0-51.2L563.2 512l147.2-147.2c12.8-12.8 12.8-38.4 0-51.2-12.8-12.8-38.4-12.8-51.2 0L512 460.8 364.8 307.2c-12.8-12.8-44.8-12.8-57.6 0z" p-id="1906" fill="#007aff"></path><path d="M512 1024c-281.6 0-512-230.4-512-512s230.4-512 512-512c108.8 0 211.2 32 300.8 96 12.8 12.8 19.2 32 6.4 44.8s-32 19.2-44.8 6.4C697.6 89.6 608 64 512 64 262.4 64 64 262.4 64 512s198.4 448 448 448 448-198.4 448-448c0-76.8-19.2-153.6-57.6-224-6.4-12.8-6.4-32 12.8-44.8 12.8-6.4 32-6.4 44.8 12.8 38.4 76.8 64 166.4 64 256 0 281.6-230.4 512-512 512z" p-id="1907" fill="#007aff"></path></svg>
        </div>
        <div class="input-text-area">
          <mu-text-field
                v-model="textValue"
                placeholder="请输入"
                multi-line :rows="1" :rows-max="2"
                class="text-input"
          />
        </div>
          <mu-button @click="sendChatMessage()" class="send-button" round color="primary">发送</mu-button>
      </div>
    </footer>
  </div>
</template>

<script>
  import topMessage from '../components/top-message'
  import message from '../components/chat/message'
  import Cookies from "js-cookie";
  const key = config.key
  import Message from "muse-ui-message";
  import * as userAPI from "../api/user";
  import config from "../api/default";

  export default {
    name: "single-chat",
    components: {
      topMessage,
      message
    },
    sockets: {
      // loginSuccess(msg){
      //   // console.log(msg)
      // },
      messageTalk(data){
        if(data.id ===this.$store.state.id){
          this.$toast.message(data.msg)
        }
      },
      chatSuccess(msg){
        if(Number(msg.sendId) === Number(this.$route.query.id)) {
          this.data.push(msg)
        }
      },
      messageAnnouncement: function (data) {
        if(data.id !==this.$store.state.id){
          this.$toast.message(data.msg)
        }
      }
    },
    updated(){
      this.scrollMessage()
    },
    mounted() {
      if(!this.$route.query.name || !this.$route.query.id){
        Message.alert('消息丢失，请重新选择想要聊天的人', '警告')
          .then(res =>{
            if(res.result) {
              this.$router.replace('/mainPages/myNews')
            }
          })
      }
      this.title = this.$route.query.name ? this.$route.query.name : '聊天窗口'
      if(this.$store.state.id) {
        this.$socket.emit('login', {id:this.$store.state.id,name:this.$store.state.name})
      }
      else {
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
                this.$socket.emit('login', {id:this.$store.state.id,name:this.$store.state.name})
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
      }
    },
    data() {
      return {
        textValue: '',
        data:[],
        title:'聊天窗口',
      }
    },
    methods:{
      sendChatMessage(){
        if( this.textValue === ''){
          return 0
        }
        let newDate = {
          time:new Date().Format('hh:mm:ss'),
          situation:2,
          content:this.textValue,
          id:this.$route.query.id,
          name:this.$route.query.name,
          sendId:this.$store.state.id,
          sendName:this.$store.state.name
        }
        this.data.push(newDate)
        this.$socket.emit('chat',newDate)
        this.textValue =''
      },
      scrollMessage(){
        if(this.$refs.message && this.$refs.message.length !==0){
          let final = this.$refs.message.length -1
          this.$refs.message[final].$el.scrollIntoView({block:"end",behavior:"smooth"})
        }
      },
      onBack(){
        this.$router.go(-1);
      },
      clearInputText(){
        this.textValue =''
      }
    },
    destroyed() {
      this.$socket.emit('loginOut',{id:this.$store.state.id,name:this.$store.state.name})
    }
  }
</script>

<style scoped lang="scss">
  .index {
    height: 100vh;
    width: 100vw;
    .title-icon{
      position: absolute;
      top:3.5vh;
      margin-top: -17.5px;
      left: 10px;
    }

    .line{
      width: 90vw;
      height: 2px;
      background-color: rgba(238, 237, 237, 0.7);
      border-radius: 100px;
      margin: 10px auto;
    }
    .line-footer{
      width: 90vw;
      height: 2px;
      background-color: rgba(238, 237, 237, 0.7);
      border-radius: 100px;
      margin: 5px auto;
    }
  }

  footer{
    position: absolute;
    bottom: 0;
    height: 10vh;
    width: 100vw;
    background-color: #ffffff;

    .footer-input{
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      margin:  0 5px;
    }
    .input-text-area{
      width: 70vw;
      background: #f2f2f2;
      border-radius: 100px;
    }

    .text-input {
      margin: 0 15px;
      height: 8vh;
    }

    .send-button{}
  }


  main{
    background-color: #ffffff;
    width: 100vw;
    height: 83vh;
    overflow: scroll;
    overflow-x: hidden;
  }


  .icon:active{
    opacity: 0.5;
  }

  .icon:active{
    opacity: 0.5;
  }
</style>
