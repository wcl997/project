<template>
<ul class="hotList">
    <router-link v-for="(item,s) in hotList" :key="item.id" to="/" tag="li">
        <div :class="[{updateColor:s<3},'rank']">{{s+1|add}}</div>
        <div class="left">
            <div>{{item.name}}</div>
            <p><i :class="{sghot:hotsq[s]>320000}"></i>{{item.ar[0].name}}-{{item.name}}</p>
        </div>
        <div class="right">
            <span></span>
        </div>
    </router-link>
</ul>
</template>

<script>
    export default {
        name:'HotMusicItem',
        props:{
            hotList:Array,
            hotsq:Array
        },
        filters:{
            add(value){
                return value = value < 10? "0"+value:value;
            }
        }
    }
</script>
<style lang='less' scoped>
    
    .hotList{
        .rank{
            font-size: 17px;
            text-align: center;
            line-height: 48px;
            margin-left: 5px;
            flex: 1;
        }
        .updateColor{
            color: red;
        }
        li{
            display: flex;
            margin-top: 10px;
            div.left{
                flex: 10;
                padding-left: 10px;
                text-align: left;
                border-bottom: 1px solid #ddd;
                div{
                    font-size: 17px;
                    color: black;
                }
                p{
                    font-size: 12px;
                    color: #888;
                    padding: 5px 5px;
                }
                i.sghot{
                    display: inline-block;
                    width: 12px;
                    height: 8px;
                    margin-right: 4px;
                    background-image: url("../assets/05.png");
                    background-position: 0px 0px;
                    background-size: 166px 97px;
                    background-repeat: no-repeat;
                }
            }
            div.right{
                border-bottom: 1px solid #ddd;
                padding: 0px 5px;
                display: flex;
                align-items: center;
                span{
                    display: inline-block;
                    width: 22px;
                    height: 22px;
                    background-image: url("../assets/05.png");
                    background-position: -24px 0px;
                    background-size: 166px 97px;
                    background-repeat: no-repeat;
                }
            }
        }
    }
</style>
