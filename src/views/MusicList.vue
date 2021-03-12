<template>
    <div>
        <div class="boxTop">
            <div class="topbg" :style="{'background-image':`url('${this.$route.query.img}')`}">
                
            </div>
            <div class="wrap">
                <div class="f1">
                    <img :src="this.$route.query.img" />
                    <span>歌单</span>
                    <i>{{this.$route.query.playCount|formatNum}}</i>
                </div>
                <div class="f2">
                    <h2>{{this.$route.query.name}}</h2>
                    <div class="avator">
                        <a href="#">
                            <div class="avatorImg">
                                <img :src="avaimg">
                                <span></span>
                            </div>
                        {{avators}}
                        </a>
                    </div>
                </div>
            </div>
        </div>
        <div class="playlists">
            <h3>歌曲列表</h3>
            <ul>
                <ListItem v-for="(v,k) in musicList" 
                :key="v.id" 
                :item='v'
                :index='k' 
                :list='musicList'
                :currentstate='$root.playingMusic.musicID ==v.id && $root.playingMusic.isPlay==true?true:false'
                >
                    <div class="rank">{{k+1}}</div>
                </ListItem>
            </ul>
        </div>
        <button @click="abc()" class="btn">查看更多</button>
        <div class="newcomtxt">
            <h4>最新评论</h4>
            <div class="cmtlist">
                <div class="cmtitem" v-for='(v,i) in comments' :key="i">
                    <div class="cmthead">
                        <a href="#">
                            <img :src="v.user.avatarUrl" />
                        </a>
                    </div>
                    <div class="cmtwrap">
                        <div class="cmtheader">
                            <div class="cmtmeta">
                                <span>
                                    <a href="#">{{v.user.nickname}}</a>
                                </span>
                            </div>
                            <div class="like">
                                <span>
                                    <span></span>
                                    <i>
                                        <svg class="u-svg u-svg-unzancmt" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28"><path fill="#999" d="m25.857 14.752c-.015.059-1.506 5.867-2.932 8.813-1.162 2.402-3 2.436-3.099 2.436h-12.826v-13c3 0 5.728-4 5.728-7.275 0-3.725 1.433-3.725 2.142-3.725 1.327 0 1.978 1.345 1.978 4 0 2.872-.832 4.525-.839 4.537-.161.31-.155.682.027.981.181.299.5.482.849.482h6.942c.922 0 1.551.215 1.866.64.467.626.286 1.705.164 2.112m-23.857 10.248v-10c0-1.795.659-1.981.855-2h2.145v13h-2.173c-.829 0-.827-.648-.827-1m25.309-13.54c-.713-.969-1.886-1.46-3.482-1.46h-5.519c.26-.932.519-2.285.519-4 0-5.221-2.507-6-4-6-1.909 0-4.185.993-4.185 5.725 0 2.206-1.923 5.275-3.815 5.275h-4-.011c-1.034.011-2.816.862-2.816 4v10.02c0 1.198.675 2.979 2.827 2.979h16.971.035c.364 0 3.224-.113 4.894-3.564 1.514-3.127 3.01-8.942 3.056-9.14.071-.23.664-2.289-.474-3.836"></path></svg>
                                    </i>
                                </span>
                            </div>
                        </div>
                        <div class="cmtcontent">
                            <span>{{v.content}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ListItem from '../components/Listenitem'
    export default {
        data() {
            return {
                musicList:[],
                comment:[],
                avaimg:'',
                avators:'',
                num:0,
                comments:[],
                avat:[],
                avaname:[]
            }
        },
        components:{
            ListItem
        },
        methods:{
            abc(){
                this.loadMusic(this)
            },
            loadMusic(vm){
                let musicids=[];
                vm.num++
                vm.axios.get('/playlist/detail?id='+vm.$route.query.id).then(data=>{
                    // console.log(data)
                    // console.log(data.data.playlist.creator.avatarUrl)
                    vm.avaimg = data.data.playlist.creator.avatarUrl
                    vm.avators =data.data.playlist.creator.nickname
                    musicids=data.data.playlist.trackIds.slice(20*(vm.num-1),20*vm.num);
                })
                .then(()=>{
                    for(let v of musicids){
                        vm.axios.get('song/detail?ids='+v.id).then((data)=>{
                            vm.musicList.push({
                                name:data.data.songs[0].name,
                                id:data.data.songs[0].id,
                                song:{
                                    privilege:{
                                        maxbr:data.data.privileges[0].maxbr
                                    },
                                    artists:data.data.songs[0].ar
                                }
                            }) 
                            // console.log(data)
                        })
                    }
                })
            },

        },
        filters:{
            formatNum(value){
                return (value/10000).toFixed(1)+"万";
            },
        },
        beforeRouteEnter (to, from, next) {
            console.log(to,from)
            next(vm=>{
                vm.loadMusic(vm)
            })
        },
        created(){
            this.axios.get('comment/playlist?id='+this.$route.query.id).then(data=>{
                console.log(data.data)
                this.comments = data.data.comments
            })
        }
    }
</script>

<style lang='less' scoped>
    .rank{
        width: 40px;
        height: 50px;
        font-size: 17px;
        text-align: center;
        line-height: 50px;
        margin-left: 5px;
        margin-right: 5px;
    }
    .btn{
        height: 50px;
        width: 100%;
        border: none;
        background: #fff;
        outline: none;
        font-size: 17px;
    }
    .playlists{
        h3{
            text-align: left;
            height: 23px;
            line-height: 23px;
            padding: 0 10px;
            font-size: 12px;
            color: #666;
            background-color: #eeeff0;
        }
    }
    .boxTop{
        height: 186px;
        position: relative;
        padding: 30px 10px 30px 15px;
        overflow: hidden;
        .topbg{
            height: 186px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: 50%;
            filter: blur(20px);
            transform: scale(1.5);
            &::after{
                content: " ";
                background-color: rgba(0,0,0,.25);
                position: absolute;
                left: 0;
                top: 0;
                right: 0;
                bottom: 0;
                z-index: 1;
            }
        }
        .wrap{
            display: flex;
            position: relative;
            z-index: 2;
            top: -188px;
            .f1{
                span{
                    position: absolute;
                    z-index: 3;
                    top: 10px;
                    left: 0;
                    padding: 0 8px;
                    height: 17px;
                    color: #fff;
                    font-size: 9px;
                    text-align: center;
                    line-height: 17px;
                    background-color: rgba(217,48,48,.8);
                    border-top-right-radius: 17px;
                    border-bottom-right-radius: 17px;
                }
                i{
                    position: absolute;
                    right: 2px;
                    top: 0;
                    z-index: 3;
                    padding-left: 15px;
                    color: #fff;
                    font-size: 12px;
                    background-position: 0;
                    background-repeat: no-repeat;
                    background-size: 11px 10px;
                    text-shadow: 1px 0 0 rgba(0,0,0,.15);
                    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyMiAyMCI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjMDQwMDAwIiBkPSJNMjIgMTYuNzc3YzAgMS4yMzMtMS4xMjEgMi4yMzMtMi41MDYgMi4yMzMtMS4zODQgMC0yLjUwNi0xLTIuNTA2LTIuMjMzdi0yLjU1M2MwLTEuMjM0IDEuMTIyLTIuMjMzIDIuNTA2LTIuMjMzLjE3NCAwIC4zNDMuMDE3LjUwNi4wNDZ2LTEuMzdoLS4wMzNjLjAxNy0uMjIuMDMzLS40NDEuMDMzLS42NjZhOCA4IDAgMCAwLTE2IDBjMCAuMjI1LjAxNi40NDYuMDM0LjY2Nkg0djEuMzdjLjE2My0uMDI5LjMzMy0uMDQ2LjUwNS0uMDQ2IDEuMzg0IDAgMi41MDYuOTk5IDIuNTA2IDIuMjMzdjIuNTUzYzAgMS4yMzMtMS4xMjIgMi4yMzMtMi41MDYgMi4yMzNTMiAxOC4wMTEgMiAxNi43Nzd2LTIuNTUzYzAtLjI1OC4wNTktLjUwMS4xNDgtLjczQS45ODIuOTgyIDAgMCAxIDIgMTMuMDAxdi0yLjY2N2MwLS4wMjMuMDEyLS4wNDMuMDEzLS4wNjctLjAwNC0uMDg4LS4wMTMtLjE3Ni0uMDEzLS4yNjYgMC01LjUyMyA0LjQ3Ny0xMCAxMC0xMHMxMCA0LjQ3NyAxMCAxMGMwIC4wOS0uMDA5LjE3OC0uMDE0LjI2Ni4wMDIuMDI0LjAxNC4wNDQuMDE0LjA2N3YyYS45ODguOTg4IDAgMCAxLS4zNi43NTNjLjIyNC4zMzQuMzYuNzIuMzYgMS4xMzh2Mi41NTIiIG9wYWNpdHk9Ii4xNSIvPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgZmlsbD0iI2ZmZiIgZD0iTTIwIDE2Ljc3N2MwIDEuMjMzLTEuMTIxIDIuMjMzLTIuNTA2IDIuMjMzLTEuMzg0IDAtMi41MDYtMS0yLjUwNi0yLjIzM3YtMi41NTNjMC0xLjIzNCAxLjEyMi0yLjIzMyAyLjUwNi0yLjIzMy4xNzQgMCAuMzQzLjAxNy41MDYuMDQ2di0xLjM3aC0uMDMzYy4wMTctLjIyLjAzMy0uNDQxLjAzMy0uNjY2YTggOCAwIDAgMC0xNiAwYzAgLjIyNS4wMTYuNDQ2LjAzNC42NjZIMnYxLjM3Yy4xNjMtLjAyOS4zMzMtLjA0Ni41MDUtLjA0NiAxLjM4NCAwIDIuNTA2Ljk5OSAyLjUwNiAyLjIzM3YyLjU1M2MwIDEuMjMzLTEuMTIyIDIuMjMzLTIuNTA2IDIuMjMzUzAgMTguMDExIDAgMTYuNzc3di0yLjU1M2MwLS4yNTguMDU5LS41MDEuMTQ4LS43M0EuOTgyLjk4MiAwIDAgMSAwIDEzLjAwMXYtMi42NjdjMC0uMDIzLjAxMi0uMDQzLjAxMy0uMDY3LS4wMDQtLjA4OC0uMDEzLS4xNzYtLjAxMy0uMjY2IDAtNS41MjMgNC40NzctMTAgMTAtMTBzMTAgNC40NzcgMTAgMTBjMCAuMDktLjAwOS4xNzgtLjAxNC4yNjYuMDAyLjAyNC4wMTQuMDQ0LjAxNC4wNjd2MmEuOTg4Ljk4OCAwIDAgMS0uMzYuNzUzYy4yMjQuMzM0LjM2LjcyLjM2IDEuMTM4djIuNTUyIi8+PC9zdmc+);
                    &::after{
                        content: " ";
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 18px;
                        z-index: 2;
                        background-image: linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,.2));
                    }
                }
                width: 126px;
                height: 126px;
                position: relative;
                background-color: #e2e2e3;
                &::after{
                    content: " ";
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 18px;
                    z-index: 2;
                    background-image: linear-gradient(90deg,rgba(0,0,0,0),rgba(0,0,0,.2));
                }
                img{
                    width: 100%;
                    vertical-align: middle;
                }
            }
            .f2{
                -webkit-box-flex: 1;
                flex: 1 1 auto;
                width: 1%;
                margin-left: 16px;
                h2{
                    padding-top: 1px;
                    font-size: 17px;
                    line-height: 1.3;
                    color: #fefefe;
                    height: 44px;
                    display: -webkit-box;
                    -webkit-box-pack: center;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    white-space: normal;
                }
                .avator{
                    display: block;
                    position: relative;
                    margin-top: 20px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    word-break: normal;
                    a{
                        text-decoration: none;
                        display: inline-block;
                        color: hsla(0,0%,100%,.7);
                        .avatorImg{
                            position: relative;
                            display: inline-block;
                            width: 30px;
                            height: 30px;
                            border-radius: 50%;
                            vertical-align: middle;
                            margin-right: 5px;
                            img{
                                border-radius: 50%;
                                width: 100%;
                                vertical-align: middle;
                            }
                            span{
                                position: absolute;
                                background-position: 0 0;
                                right: -5px;
                                bottom: 0;
                                width: 12px;
                                height: 12px;
                                background-image: url(//s3.music.126.net/mobile-new/img/usericn_2x.png?6423c06…=);
                                background-repeat: no-repeat;
                                background-size: 75px auto;
                            }
                        }
                    }
                }
            }
        }
    }
    .newcomtxt{
        h4{
            padding: 0 10px;
            height: 23px;
            line-height: 23px;
            margin: 0;
            color: #666;
            font-size: 12px;
            font-weight: 400;
            background: rgba(0,0,0,.05);
        }
        .cmtlist{
            .cmtitem{
                padding-top: 10px;
                width: 100%;
                display: flex;
                -webkit-box-orient: horizontal;
                -webkit-box-direction: normal;
                flex-direction: row;
                .cmthead{
                    height: 35px;
                    margin: 0 10px;
                    -webkit-box-flex: 0;
                    flex: none;
                    a{
                        position: relative;
                        display: block;
                        color: #507daf;
                        text-decoration: none;
                        img{
                            display: block;
                            border-radius: 50%;
                            width: 30px;
                            height: 30px;
                            border: 0;
                        }
                    }
                }
                .cmtwrap{
                    padding-left: 0;
                    padding-right: 10px;
                    padding-bottom: 11px;
                    -webkit-box-flex: 1;
                    position: relative;
                    flex: auto;
                    width: 0;
                    .cmtheader{
                        -webkit-box-orient: horizontal;
                        -webkit-box-direction: normal;
                        flex-direction: row;
                        .cmtmeta{
                            -webkit-box-flex: 1;
                            flex: auto;
                            width: 100%;
                            font-size: 0;
                            text-align: left;
                            span{
                                max-width: 100%;
                                display: inline-flex;
                                -webkit-box-align: center;
                                align-items: center;
                                a{
                                    font-size: 14px;
                                    color: #666;
                                    line-height: 20px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    white-space: nowrap;
                                    -webkit-box-flex: 1;
                                    flex: auto;
                                    text-decoration: none;
                                    line-height: 28px;
                                }
                            }
                        }
                        .like{
                            margin-left: 80%;
                            position: relative;
                            top:-20px;
                            width: 65px;
                            height: 22px;
                            line-height: 22px;
                            font-size: 11px;
                            color: #999;
                            -webkit-box-flex: 0;
                            flex: none;
                            text-align: right;
                            span{
                                display: inline-block;
                                min-width: 30px;
                                padding-left: 5px;
                                line-height: 22px;
                                font-size: 11px;
                                color: #999;
                                text-align: right;
                                span{
                                    vertical-align: middle;
                                }
                                i{
                                    display: inline-block;
                                    width: 14px;
                                    height: 14px;
                                    margin-left: 6px;
                                    line-height: 0;
                                    vertical-align: middle;
                                    cursor: pointer;
                                    svg{
                                        display: inline-block;
                                        vertical-align: middle;
                                        background-position: 0 0;
                                        background-size: contain;
                                        background-repeat: no-repeat;
                                        line-height: 0;
                                    }
                                }
                            }
                        }
                    }
                    .cmtcontent{
                        position: relative;
                        color: #333;
                        font-size: 15px;
                        line-height: 22px;
                        margin-top: 5px;
                        text-align: left;
                        span{
                            vertical-align: middle;
                        }
                    }
                    &::after{
                        width: 200%;
                        height: 200%;
                        transform: scale(.5);
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
    }
</style>