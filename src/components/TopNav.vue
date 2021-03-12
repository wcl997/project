<template>
    <ul class="topnav">
        <li><router-link tag="a" to="/">推荐音乐</router-link></li>
        <li><router-link tag="a" to="/hot">热歌榜</router-link></li>
        <li><router-link tag="a" to="/search">搜索</router-link></li>
    </ul>
</template>

<script>
    export default {

    }
</script>
<style lang='less' scoped>
    .topnav{
        display: flex;
        // position: fixed;
        border-bottom: 1px solid #ddd;
        li{
            line-height: 40px;
            flex: 1 1 auto;
            font-size: 15px;
            a{
                -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
                -webkit-user-select: none;
                -moz-user-focus: none;
                -moz-user-select: none;
                display: inline-block;
                text-decoration: none;
                color: #000;
                &.router-link-exact-active{
                    color: red;
                    border-bottom: 2px solid red;
                }
            }
            
        }
    }
</style>