<template>
    <li :key="item.id" @click='$emit("playMusic",item.id)'>
        <div class="left">
            <div>{{item.name}}</div>
            <p>
                <span></span>
                {{item.artists[0].name}}-{{item.album.name}}
            </p>
        </div>
        <div class="right">
            <span></span>
        </div>
    </li>
</template>
<script>
    export default {
        props:[
            'item'
        ]
    }
</script>
<style lang='less' scoped>
    li{
        display: flex;
        margin-top: 10px;
        padding-left: 10px;
        div.left{
            flex: 1;
            text-align: left;
            border-bottom: 1px solid #ddd;
            span{
                display: inline-block;
                    width: 12px;
                    height: 8px;
                    margin-right: 4px;
                    background-image: url("../assets/05.png");
                    background-position: 0px 0px;
                    background-size: 166px 97px;
                    background-repeat: no-repeat;
            }
            div{
                font-size: 17px;
                color: black;
            }
            p{
                font-size: 12px;
                color: #888;
                padding: 5px 0px;
            }
        }
        div.right{
            border-bottom: 1px solid #ddd;
            padding:0px 5px;
            display: flex;
            align-items: center;
            span{
              display: inline-block;
              width:22px;
              height:22px;
              background-image: url("../assets/05.png");
              background-position: -24px 0px;
              background-size: 166px 97px;
        }
    }
}
</style>