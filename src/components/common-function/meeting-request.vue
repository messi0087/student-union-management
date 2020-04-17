<template>
  <div>
    <van-tabs v-model="activeName" color="#2196f3">
      <van-tab title="待审核" name="unchecked">
        <div class="context"  v-if="isMyVerifyMeeting">
          <template v-for="(item,index) in myVerifyMeeting">
            <specific-item-meeting
                    @click.native="showVerifyWindow(item.id)"
                    :key="index"
                    :situation="getSituation(item.situation)"
                    :title="item.theme"
                    :startTime="item.startTime"
                    :endTime="item.endTime"
                    :context="item.content"
                    :place="item.address"
                    :originatorDepartment='item.originatorDepartment'
                    :Originator='item.Originator'
                    :OriginatorPosition='getOriginatorPosition(item.OriginatorPosition)'
                    :reviewer='item.reviewer'
                    :reviewerPosition='getOriginatorPosition(item.reviewerPosition)'
                    :reviewerDepartment='item.reviewerDepartment'
            />
          </template>
        </div>
        <div v-else>
          <a-empty style="margin-top: 100px" description="暂无数据"/>
        </div>
      </van-tab>
      <van-tab title="已审核" name="checked">
        <div class="context" v-if="isAllMeeting">
          <template v-for="(item,index) in allMeeting">
            <specific-item-meeting
                    :key="index"
                    :situation="getSituation(item.situation)"
                    :title="item.theme"
                    :startTime="item.startTime"
                    :endTime="item.endTime"
                    :context="item.content"
                    :place="item.address"
                    :originatorDepartment='item.originatorDepartment'
                    :Originator='item.Originator'
                    :OriginatorPosition='getOriginatorPosition(item.OriginatorPosition)'
                    :reviewer='item.reviewer'
                    :reviewerPosition='getOriginatorPosition(item.reviewerPosition)'
                    :reviewerDepartment='item.reviewerDepartment'
            />
          </template>
        </div>
        <div v-else>
          <a-empty style="margin-top: 100px" description="暂无数据"/>
        </div>
      </van-tab>
      <van-tab title="我的会议申请" name="myApplication">
        <div class="context">
          <mu-flex justify-content="center" align-items="center" class="add-bill-button" @click="showAddMeetingDialog()">
            <mu-button round  color="primary">提交会议申请</mu-button>
          </mu-flex>
          <div v-if="isMyMeeting">
            <template v-for="(item,index) in myMeeting">
              <specific-item-meeting
                      :key="index"
                      :situation="getSituation(item.situation)"
                      :title="item.theme"
                      :startTime="item.startTime"
                      :endTime="item.endTime"
                      :context="item.content"
                      :place="item.address"
                      :originatorDepartment='item.originatorDepartment'
                      :Originator='item.Originator'
                      :OriginatorPosition='getOriginatorPosition(item.OriginatorPosition)'
                      :reviewer='item.reviewer'
                      :reviewerPosition='getOriginatorPosition(item.reviewerPosition)'
                      :reviewerDepartment='item.reviewerDepartment'
              />
            </template>
          </div>
          <div v-else>
            <a-empty style="margin-top: 100px" description="暂无数据"/>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <!--弹出申请的弹框-->
    <a-modal
            title="增加会议申请"
            :visible="openAddMeeting"
            :closable="false"
            :footer="null"
            centered
            :width="350"
            destroyOnClose
    >
      <div class="modal-style">
        <mu-text-field
                v-model="theme"
                label="会议主题"
                label-float
                icon="toys"
        />
        <br/>
        <mu-text-field
                v-model="content"
                multi-line
                :rows="2"
                label-float
                icon="speaker_notes"
                label="输入会议内容"
        />
        <br/>
        <mu-text-field
                v-model="address"
                label="会议举办的地址"
                label-float
                icon="add_location"
        />

        <br/>
        <a-date-picker :locale='locale' placeholder="请选择开始会议的时间" @change="onChange" showTime :popupStyle="{zIndex:10000}" />
        <mu-text-field
                v-model="endTime"
                label="会议的时长"
                label-float
                icon="access_time"
                suffix="小时"
        />

        <br/>

        <mu-flex justify-content="center" align-items="center" style="margin: 10px 0">
          <mu-button round color="success" @click="sendAddMeetingData()">确认添加</mu-button>
        </mu-flex>
        <mu-button style="align-self: flex-end" slot="actions" flat color="primary" @click="closeAddMeetingDialog()">关闭</mu-button>
      </div>
    </a-modal>

    <!--弹出审核-->
    <a-modal
            title="审核"
            v-model="isVerify"
            @ok="closeVerifyWindow()"
            centered
            :maskClosable="false"
            :footer="null"
    >
      <p>确定是否审核通过</p>
      <div class="modal-style">
        <div class="confirm-concel-button">
          <mu-button style="width:125px" round color="success" @click="verifyMeetingConfirm()">审核通过</mu-button>
          <mu-button style="width:125px"  round color="error" @click="verifyMeetingCancel()">审核不通过</mu-button>
        </div>
        <mu-button style="align-self: flex-end" slot="actions" flat color="primary" @click="closeVerifyWindow()">关闭</mu-button>
      </div>
    </a-modal>
  </div>
</template>
<script>
  import Vue from 'vue'
  import { Tab, Tabs } from 'vant';
  import 'vant/lib/button/style';
  import specificItemMeeting from './specific-item-meeting'
  //引入muse的Toast
  import Toast from 'muse-ui-toast';
  import * as meetingAPI from '../../api/meeting'
  import * as validate from '../../utils/validate'
  import * as getData from '../../utils/get-position'
  //引入anti的时间选择
  import {DatePicker,Modal} from 'ant-design-vue'
  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';


  Vue.config.productionTip = false

  Vue.use(Tab).use(Tabs).use(Toast).use(DatePicker).use(Modal)

  export default {
    name: "meeting-request",
    components:{
      specificItemMeeting
    },
    data() {
      return {
        activeName: 'unchecked',
        locale,
        openAddMeeting :false,
        myMeeting: [],
        myVerifyMeeting: [],
        allMeeting: [],
        isMyMeeting: false,
        isAllMeeting: false,
        isMyVerifyMeeting: false,
        theme :'',
        address :'',
        content :'',
        startTime :'',
        endTime :'',
        meetingId:0,
        isVerify: false
      }
    },
    mounted() {
      this.getMyVerifyMeeting()
    },
    watch: {
      activeName() {
        if(this.activeName==='unchecked'){
          this.getMyVerifyMeeting()
        }
        else if(this.activeName==='checked'){
          this.getAllMeeting()
        }
        else if(this.activeName==='myApplication'){
          this.getMyMeetingData()
        }
      }
    },
    methods: {
      getOriginatorPosition(data){
        return getData.getPosition(data)
      },
      getSituation(data){
        if( data === 0 ){
          return '未审核'
        }
        else if( data === 1 ){
          return '通过'
        }
        else if( data === 2 ){
          return '未通过'
        }
      },
      //获取数据
      getMyVerifyMeeting(){
        meetingAPI.getVerifyMeeting(this.$store.state.token)
          .then(res=>{
            if(res.data.status === 200) {
              this.myVerifyMeeting = res.data.meetingData
              this.isMyVerifyMeeting = true
            }else {
              this.isMyVerifyMeeting = false
            }
          })
      },
      getAllMeeting(){
        meetingAPI.getAllMeeting()
          .then(res=>{
            if(res.data.status === 200) {
              this.allMeeting = res.data.meetingData
              this.isAllMeeting = true
            }else {
              this.isAllMeeting = false
            }
          })
      },
      getMyMeetingData(){
        meetingAPI.getMyMeeting(this.$store.state.token)
          .then(res=>{
            if(res.data.status === 200) {
              this.myMeeting = res.data.meetingData
              this.isMyMeeting = true
            }else {
              this.isMyMeeting = false
            }
          })
      },
      onChange(date, dateString) {
        this.startTime = dateString;
      },
      showAddMeetingDialog () {
        this.openAddMeeting = true
      },
      closeAddMeetingDialog () {
        this.openAddMeeting = false
        this.theme =''
        this.address =''
        this.content =''
        this.startTime =''
        this.endTime =''
      },
      sendAddMeetingData () {
        const newMeetingData = {
          theme :this.theme,
          address :this.address,
          content :this.content,
          endTime :this.endTime,
          startTime :this.startTime
        }
        let result = validate.validateNewMeeting(newMeetingData)

        if(result.condition){
          meetingAPI.increaseMeeting(this.$store.state.token,newMeetingData)
            .then(res =>{
              if(res.data.status===200){
                this.$toast.success(res.data.msg)
                this.closeAddMeetingDialog()
                this.getMyMeetingData()
              }else {
                this.$toast.error(res.data.msg)
                this.closeAddMeetingDialog()
                this.getMyMeetingData()
              }
            })
        }else {
          this.$toast.error(result.errors.message)
        }
      },
      showVerifyWindow (data){
        this.isVerify =true
        this.meetingId =data
        // activityAPI.verifyActivity(this.$store.state.token,)
      },
      verifyMeetingConfirm(){
        meetingAPI.verifyMeeting(this.$store.state.token, {id :this.meetingId,situation: 1})
          .then(res =>{
            if(res.data.status === 200){
              this.$toast.success(res.data.msg)
              this.isVerify =false
              this.getMyVerifyMeeting()
            }else {
              this.$toast.error(res.data.msg)
            }
          })
          .catch(error => console.log(error.message))
      },
      verifyMeetingCancel(){
        meetingAPI.verifyMeeting(this.$store.state.token,{id :this.meetingId,situation: 2})
          .then(res =>{
            if(res.data.status === 200){
              this.$toast.warning(res.data.msg)
              this.isVerify =false
              this.getMyVerifyMeeting()
            }else {
              this.$toast.error(res.data.msg)
            }
          })
          .catch(error => console.log(error.message))
      },
      closeVerifyWindow(){
        this.isVerify =false
      }
    }
  }
</script>

<style scoped>
  .context{
    width: 100vw;
    height: 71vh;
    overflow: scroll;
    border-top: 1px solid #dbdcde;
    margin-top: 2px;
    background-color: rgba(234, 235, 237, 0.42);
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .context::-webkit-scrollbar{
    display: none;
  }

  .add-bill-button{
    margin: 10px 0;
  }

  .modal-style{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .confirm-concel-button{
    width:100%;
    display:flex;
    align-items: center;
    justify-content: space-around;
    margin: 20px 0;
  }

</style>
