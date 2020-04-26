<template>
  <div class="index-tree">
    <main class="main-tree">
        <a-tree
                showLine
                showIcon
                @select="onSelect"
                :treeData="bookData"
                :selectedKeys="selectedKeys"
                :expandedKeys="expandedKeys"
                @expand="onExpand"
        >
          <a-icon type="down" slot="switcherIcon" />
        </a-tree>

      <!--部门介绍-->
      <mu-dialog
              :esc-press-close="false"
              :overlay-close="false"
              :open.sync="openDepartment">
        <a-card title="详情">
          <img
                  alt="example"
                  src="../../assets/imgs/department-bg.jpg"
                  slot="cover"
          />
          <a-card-meta :title="departmentTitle" :description="departmentDescription">
            <a-avatar
                    slot="avatar"
                    src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3055065496,1440710214&fm=26&gp=0.jpg"
            />
          </a-card-meta>
        </a-card>
        <mu-button slot="actions" flat color="primary" @click="closeDepartment()">关闭</mu-button>
      </mu-dialog>

      <!--人介绍-->
      <mu-dialog
              :esc-press-close="false"
              :overlay-close="false"
              :open.sync="openCard">
        <a-card title="详情">
          <img
                  alt="example"
                  src="../../assets/imgs/card-bg.jpg"
                  slot="cover"
          />
          <template class="ant-card-actions" slot="actions">
            <a-icon type="team" key="team" @click="onConnection()"/>
            <a :href='phone'>  <a-icon type="phone"  key="phone"/></a>
          </template>
          <a-card-meta :title="cardTitle" :description="cardDescription">
            <a-avatar
                    slot="avatar"
                    src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1388087996,660099936&fm=26&gp=0.jpg"
            />
          </a-card-meta>
        </a-card>
        <mu-button slot="actions" flat color="primary" @click="closeCard()">关闭</mu-button>
      </mu-dialog>
    </main>
  </div>
</template>

<script>
  import Vue from 'vue'
  import {Button, Input, Tree, Icon, Tooltip, Card, message, Avatar} from 'ant-design-vue'
  import * as userAPI from '../../api/user'
  import * as getData from '../../utils/get-position'
  import Toast from 'muse-ui-toast';


  Vue.use(Button).use(message).use(Avatar).use(Input).use(Tree).use(Icon).use(Tooltip)
    .use(Card).use(Toast);
  Vue.config.productionTip = false

  export default {
    name: 'my-news',
    data() {
      return {
        bookData:[],
        selectedKeys:[],
        expandedKeys:[],
        openCard:false,
        openDepartment:false,
        cardTitle:'',
        cardDescription:'',
        departmentTitle:'',
        departmentDescription:'',
        cardPhoneNumber:'',
        phone:'',
        cardData:{},
      }
    },
    beforeMount(){
      userAPI.getAddressBook()
      .then(res=>{
        this.bookData = this.updateTreeData(res.data.bookData)
      })
      .catch(error=>console.log(error.message))
    },
    methods: {
      onSelect(keys) {
        let cardData = this.getKeyData(this.bookData,keys[0])
        this.cardData = cardData
        let condition = this.verifyData(cardData.title)
        //具体的人
        if(condition === -1 ) {
          this.selectedKeys = keys;
          this.cardTitle = cardData.title
          this.cardDescription = cardData.departments
          this.phone = 'tel:' + cardData.phone
          // console.log('Trigger Select' + keys[0].length);
          this.openCard=true
        }
        //部门
        else if(condition !== -1){
          this.selectedKeys = keys;
          this.departmentTitle = cardData.title
          this.departmentDescription = cardData.departmentDescription
          // console.log('Trigger Select' + keys[0].length, keys, event);
          this.openDepartment=true
        }
      },
      // 查询数据
      getKeyData (data, key) {
        let items = {}
        for (let item of data) {
          if (item.key === key) {
            Object.assign(items, item)
          }
          if (item.children && item.children.length !== 0) {
            Object.assign(items, this.getKeyData(item.children, key))
          }
        }
        return items
      },
      closeCard(){
        this.selectedKeys=[]
        this.openCard=false
      },
      closeDepartment(){
        this.selectedKeys=[]
        this.openDepartment=false
      },
      //更新数据
      updateTreeData (treeData, key = '0') {
        return treeData.map((item, index) => {
          item.key = key + '-' + index
          this.expandedKeys.push(item.key)
          if(!item.title) {
            item.title = `${item.name}${getData.getPosition(item.position)}`
          }
          if (item.children && item.children.length) {
            item.children = this.updateTreeData(item.children, item.key)
          }
          return item
        })
      },
      //验证部门和人
      verifyData(data){
        let department =['主席团', '老师', '文体中心','学办中心','团学中心', '新闻中心','科创中心',
            '办公室','外联部','体育部','文艺部','组织部','青年志愿者协会','宣传部','记者部','科竞部','创业部']
        return  department.findIndex(item => item === data)
      },
      onExpand (expandedKeys) {
        this.expandedKeys = expandedKeys
      },
      onConnection(){
        if(this.cardData.id !==this.$store.state.id) {
          this.$router.push({
            path: '/singleChat',
            query: {
              name: this.cardData.name,
              id: this.cardData.id
            }
          })
        }else {
          this.$toast.error('不能选择自己进行通信，请选择其他用户')
        }
      }
    }
  }
</script>

<style scoped>
  .index-tree::-webkit-scrollbar {
    display: none;
  }

  .index-tree{
    height: 85vh;
    overflow: scroll;
    background: url("../../assets/imgs/addressBook-bg.jpg")  no-repeat ;
    background-size:420px 620px;
  }

  .main-tree{
    position:relative ;
    left: 5vw;
  }

</style>
