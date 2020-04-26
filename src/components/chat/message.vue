<template>
  <div>
    <div class="message-index" v-if="situation === 1">
      <div class="left">
      <p>{{content}}</p>
    </div>
      <div>
      <span class="time">{{time}}</span>
    </div>
  </div>
    <div class="message-index-right" v-else>
      <div class="right">
      <p>{{content}}</p>
    </div>
    <div>
      <span class="time">{{time}}</span>
    </div>
  </div>
  </div>
</template>

<script>
  export default {
    name: "message",
    props: {
      content: String,
      situation:Number,
      time: String
    }
  }
</script>

<style scoped lang="scss">
  .message-index {
    width: 100vw;
    border-bottom: 1px solid #ffffff;
    display: flex;
    align-items: center;

    .left{
      max-width: 60vw;
      background-color: #b49bf0;
      border-radius: 100px 100px 100px 0; /* 顺时针 上左右 下右左*/
      margin: 10px 0 10px 20px;
      box-shadow: 0 0 10px #cecece;
    }

    .left>p{
      word-wrap:break-word;
      padding: 0;
      color: #ffffff;
      font-size: 16px;
      font-weight: 400;
      margin: 5px 25px;
    }

    .time{
      font-weight: 500;
      font-size: 17px;
      color: #2c3e50;
      margin-left: 15px;
    }
  }

  .message-index-right {
    width: 100vw;
    border-bottom: 1px solid #ffffff;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: row-reverse;

    .right{
      max-width: 60vw;
      background-color: #49325e;
      border-radius: 100px 100px 0 100px; /* 顺时针 上左右 下右左*/
      margin: 10px 20px 10px 0;
      box-shadow: 0 0 10px #cecece;
    }

    .right>p{
      word-wrap:break-word;
      padding: 0;
      color: #ffffff;
      font-size: 16px;
      font-weight: 400;
      margin: 5px 25px;
    }

    .time{
      font-weight: 500;
      font-size: 17px;
      color: #2c3e50;
      margin-right: 15px;
    }
  }
</style>
