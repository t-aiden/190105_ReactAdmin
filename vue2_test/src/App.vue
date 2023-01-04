


<!--  
  
  $attrs
  $slots
  $snode
  

-->





<template>
  <div class ="app">
    <h1>我是Vue2写的效果</h1>
    <Demo msg="你好啊" school="尚硅谷">
      <!-- 插槽，父组件已穿东西，需要在子组件 '挖坑' -->
       <span> 尚硅谷</span>  
       <span> 尚硅谷!!!!!</span>
       <template slot="test1">
          <span> 尚硅谷1111</span>
       </template>
       <template slot="test2">
          <span> 尚硅谷22222</span>
       </template>
    </Demo>

     
    
  </div>
</template>

<script>
import Demo from './components/Demo'
export default {
  name: 'App',
  components:{Demo}

}
</script>

<style>
 .app{
   background-color: gray;
   padding:10px;

 }
