<template>
<div>
<ul class="newMusicList">
    <ListenItem v-for="(item,index) in newMusicList" :key='item.id' 
    :item='item' 
    :index='index' 
    :list='newMusicList'
    :currentstate='$root.playingMusic.musicID ==item.id && $root.playingMusic.isPlay==true?true:false'
    ></ListenItem>
</ul>
<Loading v-if="newMusicList.length<=0" />
</div>
</template>

<script>
    import Loading from './Loading'
    import ListenItem from './Listenitem'
    export default {
        name:'MusicItem',
        
        props:{
            newMusicList:{
                type:Array,
                default:()=>{
                    return []
                }
            },
        },
        methods: {
            // adds(){
            //     let musiclist = []
            //     for(let i in this.newMusicList){
            //         musiclist.push(this.newMusicList[i].id)
            //     }
            //     this.$root.playingMusic.playList = musiclist
            //     console.log(this.$root.playingMusic.playList)
            // }
        },
        components:{
            Loading,
            ListenItem
        }
    }
</script>
<style lang='less' scoped>
    .newMusicList{
        li{
            display: flex;
            margin-top: 10px;
            div.left{
                flex: 1;
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
