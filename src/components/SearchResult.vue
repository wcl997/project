<template>
<div>
    <!-- <div class="thebest">
        <div class="bestimg">
            <img src="" />
        </div>
        <div class="bestText">
            <h4>

                <p>
                    <span class="s1">
                        <span></span>
                        <span class="s12"></span>
                    </span>
                    <span class="s2">
                        <span></span>
                    </span>
                </p>
            </h4>
        </div>
    </div> -->
    <ul>
        <!-- <SearchMusicitem v-for=" s in searchMusicList" :key='s.id' :item='s'  @playMusic="$emit('playMusic',s.id)"/> -->
        <!-- <li>111</li> -->
        <ListenItem v-for="(sm,index) in searchMusicList" 
        :key="sm.id" 
        :item='sm'
        :index='index' 
        :list='searchMusicList'
        :currentstate='$root.playingMusic.musicID ==sm.id && $root.playingMusic.isPlay==true?true:false'
        ></ListenItem>
    </ul>
</div>
</template>
<script>
    // import SearchMusicitem from '../components/SearchMusicitem'
    import ListenItem from '../components/Listenitem'
    export default {
        props:{
            searchMusicList:Array,
            suggests:Array,
            keywords:String
        },
        components:{
            // SearchMusicitem
            ListenItem
        },
        
    }
</script>
<style lang='less' scoped>
    .thebest{
        display: flex;
        -webkit-box-align: center;
        align-items: center;
        height: 66px;
        margin-left: 10px;
        padding: 8px 10px 8px 0;
        box-sizing: border-box;
        position: relative;
        &::after{
            position: absolute;
            z-index: 2;
            content: "";
            top: 0;
            left: 0;
            pointer-events: none;
            box-sizing: border-box;
            width: 100%;
            height: 100%;
            -webkit-transform-origin: top left;
            -ms-transform-origin: top left;
            transform-origin: top left;
            border: 0 solid rgba(0,0,0,.1);
        }
        .bestimg{
            position: relative;
            width: 50px;
            height: 50px;
            margin-right: 15px;
            line-height: 0;
            -webkit-box-flex: 0;
            flex: 0 0 auto;
            display: inline-block;
            img{
                display: block;
                width: 100%;
            }
        }
        .bestText{
            -webkit-box-flex: 1;
            flex: 1;
            display: inline-block;
            width: 1%;
            h4{
                font-size: 17px;
                line-height: 30px;
                color: #333;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                word-break: normal;
                p{
                    display: inline;
                    .s1{
                        white-space: nowrap;
                        word-break: normal;
                        font-size: 17px;
                        line-height: 30px;
                        color: #333;
                        .s12{
                            color: #507daf;
                        }
                    }
                    .s2{
                        white-space: nowrap;
                        word-break: normal;
                        font-size: 17px;
                        line-height: 30px;
                        color: #333;
                    }
                }
            }
        }
    }
</style>