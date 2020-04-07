<template>
  <div class="index-tree">
    <main class="main-tree">
        <a-tree
                @select="onSelect"
                :treeData="bookData"
                :selectedKeys="selectedKeys"
        />

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
            <a-icon type="team" key="team"/>
            <a href="tel:13764567708">  <a-icon type="phone"  key="phone"/></a>
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
  Vue.use(Button).use(message).use(Avatar).use(Input).use(Tree).use(Icon).use(Tooltip)
    .use(Card)
  Vue.config.productionTip = false

  const bookData = [
    {
      title: '主席团',
      key: '0-0',
      children: [
        {
          title: '陈学冬主席',
          key: '0-0-0',
        },
        {
          title: '马学东副主席',
          key: '0-0-1',
        },
        {
          title: '袁雪飞主任',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '老师',
      key: '0-1',
      children: [
        {
          title: '何老师',
          key: '0-1-0',
        },
        {
          title: '李老师',
          key: '0-1-1',
        },
      ],
    },
    {
      title: '体育部',
      key: '0-2',
      children: [
        {
          title: '陈丹丹部长',
          key: '0-2-0',
        },
        {
          title: '马学坤副部长',
          key: '0-2-1',
        },
        {
          title: '李丹丹干事',
          key: '0-2-2',
        },
      ],
    },
    {
      title: '文艺部',
      key: '0-3',
      children: [
        {
          title: '陈丹丹部长',
          key: '0-3-0',
        },
      ],
    },
    {
      title: '记者部',
      key: '0-4',
      children: [
        {
          title: '陈丹丹部长',
          key: '0-4-0',
        },
      ],
    },
    {
      title: '科竞部',
      key: '0-5',
      children: [
        {
          title: '陈丹丹部长',
          key: '0-5-0',
        },
      ],
    },
    {
      title: '办公室',
      key: '0-6',
      children: [
        {
          title: '陈丹丹部长',
          key: '0-6-0',
        },
      ],
    },
  ];
  export default {
    name: 'my-news',
    data() {
      return {
        bookData,
        selectedKeys:[],
        openCard:false,
        openDepartment:false,
        cardTitle:'',
        cardDescription:'',
        departmentTitle:'',
        departmentDescription:'',
        cardPhoneNumber:'',
      }
    },
    methods: {
      onSelect(keys) {

        //具体的人
        if(keys[0] && keys[0].length>3) {
          this.selectedKeys = keys;
          let cardData = this.getKeyData(bookData,keys[0])
          this.cardTitle = cardData.title
          this.cardDescription = cardData.title
          // console.log('Trigger Select' + keys[0].length);
          this.openCard=true
        }
        //部门
        else if(keys[0] && keys[0].length<=3){
          this.selectedKeys = keys;
          let departmentData = this.getKeyData(bookData,keys[0])
          this.departmentTitle = departmentData.title
          this.departmentDescription = departmentData.title
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
      }
    }
  }
</script>

<style scoped>
  .index-tree{
    height: 85vh;
    overflow: scroll;
    overflow-x: hidden;
    background: url("../../assets/imgs/addressBook-bg.jpg")  repeat ;
  }
  .main-tree{
    position:relative ;
    left: 5vw;
  }

</style>
