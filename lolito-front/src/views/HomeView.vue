<script setup>
import ItemsGraph from '@/components/ItemsGraph.vue';
import {onMounted, ref, watch} from 'vue';
import {useItemsStore} from '@/stores/items-store/items-store';

const storeItems = useItemsStore();

const search = ref('');
const categorie = ref('!');
onMounted(() => {
  storeItems.getAllCategories();
  storeItems.getAllItems();
})

watch([search, categorie], () => {
  storeItems.searchItem(search.value, categorie.value);
})


</script>

<template>
  <div class="home">
    <img id="logo" src="../assets/logo.png" alt="logo" width="200">
    <div class="recherche">
      <input id="search" type="text" v-model="search" placeholder="Recherche"/>
      <select id="search" v-model="categorie">
        <option value="!">Toutes les catégories</option>
        <option v-for="categorie in storeItems.getCategories" :value="categorie">{{ categorie }}</option>
      </select>
    </div>
    <ItemsGraph :items="storeItems.getItems" />
  </div>
</template>

<style scoped>
.home {
  display: flex;
  flex-direction: column;  
}

.recherche {
  display: flex;
}

#logo {
  margin-left: auto;
  margin-right: auto;
}

#search {
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  padding: 10px;
  font-size: 16px;
  border: 2px solid #666;
  border-radius: 5px;
  background-color: #0e0e0e; 
  color: #fff; 
  margin-bottom: 10px;
}

#search::placeholder {
  color: #999; 
}


</style>
