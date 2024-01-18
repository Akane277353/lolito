<script setup>
import ItemsGraph from '@/components/ItemsGraph.vue';
import {onMounted, ref} from 'vue';
import {useItemsStore} from '@/stores/items-store/items-store';

const storeItems = useItemsStore();

onMounted(() => {
  storeItems.getAllItems();
})

</script>

<template>
  <div class="home">
    <input id="search" type="text" />
    <!--<ItemsGraph id="item-graph" :items="storeItems.getItems" />-->
    <ItemsGraph id="graph" :items="storeItems.getItems" />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;
}

#search {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 50px;
  margin-bottom: 50px;
}
.graph {
  width: 90%;
  height: 800px;
  border: 1px solid #000;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  background-color: #ffffff;
}
#item-graph {
  background-color: #ffffff;
  width: 90%;
  margin: 0;
  padding: 0;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
}
</style>
