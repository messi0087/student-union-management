<template>
  <div class="single-context">
    <div class="context-title">
      <span class="context-title-first">{{title}}</span>
      <span class="context-title-last">
              {{situation}}
              <svg t="1586584664699" class="icon context-title-last-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5148" width="20" height="20"><path d="M613.504 512L274.752 173.248l90.496-90.496L794.496 512l-429.248 429.248-90.496-90.496z" p-id="5149" fill="#f97243"></path></svg>            </span>
    </div>
    <div class="context-hr"/>
    <div class="context-midContext">
      <p>发起人：{{Originator}}{{OriginatorPosition}} — 发起部门：{{originatorDepartment}}</p>
      <span>{{context}}</span>
      <template v-if="reviewer">
        <p>审核人：{{reviewer}}{{reviewerPosition}} — 发起部门：{{reviewerDepartment}}</p>
        <div class="context-midContext-hr"/>
      </template>
    </div>
    <div class="context-bottomContext">
      <div class="context-bottomContext-place">
        <svg t="1586583368488" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2153" width="20" height="20"><path d="M328.704 466.944c6.144 9.216 31.744 48.128 160.768 232.448l1.024 1.024c7.168 9.216 19.456 15.36 30.72 15.36 12.288 0 24.576-6.144 30.72-16.384 55.296-79.872 159.744-230.4 163.84-235.52l1.024-1.024c21.504-35.84 33.792-77.824 33.792-119.808 0-125.952-102.4-229.376-229.376-229.376s-229.376 102.4-229.376 229.376C291.84 387.072 304.128 429.056 328.704 466.944L328.704 466.944zM520.192 172.032c94.208 0 171.008 76.8 171.008 171.008 0 30.72-8.192 60.416-24.576 89.088-6.144 9.216-90.112 130.048-145.408 209.92-43.008-61.44-136.192-195.584-145.408-207.872C358.4 407.552 348.16 375.808 348.16 344.064 349.184 249.856 425.984 172.032 520.192 172.032zM520.192 471.04c69.632 0 126.976-57.344 126.976-126.976s-57.344-126.976-126.976-126.976c-69.632 0-126.976 57.344-126.976 126.976S449.536 471.04 520.192 471.04zM520.192 274.432c37.888 0 68.608 30.72 68.608 68.608 0 38.912-30.72 68.608-68.608 68.608-37.888 0-68.608-30.72-68.608-68.608S482.304 274.432 520.192 274.432zM1006.592 769.024 864.256 493.568 746.496 493.568l-46.08 59.392 128 0 130.048 248.832 2.048 2.048c7.168 9.216 7.168 21.504 2.048 31.744-5.12 10.24-15.36 16.384-27.648 16.384L90.112 851.968c-12.288 0-22.528-6.144-27.648-16.384-5.12-11.264-4.096-22.528 3.072-32.768l1.024-1.024L194.56 551.936l145.408 0-48.128-59.392-133.12 0-142.336 276.48c-19.456 27.648-21.504 62.464-6.144 91.136 16.384 30.72 46.08 49.152 80.896 49.152l844.8 0c33.792 0 64.512-18.432 79.872-49.152C1029.12 830.464 1026.048 795.648 1006.592 769.024z" p-id="2154" fill="#7a5cea"></path></svg>
        <span>{{place}}</span>
      </div>
      <div class="context-bottomContext-time">
        <svg t="1586583682988" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4126" width="20" height="20"><path d="M502.897778 75.093333C257.137778 75.093333 59.164444 273.066667 59.164444 518.826667s200.248889 443.733333 443.733334 443.733333c245.76 0 443.733333-197.973333 443.733333-443.733333S746.382222 75.093333 502.897778 75.093333z m288.995555 577.991111c-6.826667 13.653333-18.204444 20.48-31.857777 20.48-4.551111 0-9.102222 0-13.653334-2.275555l-261.688889-118.328889c-11.377778-4.551111-20.48-18.204444-20.48-31.857778V275.342222c0-18.204444 15.928889-34.133333 34.133334-34.133333s34.133333 15.928889 34.133333 34.133333V500.622222L773.688889 609.848889c18.204444 6.826667 25.031111 25.031111 18.204444 43.235555z" fill="#26de81" p-id="4127"></path></svg>
        <span>{{startTime}}</span>
      </div>
      <div class="context-bottomContext-end-time">
        <svg t="1587051540453" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1681" width="20" height="20"><path d="M660.8 959.6c-31.7 0-62.4-6.2-91.4-18.4-28-11.8-53.1-28.8-74.7-50.3-21.6-21.6-38.5-46.7-50.3-74.7-12.3-29-18.4-59.7-18.4-91.4 0-31.7 6.2-62.4 18.4-91.4 11.8-28 28.8-53.1 50.3-74.7 21.6-21.6 46.7-38.5 74.7-50.3 29-12.3 59.7-18.4 91.4-18.4 31.7 0 62.4 6.2 91.4 18.4 28 11.8 53.1 28.8 74.7 50.3 21.6 21.6 38.5 46.7 50.3 74.7 12.3 29 18.4 59.7 18.4 91.4 0 31.7-6.2 62.4-18.4 91.4-11.8 28-28.8 53.1-50.3 74.7-21.6 21.6-46.7 38.5-74.7 50.3-29 12.1-59.8 18.4-91.4 18.4z m0-437.5c-54.1 0-105 21.1-143.3 59.3-38.3 38.2-59.3 89.2-59.3 143.3 0 54.1 21.1 105 59.3 143.3 38.2 38.3 89.2 59.3 143.3 59.3 54.1 0 105-21.1 143.3-59.3 38.3-38.2 59.3-89.1 59.3-143.3 0-54.2-21.1-105-59.3-143.3-38.3-38.3-89.2-59.3-143.3-59.3z m0 0" p-id="1682" fill="#2574a9"></path><path d="M739.9 757.3h-78.4c-8.9 0-16.1-7.2-16.1-16.1V596.3c0-8.9 7.2-16.1 16.1-16.1 8.9 0 16.1 7.2 16.1 16.1v128.8h62.3c8.9 0 16.1 7.2 16.1 16.1 0 9-7.2 16.1-16.1 16.1z m0 0" p-id="1683" fill="#2574a9"></path><path d="M175.8 145.8h7.2c2.8 0 5.5 1.4 7.1 3.7l64.7 94.1h0.7v-89.3c0-4.7 3.8-8.6 8.6-8.6h3c4.7 0 8.6 3.8 8.6 8.6v114.5c0 4.7-3.8 8.6-8.6 8.6h-6.5c-2.8 0-5.5-1.4-7.1-3.7L188 178.4h-0.7v90.4c0 4.7-3.8 8.6-8.6 8.6h-3c-4.7 0-8.6-3.8-8.6-8.6V154.4c0.1-4.7 4-8.6 8.7-8.6zM310.2 145.8h77.4c4.7 0 8.6 3.8 8.6 8.6 0 4.7-3.8 8.6-8.6 8.6h-57.3c-4.7 0-8.6 3.8-8.6 8.6v21.2c0 4.7 3.8 8.6 8.6 8.6h52.9c4.7 0 8.6 3.8 8.6 8.6 0 4.7-3.8 8.6-8.6 8.6h-52.9c-4.7 0-8.6 3.8-8.6 8.6v24.7c0 4.7 3.8 8.6 8.6 8.6h60.5c4.7 0 8.6 3.8 8.6 8.6 0 4.7-3.8 8.6-8.6 8.6h-80.5c-4.7 0-8.6-3.8-8.6-8.6V154.4c-0.1-4.7 3.7-8.6 8.5-8.6zM423.7 145.8c3.9 0 7.4 2.7 8.3 6.5l24 96h0.7l25.2-96.1c1-3.8 4.4-6.4 8.3-6.4h7.8c3.9 0 7.3 2.6 8.3 6.4l25.2 96.1h0.7l24-96c1-3.8 4.4-6.5 8.3-6.5h4.6c5.7 0 9.8 5.5 8.2 10.9l-33 114.5c-1.1 3.7-4.4 6.2-8.2 6.2h-8.3c-3.9 0-7.3-2.6-8.3-6.4l-25-95.2h-0.7l-25 95.2c-1 3.8-4.4 6.4-8.3 6.4H452c-3.8 0-7.2-2.5-8.2-6.2l-32.9-114.5c-1.6-5.5 2.5-10.9 8.2-10.9h4.6zM568.3 398.9h-400c-0.6 0-1.1-0.5-1.1-1.1v-9.5c0-0.6 0.5-1.1 1.1-1.1h400c0.6 0 1.1 0.5 1.1 1.1v9.5c0 0.6-0.5 1.1-1.1 1.1zM343.2 513.8H168.3c-0.6 0-1.1-0.5-1.1-1.1v-9.5c0-0.6 0.5-1.1 1.1-1.1h174.8c0.6 0 1.1 0.5 1.1 1.1v9.5c0.1 0.6-0.4 1.1-1 1.1zM343.2 628.7H168.3c-0.6 0-1.1-0.5-1.1-1.1v-9.5c0-0.6 0.5-1.1 1.1-1.1h174.8c0.6 0 1.1 0.5 1.1 1.1v9.5c0.1 0.7-0.4 1.1-1 1.1zM343.2 743.7H168.3c-0.6 0-1.1-0.5-1.1-1.1v-9.5c0-0.6 0.5-1.1 1.1-1.1h174.8c0.6 0 1.1 0.5 1.1 1.1v9.5c0.1 0.6-0.4 1.1-1 1.1z" p-id="1684" fill="#2574a9"></path><path d="M350.7 900.6c0-7-5.6-12.6-12.6-12.6H128.5c-18.2 0-33.1-13.7-33.1-30.6V122.7c0-16.9 14.8-30.6 33.1-30.6h488c18.2 0 33.1 13.7 33.1 30.6v297.9c0 7.5 6.1 13.6 13.6 13.6s13.6-6.1 13.6-13.6V122.7c0-30.8-27-55.9-60.3-55.9h-488c-33.2 0-60.3 25.1-60.3 55.9v734.6c0 30.8 27 55.9 60.3 55.9h209.6c6.9 0 12.6-5.7 12.6-12.6z" p-id="1685" fill="#2574a9"></path></svg>
        <span>{{endTime}}小时</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "specific-item-meeting",
    props: {
      title: String,
      startTime: String,
      endTime: String,
      place: String,
      context: String,
      situation:String,
      reviewer: String,
      reviewerPosition: String,
      reviewerDepartment: String,
      originatorDepartment: String,
      Originator: String,
      OriginatorPosition: String
    }
  }
</script>

<style scoped>
  .single-context{
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(255, 255, 255);
    width: 95vw;
    margin: 10px 0;
  }

  .context-title{
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 5px 0;
  }

  .context-title>span{
    display: block;
    font-weight: 500;
    font-size: 15px;
  }

  .context-midContext{
    width: 95%;
    min-height: 5vh;
    /*background-color: #f97243;*/
  }

  .context-bottomContext{
    width: 100%;
    min-height: 6vh;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    /*background-color: #d9c61a;*/
  }

  .context-bottomContext span{
    margin-left: 5px;
  }

  .context-title-last{
    color: #f97243;
    margin-right: 3%;
  }

  .context-title-last-icon{
    position: relative;
    top: 4px;
  }

  .context-title-first{
    color: rgba(133, 134, 136, 0.93);
    margin-left: 3%;
  }

  .context-hr{
    background-color: rgba(229, 230, 232, 0.6);
    height:2px;
    width: 94%;
  }

  .context-midContext-hr{
    background-color: rgba(229, 230, 232, 0.6);
    height:1px;
    width: 100%;
  }

  .context-midContext>span{
    display: block;
    color: rgb(133, 134, 136);
    font-size: 15px;
    margin: 2px 0;
  }

  .context-midContext>p{
    margin: 0;
    padding: 0;
    color: #333333;
    font-size: 15px;
    font-weight: 600;
  }

  .context-bottomContext>div{
    display: flex;
    margin: 8px 15px;
  }

  .context-bottomContext-place>span{
    color:#7a5cea;
  }

  .context-bottomContext-time>span{
    color:#26de81;
  }

  .context-bottomContext-end-time>span{
    color:#2574a9;
  }
</style>
