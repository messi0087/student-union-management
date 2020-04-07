<template>
  <div class="index">
    <header>
      <top-message>
        <span>聊天窗口</span>
      </top-message>
    </header>

    <main>
      <message  v-for="(item,index) in data" :key="index"/>
    </main>

    <footer>
      <div class="send-others">
        <mu-icon value="home" class="icon" />
        <mu-icon value="images" class="icon"/>
      </div>
      <mu-text-field
              v-model="textValue"
              placeholder="请输入"
              multi-line :rows="2" :rows-max="2"
              class="text-input"
      />
      <div class="send-button">
        <mu-icon value="send" class="icon"/>
      </div>

    </footer>
  </div>
</template>

<script>
  import topMessage from '../components/top-message'
  import message from '../components/chat/message'

  export default {
    name: "single-chat",
    components: {
      topMessage,
      message
    },
    data() {
      return {
        textValue: '',
        data:[1,2,3,4,5,6,7,8,9]
      }
    }
  }
</script>

<style scoped>
  .index {
    height: 100vh;
    width: 100vw;
  }

  footer{
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    height: 10vh;
    width: 100vw;
    background-color: aliceblue;
  }

  .text-input {
    flex: 4;
    margin: 0;
  }
  main{
    background-color: #ececec;
    width: 100vw;
    height: 83vh;
    overflow: scroll;
    overflow-x: hidden;
  }

  .send-others{
    flex: 2;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    color: #29bdd9;

  }

  .send-button{
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #29bdd9;
  }

  .icon:active{
    opacity: 0.5;
  }

  .icon:active{
    opacity: 0.5;
  }
</style>
