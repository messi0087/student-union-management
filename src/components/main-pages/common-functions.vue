<template>
  <div class="index-commonFunction">
    <header class="header">
      <mu-bottom-nav @change="changeFunction" :value.sync="defaultValue" class="top-navigation">
        <mu-bottom-nav-item title="会议申请" icon="contacts" value="meetingRequest"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="账单审核" icon="credit_card" value="billReview"></mu-bottom-nav-item>
        <mu-bottom-nav-item title="公告" icon="notifications" value="announcement"></mu-bottom-nav-item>
      </mu-bottom-nav>
    </header>
    <main>
      <meeting-request v-if="functionShow === 0"/>
      <bill-review  v-else-if="functionShow === 1"/>
      <announcement v-else-if="functionShow === 2"/>
    </main>
  </div>
</template>

<script>
  import announcement from '../common-function/announcement'
  import billReview from '../common-function/bill-review'
  import meetingRequest from '../common-function/meeting-request'
  export default {
    name: 'my-news',
    components: {announcement, billReview, meetingRequest},
    data() {
      return {
        functionShow: 0,
        defaultValue:'meetingRequest'
      }
    },
    methods: {
      changeFunction(value){
        switch (value) {
          case 'meetingRequest':
            this.functionShow = 0;
            break;
          case 'billReview':
            this.functionShow = 1;
            break;
          case 'announcement':
            this.functionShow = 2;
            break;
        }
      }
    }
  }
</script>

<style scoped>

  .header{
    border-bottom: 1px solid #cecece;
  }

</style>
