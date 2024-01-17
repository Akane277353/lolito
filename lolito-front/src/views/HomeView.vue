<script setup>
import ItemsGraph from '@/components/ItemsGraph.vue';
import {onMounted} from 'vue';
import {useItemsStore} from '@/stores/items-store/items-store';

const storeItems = useItemsStore();

onMounted(() => {
  storeItems.getAllItems();
})

</script>

<template>
  <div class="home">
    <input id="search" type="text" />
    <ItemsGraph id="item-graph" :items="storeItems.getItems" />
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
