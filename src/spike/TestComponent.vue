<template>
  <div id="testcomp" v-on:click="onClick">TEST</div>
</template>
<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
@Component
export default class TestComponent extends Vue{
  message: string = 'Hellp'
  onClick() : void{
      window.alert(this.message);
  }
  mounted(){
    window.alert('mounted!');
  }
}
</script>
<style>
#testcomp{
  width:100px;
  height:100px;
  background-color: green;
}
</style>
