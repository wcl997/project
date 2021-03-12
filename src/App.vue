<template>
  <div id="app" style='padding-bottom:50px;'>
    <!-- <Loading /> -->
    <!-- <Download></Download> -->
    <TopNav v-show="$route.meta.showNav"></TopNav>
    <div >
      <!-- :style="{
      paddingTop:'40px',
    }" -->
      <keep-alive>
        <router-view @playMusic='playMusic'/>
      </keep-alive>
    </div>
      <Play :musicID='$root.playingMusic.musicID'
            
            ></Play>
  </div>
</template>

<script>
  import TopNav from "./components/TopNav"
  import Play from './components/Play'
  // import Loading from './components/Loading'
  // import Download from './components/Download'
  export default {
    methods: {
      playMusic(id){
        this.musicID=id
      }
    },
    components:{
      TopNav,
      Play
      // Download
      // Loading
    }
  }
</script>
<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
