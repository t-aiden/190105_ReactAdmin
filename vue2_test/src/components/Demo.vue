<template>
    <div class="demo">
        <h2> 我是Demo组件 </h2>
        <slot></slot>   <!-- 在子组件 "挖坑" -->
    </div>
</template>

<script>
    export default{
        name:'Demo',
        props:['msg','school'],
        mounted(){
            console.log(this)
        },
    }

</script>

<style>
  .demo{
      background-color: orange;
      padding: 10px;
  }

</style>