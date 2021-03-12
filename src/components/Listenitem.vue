<template>
    <li :key="item.id" @click="playMusic($event)">
        <slot></slot>
        <div class="left">
            <div>{{item.name}}</div>
            <p>
                <i :class="{sghot:item.song.privilege.maxbr>320000}"></i>
                {{item.song.artists[0].name}}-{{item.name}}
            </p>
        </div>
        <div class="right">
            <span ref="rightIcon" :class="{current:currentstate==true}"></span>
        </div>
    </li>
</template>

<script>
    export default {
        props:{
            item:Object,
            index:Number,
            list:Array,
            num:{
                type:Number,
                default:0
            },
            currentstate:Boolean
        },
        mounted() {
            
        },
        watch:{
            
        },
        methods: {
            playMusic(){
                console.log(this.index)
                this.$root.playingMusic.playList = {item:this.item,index:this.index,list:this.list}
                this.$root.playingMusic.musicID = this.$root.playingMusic.playList.list[this.$root.playingMusic.playList.index].id

                // this.$root.playingMusic.currentstate = this.currentstate
                // console.log(this.$root.playingMusic.currentstate)
                // console.log(this.currentstate)
                // console.log(imgA)
                // console.log(e.target)
                // if(this.$root.playingMusic.isPlay){
                //     this.$refs.rightIcon.style
                // }

                // let pList = this.$root.playingMusic.playList
                // pList.push(this.item.id)
                // // console.log(this.$root.playingMusic.playList)
                // let newList = [...new Set(pList)]
                // console.log(newList)
            }
        },
    }
</script>

<style lang='less' scoped>
    li{
    display: flex;
    margin-top:10px;
    padding-left:10px;
    div.left{
      flex:1;
      text-align: left;
      border-bottom: 1px solid #ddd;
      div{
          font-size:17px;
          color: black;
      }
      p{
          text-overflow: ellipsis;
          overflow: hidden;
          font-size:12px;
          white-space: nowrap;
          word-break: normal;
          color:#888;
          padding:5px 0px;
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
      padding:0px 5px;
      display: flex;
      align-items: center;
      span{
        display: inline-block;
        width:22px;
        height:22px;
        background-image: url(../assets/05.png);
        background-position: -24px 0px;
        background-size: 166px 97px;
        &.current{
            background-image: url(../assets/pause2.png);
            background-position: 0px 0px;
            background-size: cover;
            background-repeat: no-repeat;
        }
      }
    }
  }
</style>