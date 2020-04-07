<template>
    <div class="head">
      <slot>
        <span>我的信息</span>
      </slot>
    </div>
</template>

<script>
  export default {
    name: "top-message"
  }
</script>

<style scoped>
  .head{
    height: 7vh;
    width: 100vw;
    background-color: #2196f3 ;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .head>span{
    color: #f8f8f8;
    font-size: 22px;
    font-weight: 500;
  }
</style>
