<script setup>
import { defineProps, onMounted } from 'vue';
const props = defineProps({
  item: {
    required: true
  }
});
const emit = defineEmits(['close'])
onMounted(() => {
  console.log(props.item)
})
</script>

<template >
    <div class="menu">
      <div class="inter-menu">
        <div class="top-menu">
          <img :src="item.image.full">
          <div class="center-menu">
            <div>{{ item.name }}</div>
            <div>Couts : {{ item.gold.total }}</div>
          </div>
          <img id="close" src="../assets/croix.png" @click="emit('close')">
        </div>
        <div class="bottom-menu">{{ item.plaintext != "" ? item.plaintext : "Pas de description" }}</div>
      </div>
    </div>
</template>

<style scoped>

.menu {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #0e0e0e;
  border: 2px solid #666; 
  border-radius: 10px;
  padding: 20px;
  width: 300px; 
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5); 
  color: #fff; 
}

.top-menu {
  display: flex;
  align-items: center;
}

.top-menu img {
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 50%;
}

.center-menu {
  flex-grow: 1;
  text-align: center;
}

.center-menu div {
  margin-bottom: 5px;
}

#close {
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.bottom-menu {
  margin-top: 10px;
  font-style: italic;
  color: #ccc; 
}


</style>