<template>
    <ul class="suggests">
        <span>搜索:{{keywords}}</span>
        <li v-for="s in suggests" :key="s.id" @click="$emit('searchResult',s.name)">
            <i></i>
            <span>{{s|filtType}}{{s.name}}</span>
        </li>
    </ul>
</template>

<script>
    export default {
        props:{
            suggests:{
                type:Array,
                default:function(){
                    return [];
                }
            },
            keywords:String
        },
        filters:{
            filtType(v){
                if(typeof v.artists !='undefined'){
                    return '歌曲:'
                }else if(typeof v.artist !='undefined'){
                    return '专辑:'
                }else{
                    return '歌手:'
                }
            }
        }
    }
</script>
<style lang="less" scoped>
    .suggests{
        span{
            display: inline-block;
            width: 100%;
            text-align: left;
            padding-left: 15px;
        }
        li{
            // text-align: left;
            // padding-left: 15px;
            display: flex;
            -webkit-box-align: center;
            align-items: center;
            height: 45px;
            padding-left: 10px;
            i{
                -webkit-box-flex: 0;
                flex: 0 0 auto;
                margin-right: 7px;
                width: 15px;
                height: 15px;
                background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAzMCAzMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjguMTgxIDI3LjUzNWwtMS40MTQgMS40MTQtNy43NTUtNy43NTRBMTEuNDQ1IDExLjQ0NSAwIDAgMSAxMS41IDI0QzUuMTQ5IDI0IDAgMTguODUyIDAgMTIuNSAwIDYuMTQ5IDUuMTQ5IDEgMTEuNSAxIDE3Ljg1MiAxIDIzIDYuMTQ5IDIzIDEyLjVjMCAyLjc1Ni0uOTczIDUuMjg1LTIuNTg5IDcuMjY2bDcuNzcgNy43Njl6TTExLjUgM2E5LjUgOS41IDAgMSAwIDAgMTkgOS41IDkuNSAwIDAgMCAwLTE5eiIgb3BhY2l0eT0iLjMiLz48L3N2Zz4=);
                display: inline-block;
                vertical-align: middle;
                background-position: 0 0;
                background-size: contain;
                background-repeat: no-repeat;
            }
            span{
                display: inline-block;
                -webkit-box-flex: 1;
                flex: 1;
                width: 1%;
                padding-right: 10px;
                font-size: 15px;
                line-height: 45px;
                color: #333;
                position: relative;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-break: normal;
                &::after{
                    border-bottom-width: 1px;
                    position: absolute;
                    z-index: 2;
                    content: "";
                    top: 0;
                    left: 0;
                    pointer-events: none;
                    box-sizing: border-box;
                    transform-origin: top left;
                    border: 0 solid rgba(0,0,0,.1);
                }
            }
        }
    }
</style>