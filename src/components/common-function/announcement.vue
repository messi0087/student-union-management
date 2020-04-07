<template>
  <div class="index-announcement">
    <div class="main-body">
      <img src="../../assets/imgs/通知广播.png" class="head-img"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: "announcement"
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
    background-color: #3498db;
    width: 90vw;
    height: 65vh;
  }

  .head-img{
    height: 50px;
    width:58px;
    position: relative;
    bottom: 35px;
    transform:rotate(-5deg)
  }
</style>
