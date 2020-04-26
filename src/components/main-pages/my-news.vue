<template>
  <div>
    <main class="index-my-news">
      <div v-if="isShowMessageData">
        <template v-for="(item) in messageData">
        <single-item-news
                :time="new Date(item.start_time).Format()"
                :title="item.theme"
                :content="item.content"
                :situation="item.type"
                :key="item.id"
                :id="item.id"
                @deleteData="deleteMessage"
                @turnToPage="tipConfirm"
        />
      </template>
      </div>
      <div v-else>
        <a-empty style="margin-top: 100px" description="暂无消息"/>
      </div>
    </main>
  </div>
</template>

<script>
  import singleItemNews from '../my-news/single-item-news'
  import * as messageAPI from '../../api/message'
  import Cookies from 'js-cookie'
  import config from '../../api/default'
  import Vue from "vue";
  import Toast from "muse-ui-toast";
  import 'muse-ui-message/dist/muse-ui-message.css';
  import Message from 'muse-ui-message';
  import {Card, Empty} from "ant-design-vue";
  const key = config.key

  Vue.use(Toast).use(Card).use(Empty).use(Message)
  export default {
    name: 'my-news',
    components:{
      singleItemNews
    },
    data() {
      return {
        messageData:[{time:'2016-11-15 13.11',title:'sss',content:'ssssssssss',situation:'0'},{time:'2016-11-15 13.11',title:'sss',content:'ssssssssss',situation:'0'}],
        isShowMessageData:false
      }
    },
    mounted() {
      this.getMyMessage()
    },
    methods: {
      getMyMessage(){
        let token = Cookies.get('authorization')
        messageAPI.getMyMessage(`${key} ${token}`)
        .then(res =>{
          if(res.data.status === 200){
            this.messageData =res.data.messageData
            this.isShowMessageData = true
          }else {
            this.isShowMessageData = false
          }
        })
        .catch(error=>console.log(error.message))
      },
      deleteMessage(data){
        const body={
          id: data
        }
        messageAPI.deleteMessage(this.$store.state.token,body)
          .then(res =>{
            if(res.data.status === 200){
              this.$toast.success(res.data.msg)
              this.getMyMessage()
            }else {
              this.$toast.error(res.data.msg)
            }
          })
          .catch(error=>console.log(error.message))
      },
      navigationPage(datas){
        let data = datas.situation
        if( data ===0 ){
          this.$router.push({
            path:'/mainPages/commonFunctions',
            query: {
              functionShow:'2',
              defaultValue: 'announcement'
            }
          })
        }else if(data === 1){
          this.$router.push({
            path:'/mainPages/commonFunctions',
            query: {
              functionShow:'1',
              defaultValue: 'billReview'
            }
          })
        }
        else if(data === 2){
          this.$router.push({
            path:'/mainPages/commonFunctions',
            query: {
              functionShow:'0',
              defaultValue: 'meetingRequest'
            }
          })
        }
        else if(data === 3){
      let item = datas.content.split('/')
          this.$router.push({
            path:'/singleChat',
            query: {
              name:item[1],
              id: item[0]
            }
          })
        }
      },
      tipConfirm (data) {
        this.$confirm('确定要查看消息？', '提示', {
          type: 'warning'
        }).then(({ result }) => {
          if (result) {
            this.navigationPage(data)
          }
        });
      },
      // clickButton: function (data) {
      //   // $socket is socket.io-client instance
      //   this.$socket.emit('aaa', data)
      // }
    }
  }
</script>

<style scoped>
  .index-my-news{
    flex-wrap: nowrap;
    width: 100vw;
    height: 85vh;
    background-color: #f5f4f7;
    overflow: scroll;
  }

</style>
