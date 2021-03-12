<template>
    <div class="box">
        <div class="hotop">
        <div class="hotopct">
            <div class="hoticon"></div>
            <div class="hottime">更新日期:{{today|dateformat('m月d日')}}</div>
        </div>
        </div>
        <Loading v-if="hotList<=0"/>
    <ul>
        <ListenItem v-for="(item,k) in hotList" 
        :key='item.id' 
        :num='k+1' 
        :item='item' 
        :index='k' 
        :list='hotList'
        :currentstate='$root.playingMusic.musicID ==item.id && $root.playingMusic.isPlay==true?true:false'
        >
        <div :class="[{updateColor:k<3},'rank']">{{k+1|add}}</div>
        </ListenItem>
    </ul>
    <button @click='abc()' class="btn">查看更多</button>
    </div>
</template>

<script>
    import ListenItem from '../components/Listenitem'
    import Loading from '../components/Loading'
    export default {
        name:'Hot',
        components:{
            Loading,
            ListenItem
        },
        data() {
            return {
                today:new Date(),
                hotList:[],
                num:0
            }
        },
        methods:{
            abc(){
                this.loadMusic(this)
            },
            loadMusic(vm){
                let musicids=[];
                vm.num++
                vm.axios.get('/top/list?idx=1').then(data=>{
                    vm.today = data.data.playlist.updateTime;
                    musicids=data.data.playlist.trackIds.slice(20*(vm.num-1),20*vm.num);
                }).then(()=>{
                    for(let v of musicids){
                        vm.axios.get('song/detail?ids='+v.id).then((data)=>{
                            vm.hotList.push({
                                name:data.data.songs[0].name,
                                id:data.data.songs[0].id,
                                song:{
                                    privilege:{
                                        maxbr:data.data.privileges[0].maxbr
                                    },
                                    artists:data.data.songs[0].ar
                                }
                            })
                        })
                    }
                })
            },
        //     loadMusic(vm){
        //         let trackids = [];
        //         vm.num += 1
        //         vm.axios.get('/top/list?idx=1').then(data=>{
        //             trackids = data.data.playlist.trackIds.map((item)=>item.id)
        //             vm.today = data.data.playlist.updateTime
        //             vm.$axios.get("/song/detail",{params:{ids:trackids.join(',')}})
        //             .then((result)=>{
        //                 vm.hotList = [];
        //                 let maxbrs = result.data.privileges.map((item)=>item.maxbr)
        //                 vm.hotsq = maxbrs.slice(20*(vm.num-1),20*vm.num)
        //                 vm.hotList=result.data.songs.slice(20*(vm.num-1),20*vm.num)
        //             })
        //         }); 
        //     }
        },
        filters:{
            dateformat(value,formatStr){
                let d = new Date(value);
                let dFormat = {
                    "(Y+)": d.getFullYear(),
                    "(m+)": d.getMonth() + 1,
                    "(d+)": d.getDate(),
                    "(h+)": d.getHours(),
                    "(i+)": d.getMinutes(),
                    "(s+)": d.getSeconds(),
                }
                for (let key in dFormat) {
                    let reg = new RegExp(key)
                    let result = reg.test(formatStr);
                    if (result) {
                        let str = RegExp.$1
                        if (dFormat[key] < 10) dFormat[key] = '0' + dFormat[key];
                        formatStr = formatStr.replace(str, dFormat[key]);
                    }
                }
                return formatStr;
            },
            add(value){
                return value = value < 10? "0"+value:value;
            }
        },
        beforeRouteEnter (to, from, next) {
            next(vm=>{
                if(typeof vm.$route.params.num =='undefined'){
                    vm.hotList = []
                    vm.num=0
                }
                vm.loadMusic(vm);
            })
        },
        beforeRouteUpdate(to , from , next){
            this.loadMusic(this)
            next()
        },
    }
</script>
<style lang='less' scoped>
        .rank{
            font-size: 17px;
            text-align: center;
            line-height: 48px;
            margin-left: 5px;
            margin-right: 5px;
        }
        .updateColor{
            color: red;
        }
        .btn{
            height: 50px;
            width: 100%;
            border: none;
            background: #fff;
            outline: none;
            font-size: 17px;
        }
    .more{
        display:inline-block;
        text-decoration: none;
        color: black;
        -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
        -webkit-user-select: none;
        -moz-user-focus: none;
        -moz-user-select: none;
    }
    .hotop{
        position: relative;
        padding-top: 38.9%;
        overflow: hidden;
        background-image: url("../assets/07.jpg");
        background-repeat: no-repeat;
        background-size: contain;
        .hotopct{
            display: flex;
            flex-direction: column;
            justify-content: center;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            z-index: 2;
            padding-left: 20px;
            box-sizing: border-box;
            .hoticon{
                background: url("../assets/05.png");
                background-repeat: no-repeat;
                background-size: 166px 97px;
                width: 142px;
                height: 67px;
                background-position: -24px -30px;
            }
            .hottime{
                text-align: left;
                margin-top: 10px;
                color: hsla(0,0%,100%,.8);
                font-size: 12px;
                transform: scale(.91);
                transform-origin: left top;
                // background-color: white;
            }
        }
    }
    .hotop::after{
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 1;
        background-color: rgba(0,0,0,.2);
    }
</style>
