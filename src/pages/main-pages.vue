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
        <mu-bottom-nav-item :value='myNewsUrl' title="我的消息" icon="message" :to="myNewsUrl"/>
        <mu-bottom-nav-item :value='addressBookUrl' title="通讯录" icon="contact_phone" :to="addressBookUrl"/>
        <mu-bottom-nav-item :value='commonFunctionsUrl' title="常用功能" icon="apps" :to="commonFunctionsUrl"/>
        <mu-bottom-nav-item :value='myInformationUrl' title="我的信息" icon="account_circle" :to="myInformationUrl"/>
      </mu-bottom-nav>
    </footer>
  </div>
</template>

<script>
  import topMessage from '../components/top-message'
  export default {
    name: "main-pages",
    data() {
      return {
        direction: 'slide-right',
        shift: this.$route.path,
        myNewsUrl: '/mainPages/myNews',
        addressBookUrl: '/mainPages/addressBook',
        commonFunctionsUrl: '/mainPages/commonFunctions',
        myInformationUrl: '/mainPages/myInformation',
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
