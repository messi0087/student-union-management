<template>
<div>
  <van-tabs v-model="activeName" color="#2196f3">
    <van-tab title="待审核" name="unchecked">
      <div class="context"  v-if="isMyVerifyActivity">
        <template v-for="(item,index) in myVerifyActivity">
          <specific-item-bill
                  @click.native="showVerifyWindow(item.id)"
                  :key="index"
                  :situation="getSituation(item.situation)"
                  :title="item.theme"
                  :time="item.time"
                  :context="item.content"
                  :place="item.address"
                  :charge="item.charge.toString()"
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
      <div class="context" v-if="isAllActivity">
        <template v-for="(item,index) in allActivity">
          <specific-item-bill
                  :key="index"
                  :situation="getSituation(item.situation)"
                  :title="item.theme"
                  :time="item.time"
                  :context="item.content"
                  :place="item.address"
                  :charge="item.charge.toString()"
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
    <van-tab title="我的账单申请" name="myApplication">
      <div class="context">
        <mu-flex justify-content="center" align-items="center" class="add-bill-button" @click="showAddActivityDialog()">
          <mu-button round  color="primary">提交账单申请</mu-button>
        </mu-flex>
        <div v-if="isMyActivity">
          <template v-for="(item,index) in myActivity">
          <specific-item-bill
                  :key="index"
                  :situation="getSituation(item.situation)"
                  :title="item.theme"
                  :time="item.time"
                  :context="item.content"
                  :place="item.address"
                  :charge="item.charge.toString()"
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
          title="增加活动审核"
          :visible="openAddActivity"
          :closable="false"
          :footer="null"
          centered
          :width="350"
          destroyOnClose
  >
    <div class="modal-style">
      <mu-text-field
            v-model="theme"
            label="活动主题"
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
            label="输入活动信息"
    />
      <br/>
      <mu-text-field
            v-model="address"
            label="举办的地址"
            label-float
            icon="add_location"
    />
      <br/>
      <mu-text-field
            v-model="charge"
            label="申报的费用"
            label-float
            icon="credit_card"
            suffix="元"
    />
      <br/>
      <a-date-picker :locale='locale' placeholder="请选择时间" @change="onChange" showTime :popupStyle="{zIndex:10000}" />
      <mu-flex justify-content="center" align-items="center" style="margin: 10px 0">
        <mu-button round color="success" @click="sendAddActivityData()">确认添加</mu-button>
      </mu-flex>
      <mu-button style="align-self: flex-end" slot="actions" flat color="primary" @click="closeAddActivityDialog()">关闭</mu-button>
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
        <mu-button style="width:125px" round color="success" @click="verifyActivityConfirm()">审核通过</mu-button>
        <mu-button style="width:125px"  round color="error" @click="verifyActivityCancel()">审核不通过</mu-button>
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
  import specificItemBill from './specific-item-bill'
  //引入muse的Toast
  import Toast from 'muse-ui-toast';
  import * as activityAPI from '../../api/activity'
  import * as validate from '../../utils/validate'
  import * as getData from '../../utils/get-position'
  //引入anti的时间选择
  import {DatePicker,Modal} from 'ant-design-vue'
  import locale from 'ant-design-vue/es/date-picker/locale/zh_CN';
  import Cookies from "js-cookie";
  import config from '../../api/default'
  const key = config.key

  Vue.config.productionTip = false

  Vue.use(Tab).use(Tabs).use(Toast).use(DatePicker).use(Modal)

  export default {
    name: "bill-review",
    components:{
      specificItemBill
    },
    data() {
      return {
        locale,
        activeName: 'unchecked',
        openAddActivity :false,
        myActivity: [],
        myVerifyActivity: [],
        allActivity: [],
        isMyActivity: false,
        isAllActivity: false,
        isMyVerifyActivity: false,
        theme :'',
        address :'',
        content :'',
        charge :'',
        time :'',
        activityId:0,
        isVerify: false
      }
    },
    mounted() {
      this.getMyVerifyActivity()
    },
    watch: {
      activeName() {
        if(this.activeName==='unchecked'){
          this.getMyVerifyActivity()
        }
        else if(this.activeName==='checked'){
          this.getAllActivity()
        }
        else if(this.activeName==='myApplication'){
          this.getMyActivityData()
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
      getMyVerifyActivity(){
        let token = Cookies.get('authorization')
        activityAPI.getVerifyActivity(`${key} ${token}`)
          .then(res=>{
            if(res.data.status === 200) {
              this.myVerifyActivity = res.data.activityData
              if( res.data.activityData && res.data.activityData.length ===0){
                this.isMyVerifyActivity = false
              }else {
                this.isMyVerifyActivity = true
              }
            }else {
              this.isMyVerifyActivity = false
            }
          })
      },
      getAllActivity(){
        activityAPI.getAllActivity()
          .then(res=>{
            if(res.data.status === 200) {
              this.allActivity = res.data.activityData
              if( res.data.activityData && res.data.activityData.length ===0){
                this.isAllActivity = false
              }else {
                this.isAllActivity = true
              }
            }else {
              this.isAllActivity = false
            }
          })
      },
      getMyActivityData(){
        activityAPI.getMyActivity(this.$store.state.token)
          .then(res=>{
            if(res.data.status === 200) {
              this.myActivity = res.data.activityData
              if( res.data.activityData && res.data.activityData.length ===0){
                this.isMyActivity = false
              }else {
                this.isMyActivity = true
              }
            }else {
              this.isMyActivity = false
            }
          })
      },
      onChange(date, dateString) {
        this.time = dateString;
      },
      showAddActivityDialog () {
        this.openAddActivity = true
      },
      closeAddActivityDialog () {
        this.openAddActivity = false
        this.theme =''
        this.address =''
        this.content =''
        this.charge =''
        this.time =''
      },
      sendAddActivityData () {
        const newActivityData = {
          theme :this.theme,
          address :this.address,
          content :this.content,
          charge :Number(this.charge),
          time :this.time
        }
        let result = validate.validateNewActivity(newActivityData)

        if(result.condition){
          activityAPI.increaseActivity(this.$store.state.token,newActivityData)
          .then(res =>{
            if(res.data.status===200){
              this.$toast.success(res.data.msg)
              this.$socket.emit('successActivity', {
                id:this.$store.state.id,
                name:this.$store.state.name,
                position:this.$store.state.position,
                departments:this.$store.state.department
              })
              this.closeAddActivityDialog()
              this.getMyActivityData()
            }
          })
        }else {
          this.$toast.error(result.errors.message)
        }
      },
      showVerifyWindow (data){
        this.isVerify =true
        this.activityId =data
        // activityAPI.verifyActivity(this.$store.state.token,)
      },
      verifyActivityConfirm(){
        activityAPI.verifyActivity(this.$store.state.token, {id :this.activityId,situation: 1})
        .then(res =>{
          if(res.data.status === 200){
            this.$toast.success(res.data.msg)
            this.isVerify =false
            this.getMyVerifyActivity()
          }else {
            this.$toast.error(res.data.msg)
          }
        })
        .catch(error => console.log(error.message))
      },
      verifyActivityCancel(){
        activityAPI.verifyActivity(this.$store.state.token,{id :this.activityId,situation: 2})
          .then(res =>{
            if(res.data.status === 200){
              this.$toast.warning(res.data.msg)
              this.isVerify =false
              this.getMyVerifyActivity()
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
