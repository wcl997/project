<template>
    <div class="player">
        <audio ref="musicplayer"
               autoplay 
               :src="`https://music.163.com/song/media/outer/url?id=${musicID}.mp3`"
               @timeupdate="timeupdate($event)"/>
        <div class="playerBar">
                <!-- <div class="plays" @click="playAudio">
                    <img v-if="!showPlay" src="../assets/play.png">
                    <img v-if="showPlay" src="../assets/pause.png">
                </div> -->
                <!-- <div class="progress" ref="progress">
                    <div class="line"></div>
                    <div class="bar"></div>
                </div> -->
                <i ref="rollImg">
                    <img :src="song.al.picUrl">
                </i>
                <i @click="showFull">{{song.name}}-{{song.ar[0].name}}</i>
                <i @click='togglePlay'>
                    <img v-if="!$root.playingMusic.isPlay" src="../assets/play.png">
                    <img v-if="$root.playingMusic.isPlay" src="../assets/pause.png">
                    <canvas ref="canvas" width="50" height="50">
                    </canvas>
                </i>
                <!-- <div class="timers">
                    <span class="current">00:00</span>/
                    <span class="total">00:00</span>
                </div> -->
        </div>
        <transition name="goget">
            <div class="fullLrc" v-show="isFullLrc">
                <div :style="{backgroundImage:`url(${song.al.picUrl})`}" class="sb">
                </div>
                <div class="back" @click="isFullLrc=false">
                    <img src="../assets/back.png" >
                </div>
                <div class="pages">
                    <div class="song-disc">
                        <div class="m-song-turn" ref="songturn">
                            <div class="zhezhaoceng1">
                                <div class="zhezhaoceng2">
                                    <img :src="song.al.picUrl">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="theLrc">
                    <div class="pr">
                        <div class="song-info">
                            <h2>
                                <span class="song-sname">{{song.name}}</span>
                                <span class="song-gap">-</span>
                                <b class="song-autr">{{song.ar[0].name}}</b>
                                
                            </h2>
                            <div class="lrc">
                                <div>
                                    <ul :style="{
                                        transform:`translateY(-${lrcCurrent*32}px)`
                                    }">
                                        <li v-for="(lrc,i) in lrcArr" :key='i' :class="{active:i==lrcCurrent}">{{lrc.lyric}}</li>
                                    </ul>
                                </div>
                    </div>
                        </div>
                    </div>
                    
                    
                </div>

                <div class="progressout">
                    <span>{{nowtime}}</span>
                    <div class="progress" ref="progress" >
                        <div class="line" ref="line"></div>
                        <div class="bar" ref="bar" @click="tosec($event)"></div>
                    </div>
                    <span>{{total}}</span>
                </div>

                <div class="alltheF">
                    <div class="prev"
                    @click="theprev"></div>
                    <div class="stop"></div>
                    <div class="next" @click="thenext"></div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import imgA from '../assets/play.png'
    import imgB from '../assets/pause.png'
    export default {
        props:['musicID'],
        data() {
            return {
                showPlay:false,
                pA:imgA,
                pB:imgB,
                song:{
                    al:{
                        picUrl:''
                    },
                    name:null,
                    ar:[
                        {name:''}
                    ]
                },
                lrcArr:[],
                isFullLrc:false,
                lrcCurrent:0,
                currentIndex:0,
                total:0,
                nowtime:0,
                thetime:0,
                totaTime:0
            }
        },
        watch:{
            // total(val){
            //     console.log(val)
            //     let currentTime = this.$refs.musicplayer.currentTime;
            //     let durationTime = this.$refs.musicplayer.duration;
            //     val = currentTime
            //     return val

            // },
            musicID(val){
                this.$axios.get('/song/detail?ids='+val).then(data=>{
                    this.song=data.data.songs[0]
                    // console.log(data)
                })
                this.axios.defaults.baseURL = 'http://music.kele8.cn'
                this.axios.get('/lyric?id='+val).then(lrcdata=>{
                    let lrc = lrcdata.data.lrc.lyric;
                    let lrcArr = lrc.split(/\n/)
                    let reg = /\[(\d+):(\d+\.\d+)\](.+)/;
                    this.lrcArr = lrcArr.map(lc=>{
                        reg.test(lc);
                        return {
                            time:parseInt(RegExp.$1*60)+parseFloat(RegExp.$2),
                            lyric:RegExp.$3
                        }
                    })
                })
                this.axios.defaults.baseURL = 'http://musicapi.leanapp.cn/'
                return val
            },
            
        },
        mounted() {
            var that = this
            this.$refs.musicplayer.addEventListener('pause',function(){
                // console.log(that)
                that.$root.playingMusic.isPlay = false
                that.$refs.rollImg.style.animationPlayState='paused';
                that.$refs.songturn.style.animationPlayState='paused'
            });
            this.$refs.musicplayer.addEventListener('play',function(){
                // console.log(2222)
                that.$root.playingMusic.isPlay = true
                that.$refs.rollImg.style.animationPlayState='running';
                that.$refs.songturn.style.animationPlayState='running'
            });
            this.$refs.musicplayer.addEventListener('ended',function(){
                that.playNext()
            })
        },
        methods:{
            tosec(e){
                let barX = e.offsetX
                let progresswidth = this.$refs.progress.clientWidth
                let ttTime = Math.floor(this.totaTime)
                // console.log(ttTime)
                let nowCurrenTime = Math.floor(Math.floor(barX)*ttTime/progresswidth)
                // console.log(nowCurrenTime)
                this.$refs.musicplayer.currentTime = nowCurrenTime
                let percentage = nowCurrenTime/ttTime*100+'%'

                this.$refs.line.style.width = percentage
            },
            thenext(){
                this.currentIndex = this.$root.playingMusic.playList.index
                // this.$root.playingMusic.playList.index = this.$root.playingMusic.playList.list.index
                // console.log(this.$root.playingMusic.currentstate)
                this.currentIndex++
                this.currentIndex = this.currentIndex >this.$root.playingMusic.playList.list.length-1?0:this.currentIndex
                // this.neID = this.$root.playingMusic.playList.list[this.currentIndex].id
                // this.neID=this.currentIndex
                this.$root.playingMusic.playList.index = this.currentIndex
                this.$root.playingMusic.musicID = this.$root.playingMusic.playList.list[this.$root.playingMusic.playList.index].id
                // console.log(this.$root.playingMusic.playList.index)
            },
            theprev(){
                this.currentIndex = this.$root.playingMusic.playList.index
                this.currentIndex--
                this.currentIndex = this.currentIndex <0? this.$root.playingMusic.playList.list.length-1:this.currentIndex
                this.$root.playingMusic.playList.index = this.currentIndex
                this.$root.playingMusic.musicID = this.$root.playingMusic.playList.list[this.$root.playingMusic.playList.index].id
                // this.neID = this.$root.playingMusic.playList.list[this.currentIndex].id
            },
            calculateNext(){
                let nextIndex;

                if(this.$root.playingMusic.playList.index < this.$root.playingMusic.playList.list.length - 1){
                    nextIndex = this.$root.playingMusic.playList.index +1
                }else{
                    nextIndex = 0
                }
                return nextIndex
            },
            calculatePrev(){
                let prevIndex;

                if(this.$root.playingMusic.playList.index > 0){
                    prevIndex = this.$root.playingMusic.playList.index -1
                }else{
                    prevIndex = this.$root.playingMusic.playList.list.length - 1
                }
                return prevIndex
            },
            playNext(){
                // this.currentIndex = this.$root.playingMusic.playList.list.findIndex((song)=>this.musicID === song.id)
                console.log(this.calculateNext())
                this.$root.playingMusic.musicID = this.$root.playingMusic.playList.list[this.calculateNext()].id
            },
            togglePlay(){
                // this.showPlay = !this.showPlay
                if(this.$root.playingMusic.isPlay){
                    // console.log(this.$refs.rollImg.style);
                    this.$root.playingMusic.isPlay=false;
                    // this.showPlay = true;
                    this.$refs.musicplayer.pause();
                    this.$refs.rollImg.style.animationPlayState='paused';
                    this.$refs.songturn.style.animationPlayState='paused'
                
                }else{
                    // console.log(222);

                    this.$root.playingMusic.isPlay=true;
                    // this.showPlay=false
                    this.$refs.musicplayer.play();
                    this.$refs.rollImg.style.animationPlayState='running';
                    this.$refs.songturn.style.animationPlayState='running'
                }
            },
            showFull(){
                // console.log(this.$root.playingMusic.playList)
                
                this.isFullLrc = true
            },
            formatTime(seconds){
                var m = Math.floor( seconds/60%60 );
                    m = m<10 ? "0"+m : m ;
                    // 秒数
                var s = Math.floor( seconds%60 );
                    s = s<10 ? "0"+s : s ;

            return  `${m}:${s}`;
            },
            timeupdate(event){
                // let progresswidth = this.$refs.progress.clientWidth
                let audio = event.target;
                this.totaTime= audio.duration
                this.thetime = audio.currentTime;
                let currentTime = audio.currentTime;
                let durationTime = audio.duration;
                this.total = this.formatTime(durationTime)
                this.nowtime = this.formatTime(currentTime)
                
                let percentage = currentTime/durationTime*100+'%'
                
                for(var i in this.lrcArr){
                    // console.log(i)
                    let lrcTime = this.lrcArr[i].time;
                    // console.log(lrcTime)
                    var isly = parseInt(i)+1
                        // console.log(currentTime,i,this.lrcArr[i],this.lrcArr[isly])
                    if(currentTime>=lrcTime && currentTime<this.lrcArr[isly].time){
                        this.lrcCurrent=i
                        break;
                    }
                }
                this.$refs.line.style.width = percentage
                this.drawCircle(currentTime,durationTime)
            },
            drawCircle(c,d){
                let canvas = this.$refs.canvas;
                let cxt = canvas.getContext('2d');
                cxt.beginPath();
                cxt.strokeStyle='#ddd'
                cxt.arc(25,25,20,0,Math.PI*2)
                cxt.stroke();
                cxt.closePath();

                cxt.beginPath()
                cxt.strokeStyle='#e4393c'
                cxt.arc(25,25,20,0,Math.PI*2*(c/d))
                cxt.stroke();
                cxt.closePath();

            }
        }
        
    }
</script>
<style lang='less' scoped>

    .goget-enter-active,
    .goget-leave-active{
        transition: all .4s;
    }
    .goget-enter,
    .goget-leave-to{
        opacity: 0;
    }
    .goget-enter-to,
    .goget-leave{
        opacity: 1;
    }

    .player{
        position: fixed;
        bottom: 0;
        background-color: #fff;
        width: 100%;
        z-index: 99;
        box-shadow: 0 2px 6px rgba(0,0,0,.08);
        // background-image: linear-gradient(45deg, #e4393c, transparent);
        border-top: 1px solid #ddd;

        audio{
            height: 20px;
        }
        .playerBar{
            // width: 350px;
            // height: 50px;
            // background-color: rgba(0,0,0,0.2);
            // border-radius: 4px;
            // box-shadow: 0 15px 30px rgba(0,0,0,.1);
            // transform: translate3d(0,-2px,0);
            display: flex;
            justify-content: center;
            align-items: center;
            // position: relative;
            i{
                display: inline-block;
                &:first-of-type{
                    position: relative;
                    top: -7px;
                    left: 5px;
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    overflow: hidden;
                    animation: rollImg 2s linear 0s infinite;
                }
                &:nth-of-type(2){
                    flex: 1;
                    font-weight: 700;
                }
                &:last-of-type{
                    img{
                        position: absolute;
                        top: 12px;
                        right: 12px;
                        width: 25px;
                    }
                    width: 50px;
                    height: 50px;
                    z-index: 9;
                }
            }

            // div.plays{
            //     // flex: 1;
            //     display: flex;
            //     justify-content: center;
            //     align-items: center;
            //     img{
            //         width: 35px;
            //         height: 35px;
            //     }
            // }
            // div.progress{
            //     flex: 4;
            //     .line{
            //         width: 0;
            //         height: 100%;
            //         background-color: #fff;
            //         position: relative;
            //     }
            //     .bar{
            //         width: 212.36px;
            //         height: 100%;
            //         // opacity: 0;
            //         background-color: red;
            //         position: absolute;
            //         top: 0;
            //         // left: 0;
            //         z-index: 1;
            //     }
            // }
            // .timers{
            //     flex: 1;
            //     height: 50px;
            //     display: flex;
            //     justify-self: center;
            //     align-items: center;
            //     span{
            //         display: inline-block;
            //     }
            // }
        }
        .fullLrc{
            .back{
                position: absolute;
                top: 10px;
                left: 3px;
                height: 30px;
                width: 30px;
            }
            position: relative;
            z-index: 999;
            width: 100vw;
            height: 100vh;
            background-color: black;
            .sb{
                width: 100vw;
                height: 100vh;
                position: absolute;
                opacity: 1;
                transform: scale(1.5);
                transform-origin: center center;
                filter: blur(60px);
                z-index: -1;
                pointer-events: none;
            }
            .theLrc{
                .pr{
                    position: relative;
                    .song-info{
                        padding: 0 35px;
                        margin-top: 25px;
                        position: relative;
                        z-index: 20;
                        h2{
                            font-size: 18px;
                            text-align: center;
                            line-height: 1.1;
                            color: #fefefe;
                            overflow: hidden;
                            white-space: nowrap;
                            text-overflow: ellipsis;
                            .song-autr{
                                font-size: 16px;
                                color: hsla(0,0%,100%,.6);
                            }
                        }
                        .lrc{
                            z-index: 999;
                            position: relative;
                            margin-top: 14px;
                            height: 50px;
                            div{
                                overflow: hidden;
                                line-height: 1.5;
                                font-size: 16px;
                                position: absolute;
                                height: 50px;
                                text-align: center;
                                color: hsla(0,0%,100%,.6);
                                top: 0px;
                                width: 100%;
                                margin: 0 auto;
                                ul{
                                    li{
                                        height: 32px;
                                        padding-bottom:8px;
                                        &.active{
                                            color: rgb(255, 255, 255);
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            .pages{
                padding-top: 70px;
                .song-disc{
                    width: 296px;
                    height: 296px;
                    position: relative;
                    margin: 0 auto;
                    z-index: 999;
                    .m-song-turn{
                        width: 100%;
                        height: 100%;
                        animation: rollImg 5s linear 0s infinite;
                        .zhezhaoceng1{
                            width: 184px;
                            height: 184px;
                            margin: -92px 0 0 -92px;
                            position: absolute;
                            left: 50%;
                            top: 50%;
                            z-index: 1;
                            .zhezhaoceng2{
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                                overflow: hidden;
                                background: url(//s3.music.126.net/mobile-new/img/disc_default.png?ba7c53e…=) no-repeat;
                                background-size: contain;
                                img{
                                    width: 100%;
                                    vertical-align: middle;
                                }
                            }
                        }
                        &::before{
                            content: " ";
                            position: absolute;
                            left: 0;
                            right: 0;
                            top: 0;
                            bottom: 0;
                            z-index: 2;
                            background-image: url(https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4602256867/5855/63fb/325b/d7e4e3a….png?imageView=&quality=75&thumbnail=200y200);
                            background: url(//s3.music.126.net/mobile-new/img/disc.png?d3bdd10…=) no-repeat;
                            background-size: contain;
                        }
                    }
                    &::after{
                        content: " ";
                        position: absolute;
                        width: 96px;
                        height: 137px;
                        top: -70px;
                        left: 133px;
                        background-image: url(//s3.music.126.net/mobile-new/img/needle-ip6.png?be4ebbe…=);
                        z-index: 5;
                        background-size: contain;
                    }
                }
            }
            .alltheF{
                width: 60%;
                height: 75px;
                background:#ddd;
                border-radius: 20px;
                margin: 0 auto;
                display: flex;
                margin-top: 10px;
                .prev{
                    flex: 1;
                    background: url(../assets/上个.png);
                    background-size: cover;
                }
                .stop{
                    flex: 1;
                }
                .next{
                    flex: 1;
                    background: url(../assets/next.png);
                    background-size: cover;
                }
            }
            .progressout{
                width: 100%;
                height: 10px;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 10px;
                // overflow: hidden;
                span{
                    color: #fff;
                }
                .progress{
                    position: relative;
                    border-radius: 8px;
                    background-color: #555;
                    width: 300px;
                    height: 100%;
                    margin: 0 auto;
                    .line{
                        width: 0;
                        border-radius: 8px;
                        height: 100%;
                        background-color: #FFF;
                    }
                    .bar{
                        position: absolute;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }
    }
    @keyframes rollImg {
        form{
            transform: rotate(0deg);
        }
        to{
            transform: rotate(360deg);
        }
    }
</style>