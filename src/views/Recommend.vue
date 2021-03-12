<template>
  <div class="recommend">
    <Title>推荐歌单</Title>
    <ul class="recommendList">
      <router-link v-for="rem in recomendMusicList" :key='rem.id' :to="{path:'/musiclist/'+rem.id,query:{img:rem.picUrl,
      playCount:rem.playCount,
      name:rem.name,
      id:rem.id
      }}" tag="li">
        <div>
          <img :src="rem.picUrl">
          <span>{{rem.playCount|formatNum}}</span>
        </div>
        <p>{{rem.name|substr(26)}}</p>
      </router-link>
    </ul>
    <Loading v-if="recomendMusicList.length <= 0"/>
    <Title>最新音乐</Title>
    <MusicItem :newMusicList='newMusicList' @playMusic='playMusic'></MusicItem>
  </div>
</template>

<script>
import Title from '../components/Title'
import MusicItem from '../components/Musicitem'
import Loading from '../components/Loading'
export default {
  name: 'Recommend',
  methods: {
    playMusic(id){
      this.$emit('playMusic',id)
    }
  },
  components: {
    Title,
    MusicItem,
    Loading
  },
  data() {
    return {
      recomendMusicList:[],
      newMusicList:[]
    }
  },
  beforeRouteEnter (to, from, next) {
    // console.log(to.meta.title)
    next(vm=>{
      vm.$axios.get('/personalized?limit=6').then(data=>{
        // console.log(data)
        vm.recomendMusicList=data.data.result
      });
      vm.$axios.get('/personalized/newsong?').then(data=>{
        vm.newMusicList=data.data.result
        // console.log(vm.newMusicList)
      });
    })
  },
  filters:{
    formatNum(value){
      return (value/10000).toFixed(1)+"万";
    },
    substr(value,len){
      return value.substr(0,len)+'...'
    }
  }
}
</script>

<style lang='less' scoped>
  ul.recommendList{
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    li{
      width: 33%;
      margin-top: 10px;
      div{
        position: relative;
        padding-bottom: 5%;
        img{
          border-radius: 10px;
        }
        span{
          top: 2px;
          right: 3px;
          position: absolute;
          color: #fff;
          text-shadow: 1px 1px 3px rgba(0,0,0,.5);
        }
      }
      p{
        // display: -webkit-box;
        text-align: left;
        // -webkit-line-clamp: 2;
        // -webkit-box-orient: vertical;
        font-size: 13px;
        padding: 6px 2px 0 6px;
        // overflow: hidden;
        // min-height: 30px;
        // line-height: 1.2;
      }
    }
  }
</style>
