<template>
    <div class="index">
        <header>
            <h1 class="head-font">我的学生会</h1>
        </header>
        <main>
                <mu-bottom-nav :value.sync="shift" class="top-nav">
                    <mu-bottom-nav-item :value='loginUrl' title="登录" icon="account_circle" :to="loginUrl"/>
                    <mu-bottom-nav-item :value='registerUrl' title="注册" icon="books" :to="registerUrl"/>
                </mu-bottom-nav>
        </main>

        <transition :name="direction">
            <router-view @changeURl="changeUrlPath"/>
        </transition>
        <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    </div>
</template>

<script>
    export default {
        name: 'login-register',
        data() {
            return {
                loginUrl: '/',
                registerUrl: '/register',
                shift: '/',
                direction:'slide-right'
            }
        },
        methods: {
            changeUrlPath(){
                this.shift='/'
            }
        }
    }
</script>

<style scoped>
    .index {
        width: 100vw;
        height: 100vh;
        background: url("../assets/imgs/bg4.png") no-repeat fixed;
        background-size: 100% 100%;
        overflow: auto;
    }

    .head-font {
        font-family: Tahoma;
        text-align: center;
        margin: 10vh 0 5vh 0;
    }

    .top-nav {
        width: 70vw;
        opacity: 0.8;
        background-color: rgba(0, 0, 0, 0);
    }
</style>
