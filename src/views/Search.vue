<template>
<div>
    <div class="m-hmsrch">
        <div class="m-input">
            <form @submit="searchList(keywords)">
                <div class="inputcover">
                    <i class="big"></i>
                    <input type="search" name="search" class="input" placeholder='搜索歌曲/歌手/专辑' v-model="keywords" autocomplete="off"/>
                    <label class = 'holder'></label>
                    <!-- <figure class="close">
                        <i class="empty"></i>
                    </figure> -->
                </div>
            </form>
        </div>
    </div>
    <div class="m-default"> 
            <h3 class="title">热门搜索</h3>
            <Suggest v-show="showSearch" :suggests='suggests' :keywords='keywords' @searchResult='searchList'></Suggest>
            <Loading v-show='searching'/>
            <SearchResult v-show="showList" :searchMusicList='searchMusicList'
            :suggests='suggests'
            :keywords='keywords'
            @playMusic='playMusic'/>
    </div>
</div>
</template>

<script>
    import Suggest from '../components/Suggest'
    import Loading from '../components/Loading'
    import SearchResult from '../components/SearchResult'
    export default {
        
        components:{
            Suggest,
            Loading,
            SearchResult
        },
        data() {
            return {
                keywords:'',
                suggests:[],
                searchMusicList:[],
                searching:false, //是否显示加载loading
                showList:false, //是否显示搜索结果
                showSearch:false//是否显示搜索提示
            }
        },
        methods: {
            playMusic(id){
                this.$emit('playMusic',id);
            },
            searchList(keywords){
                // this.keywords=keywords;

                this.showList = false;
                this.searching = true;
                this.showSearch=false;
                // this.showSearch=false
                this.$axios.get('/search?keywords='+keywords).then(d=>{
                    // console.log(d);
                    if(d.data.code==200){
                        this.showList=true;
                        this.searching=false;
                        this.searchMusicList = d.data.result.songs.map(dat=>{
                            return {
                                name:dat.name,
                                id:dat.id,
                                song:{
                                    artists:dat.artists,
                                    privilege:{
                                        maxbr:3200000
                                    }
                                }
                            }
                        });
                        // console.log(this.searchMusicList)
                    }
                })
            }
        },
        watch:{
            keywords(val){
                this.searching = true
                this.showList=false
                this.suggests=[];
                this.$axios.get('/search/suggest?keywords='+val).then(data=>{
                    if(data.data.code ==200 &&data.data.result.order){
                        let result = data.data.result
                        // console.log(data)
                        let re = result.order.reduce((prev,v)=>{
                            if(v!=='playlists'){
                                return prev.concat(result[v])
                            }
                            return prev
                        },[]);
                        this.suggests = re
                        // console.log(this.suggests)
                        this.searching=false;
                        this.showSearch=true;
                        if(this.keywords==""){
                            this.suggests=[];
                        }
                    }
                }).finally(()=>{
                    this.searching=false
                })
            }
        }
    }
</script>
<style lang='less' scoped>
    .m-default{
        padding: 15px 10px 0;
    }
    .title{
        text-align: left;
        font-size: 12px;
        line-height: 12px;
        color: #666;
        margin-bottom: 10px;
    }
    
    .m-input{
        padding: 15px 10px;
        position: relative;
        .inputcover{
            position: relative;
            width: 100%;
            height: 30px;
            padding: 0 30px;
            box-sizing: border-box;
            background: #ebecec;
            border-radius: 30px;
            // border: none;
            .big{
                position: absolute;
                left: 0;
                top: 9px;
                margin: 0 8px;
                vertical-align: middle;
                width: 13px;
                height: 13px;
                background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNiAyNiI+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBmaWxsPSIjYzljOWNhIiBkPSJNMjUuMTgxIDIzLjUzNWwtMS40MTQgMS40MTQtNy4zMTUtNy4zMTRBOS45NjYgOS45NjYgMCAwIDEgMTAgMjBDNC40NzcgMjAgMCAxNS41MjMgMCAxMFM0LjQ3NyAwIDEwIDBzMTAgNC40NzcgMTAgMTBjMCAyLjM0Mi0uODExIDQuNDktMi4xNiA2LjE5NWw3LjM0MSA3LjM0ek0xMCAyYTggOCAwIDEgMCAwIDE2IDggOCAwIDAgMCAwLTE2eiIvPjwvc3ZnPg==);
                display: inline-block;
                background-position: 0 0;
                background-size: contain;
                background-repeat: no-repeat;
                
            }
            .input{
                    width: 100%;
                    height: 30px;
                    line-height: 18px;
                    background: rgba(0,0,0,0);
                    font-size: 14px;
                    color: #333;
                    border: none;
                    outline: none;
            }
            .holder{
                position: absolute;
                left: 30px;
                top: 5px;
                font-size: 14px;
                color: #c9c9c9;
                background: rgba(0,0,0,0);
                pointer-events: none;
            }
            .close{
                position: absolute;
                right: 0;
                top: 0;
                width: 30px;
                height: 30px;
                line-height: 28px;
                text-align: center;
                .empty{
                    display: none;
                    vertical-align: middle;
                    width: 14px;
                    height: 14px;
                    background-image:url("../assets/x.png");
                    background-position: 0 0;
                    background-size: contain;
                    background-repeat: no-repeat;
                }
            }
        }
    }
    .m-input::after{
        position: absolute;
    }
</style>