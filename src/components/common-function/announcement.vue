<template>
  <div class="index-announcement">
    <div class="main-body">
      <img src="../../assets/imgs/通知广播.png" class="head-img"/>

      <mu-button large fab color="red" class="add-new-card" title="增加新的公告" @click="showAddCardMessage()">
        <mu-icon value="edit"></mu-icon>
      </mu-button>

      <div class="card-message" v-if="isData">
        <template v-for="(item,index) in data">
          <a-card :title="item.theme" class="single-message" :key="index">
            <a href="#" slot="extra" @click="showCardMessage(item)">详情</a>
            <p>{{item.context}}</p>
          </a-card>
        </template>
      </div>
      <div v-else>
        <a-empty style="margin-top: 20px" description="暂无数据"/>
      </div>

      <!--具体公告的弹出-->
      <mu-dialog
              :esc-press-close="false"
              :overlay-close="false"
              :open.sync="openCardMessage">
        <a-card title="详情" class="dialog-class">
          <p class="card-message-title">发起人信息:</p>
          <p class="card-message-context">{{`姓名：${detailStaff}`}}</p>
          <p class="card-message-context">{{`部门：${detailDepartment}`}}</p>
          <p class="card-message-context">{{`职位：${detailPosition}`}}</p>
          <hr>
          <p class="card-message-title">公告详情:</p>
          <p class="card-message-context">主题：</p>
          <p class="card-message-context">{{detailTheme}}</p>
          <p class="card-message-context">详情：</p>
          <p class="card-message-context">{{detailContext}}</p>
          <p class="card-message-context">发起时间：</p>
          <p class="card-message-context">{{detailTime}}</p>
        </a-card>
        <mu-button slot="actions" flat color="primary" @click="closeCardMessage()">关闭</mu-button>
      </mu-dialog>

      <!--增加公告的弹出-->
      <mu-dialog
              :esc-press-close="false"
              :overlay-close="false"
              :open.sync="addCardMessage">
        <p class="add-card-title">增加公告</p>

        <mu-text-field
                  v-model="theme"
                  label="公告主题"
                  label-float
                  icon="toys"/>
        <br/>
        <mu-text-field
                v-model="context"
                multi-line
                :rows="4"
                label-float
                icon="speaker_notes"
                label="输入公告内容"
        />
        <mu-button fab color="teal" class="add-button" @click="sendAnnouncementData()">
          <mu-icon value="add"></mu-icon>
        </mu-button>

        <mu-button slot="actions" flat color="primary" @click="closeAddCardMessage()">关闭</mu-button>
      </mu-dialog>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Card,Empty} from 'ant-design-vue'
  import * as announcementAPI from '../../api/announcement'
  import * as getData from '../../utils/get-position'
  //引入muse的Toast
  import Toast from 'muse-ui-toast';
  Vue.use(Toast).use(Card).use(Empty)
  Vue.config.productionTip = false
  export default {
    name: "announcement",
    data() {
      return {
        openCardMessage:false,
        addCardMessage:false,
        isData:false,
        theme:'',
        context:'',
        data:[],
        detailTheme:'',
        detailContext:'',
        detailTime:'',
        detailStaff:"",
        detailDepartment:'',
        detailPosition:''
      }
    },
    mounted(){
     this.getAnnouncementData()
    },
    methods: {
      getAnnouncementData(){
        announcementAPI.getAnnouncement()
          .then(res => {
            if (res.data.status ===200) {
              this.data = res.data.announcemenData
              this.isData =true
            }else {
              this.isData =false
            }
          })
          .catch(error =>console.log(error.message))
      },
      closeCardMessage(){
        this.openCardMessage = false
        this.detailTheme = ''
        this.detailTime = ''
        this.detailStaff = ''
        this.detailDepartment = ''
        this.detailContext = ''
        this.detailPosition = ''
      },
      showCardMessage(data){
        this.openCardMessage = true
        this.detailTheme = data.theme
        this.detailTime = new Date(data.time).Format()
        this.detailStaff = data.staff
        this.detailDepartment = data.department
        this.detailContext = data.context
        this.detailPosition = getData.getPosition(data.position)
      },
      closeAddCardMessage(){
        this.addCardMessage = false
        this.theme = ''
        this.context = ''
      },
      showAddCardMessage(){
        this.addCardMessage = true
      },
      sendAnnouncementData(){
        announcementAPI.increaseAnnouncement(this.$store.state.token,{
          theme :this.theme,
          content :this.context
        })
        .then( res =>{
          if(res.data.status === 200){
            this.$toast.success(res.data.msg)
            this.getAnnouncementData()
            this.closeAddCardMessage()
          }else {
            this.$toast.error(res.data.msg)
            this.getAnnouncementData()
            this.closeAddCardMessage()
          }
        })
        .catch(error =>console.log(error.message))

      }
    }
  }
</script>

<style scoped>
  .index-announcement{
    background-color: rgba(226, 232, 236, 0.37);
    height: 77vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .main-body{
    background-color: rgba(255, 255, 255, 0.39);
    width: 90vw;
    height: 65vh;
    position: relative;
  }

  .head-img{
    height: 75px;
    width:87px;
    position: relative;
    bottom: 20px;
    transform:rotate(-5deg)
  }

  .card-message{
    overflow: scroll;
    height: 55vh;
  }

  .single-message{
    margin: 10px 5px;
  }

  .dialog-class{
    width: 60vw;
    min-height: 30vh;
  }

  .add-new-card{
    width: 60px;
    height: 60px;
    display: block;
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -30px;
  }

  .add-card-title{
    text-align: center;
    font-weight: 600;
    font-size: 20px;
  }

  .add-button{
    position: relative;
    left: 50%;
    margin-left: -28px;
  }

  .card-message p {
    width: 30vw;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .card-message-title{
    font-size: 17px;
    font-weight: 600;
    margin-bottom: 1px;
  }

  .card-message-context{
    margin-bottom: 1px;
    font-size: 14px;
    font-weight: 500;
    color: #57606f;
  }
</style>
