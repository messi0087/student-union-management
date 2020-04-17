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
      <div class="context-midContext-hr"/>
      <template v-if="reviewer">
        <p>审核人：{{reviewer}}{{reviewerPosition}} — 发起部门：{{reviewerDepartment}}</p>
        <div class="context-midContext-hr"/>
      </template>
    </div>
    <div class="context-bottomContext">
      <div class="context-bottomContext-charge">
        <svg t="1586582982030" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="8034" width="20" height="20"><path d="M387.016962 261.154905l242.128573 0c74.925457 0 132.079154-162.481581 132.079154-162.481581 0-48.660256-4.871961-85.47472-88.069825-88.068801-83.172281-2.619664-103.098099 58.158584-162.871461 58.158584-61.266365 0-91.911316-47.780213-167.301354-58.158584-75.365478-10.426467-88.044242 39.408545-88.044242 88.068801C254.937808 98.674347 312.066947 261.154905 387.016962 261.154905zM642.362558 311.381843l-255.345596 0c-282.762015 0-352.203574 555.509956-352.203574 555.509956 0 72.966848 59.137889 146.252968 132.079154 146.252968l695.569876 0c72.942289 0 132.078131-73.28612 132.078131-146.252968C994.541573 866.892823 925.076478 311.381843 642.362558 311.381843zM671.344636 738.312352c17.036002 0 30.842449 13.829983 30.842449 30.867008 0 17.034978-13.805424 30.864962-30.842449 30.864962l-125.201513 0 0 80.97115c0 17.034978-13.805424 30.867008-30.816866 30.867008-17.036002 0-30.840402-13.83203-30.840402-30.867008L484.485855 800.044322l-126.009925 0c-17.034978 0-30.840402-13.829983-30.840402-30.864962 0-17.037025 13.805424-30.867008 30.840402-30.867008l126.009925 0 0-39.161928-126.009925 0c-17.034978 0-30.840402-13.806447-30.840402-30.842449 0-17.036002 13.805424-30.890544 30.840402-30.890544l85.181031 0-87.212294-154.989957c-8.518001-14.784728-3.451612-33.631982 11.283997-42.148959 14.759145-8.519024 33.607422-3.476171 42.125423 11.258415l105.007589 185.880501 5.310959 0 105.007589-185.880501c8.516977-14.734586 27.365254-19.778462 42.100864-11.258415 14.760169 8.516977 19.827581 27.364231 11.308557 42.148959l-87.212294 154.989957 79.967286 0c17.036002 0 30.842449 13.853519 30.842449 30.890544 0 17.034978-13.805424 30.842449-30.842449 30.842449l-125.201513 0 0 39.161928L671.344636 738.312352z" p-id="8035" fill="#ff7675"></path></svg>
        <span>{{charge}}元</span>
      </div>
      <div class="context-bottomContext-place">
        <svg t="1586583368488" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2153" width="20" height="20"><path d="M328.704 466.944c6.144 9.216 31.744 48.128 160.768 232.448l1.024 1.024c7.168 9.216 19.456 15.36 30.72 15.36 12.288 0 24.576-6.144 30.72-16.384 55.296-79.872 159.744-230.4 163.84-235.52l1.024-1.024c21.504-35.84 33.792-77.824 33.792-119.808 0-125.952-102.4-229.376-229.376-229.376s-229.376 102.4-229.376 229.376C291.84 387.072 304.128 429.056 328.704 466.944L328.704 466.944zM520.192 172.032c94.208 0 171.008 76.8 171.008 171.008 0 30.72-8.192 60.416-24.576 89.088-6.144 9.216-90.112 130.048-145.408 209.92-43.008-61.44-136.192-195.584-145.408-207.872C358.4 407.552 348.16 375.808 348.16 344.064 349.184 249.856 425.984 172.032 520.192 172.032zM520.192 471.04c69.632 0 126.976-57.344 126.976-126.976s-57.344-126.976-126.976-126.976c-69.632 0-126.976 57.344-126.976 126.976S449.536 471.04 520.192 471.04zM520.192 274.432c37.888 0 68.608 30.72 68.608 68.608 0 38.912-30.72 68.608-68.608 68.608-37.888 0-68.608-30.72-68.608-68.608S482.304 274.432 520.192 274.432zM1006.592 769.024 864.256 493.568 746.496 493.568l-46.08 59.392 128 0 130.048 248.832 2.048 2.048c7.168 9.216 7.168 21.504 2.048 31.744-5.12 10.24-15.36 16.384-27.648 16.384L90.112 851.968c-12.288 0-22.528-6.144-27.648-16.384-5.12-11.264-4.096-22.528 3.072-32.768l1.024-1.024L194.56 551.936l145.408 0-48.128-59.392-133.12 0-142.336 276.48c-19.456 27.648-21.504 62.464-6.144 91.136 16.384 30.72 46.08 49.152 80.896 49.152l844.8 0c33.792 0 64.512-18.432 79.872-49.152C1029.12 830.464 1026.048 795.648 1006.592 769.024z" p-id="2154" fill="#7a5cea"></path></svg>
        <span>{{place}}</span>
      </div>
      <div class="context-bottomContext-time">
        <svg t="1586583682988" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4126" width="20" height="20"><path d="M502.897778 75.093333C257.137778 75.093333 59.164444 273.066667 59.164444 518.826667s200.248889 443.733333 443.733334 443.733333c245.76 0 443.733333-197.973333 443.733333-443.733333S746.382222 75.093333 502.897778 75.093333z m288.995555 577.991111c-6.826667 13.653333-18.204444 20.48-31.857777 20.48-4.551111 0-9.102222 0-13.653334-2.275555l-261.688889-118.328889c-11.377778-4.551111-20.48-18.204444-20.48-31.857778V275.342222c0-18.204444 15.928889-34.133333 34.133334-34.133333s34.133333 15.928889 34.133333 34.133333V500.622222L773.688889 609.848889c18.204444 6.826667 25.031111 25.031111 18.204444 43.235555z" fill="#26de81" p-id="4127"></path></svg>
        <span>{{time}}</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "specific-item-bill",
    props: {
      title: String,
      time: String,
      place: String,
      charge: String,
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
    color: #2f3640;
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

  .context-midContext>p{
    margin: 5px 0;
    padding: 0;
    color: #333333;
    font-size: 15px;
    font-weight: 600;
  }

  .context-midContext>span{
    display: block;
    color: rgb(188, 189, 191);
    font-size: 15px;
    margin: 2px 0;
  }

  .context-bottomContext>div{
    display: flex;
    margin: 8px 15px;
  }

  .context-bottomContext-charge>span{
    color:#ff7675;
  }

  .context-bottomContext-place>span{
    color:#7a5cea;
  }

  .context-bottomContext-time>span{
    color:#26de81;
  }
</style>
