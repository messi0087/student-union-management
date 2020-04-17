<template>
  <div class="index">
    <header>
      <h1 class="head-font">我</h1>
      <button  @click="clickButton(123)">点我 </button>
    </header>
    <main>
    </main>
  </div>
</template>

<script>
  export default {
    name: 'my-news',
    sockets: {
      connect: function () {
        console.log('socket connected')
      },
      aaa:function (data) {
    console.log('socket connected',data)
  },
      },
    data() {
      return {
      }
    },
    methods: {
      clickButton: function (data) {
        // $socket is socket.io-client instance
        this.$socket.emit('aaa', data)
      }
    }
  }
</script>

<style scoped>
</style>
