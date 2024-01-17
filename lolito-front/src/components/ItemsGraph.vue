<script setup>
import { onMounted, ref, watchEffect } from 'vue';
import Graph from 'graphology';
import Sigma from 'sigma';

const props = defineProps({
  items: {
    required: true
  }
});

const sigmaContainer = ref(null);
const graph = new Graph();

onMounted(() => {
    

    graph.addNode("John", { x: 0, y: 10, size: 5, label: "John", color: "blue" });
    graph.addNode("Mary", { x: 10, y: 0, size: 3, label: "Mary", color: "red" });
    graph.addEdge("John", "Mary");

    props.items.forEach((item, i) => {
        if(!graph.hasNode(item.name)){
            graph.addNode(item.name, { x: 0, y: 10, size: 5, label: item.name, color: "blue" });
        }
        
    });


    const container = sigmaContainer.value;

    container.style.height = '800px';
    const renderer = new Sigma(graph, container);
});

watchEffect(async () => {
  console.log("watcher " + props.items.length)
  props.items.forEach((item, i) => {
        if(!graph.hasNode(item.name)){
            console.log(item.name)
            graph.addNode(item.name, { x: i, y: i, size: 5, label: item.name, color: "blue" });
        }
        
    });
})

</script>

<template>

  <div ref="sigmaContainer" id="sigma-container"></div>

</template>

<style scoped>

</style>
