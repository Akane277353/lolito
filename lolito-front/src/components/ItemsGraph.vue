<script setup>
import { watchEffect, reactive , ref} from 'vue';
import * as vNG from "v-network-graph"
import {
  ForceLayout,
} from "v-network-graph/lib/force-layout"
const props = defineProps({
  items: {
    required: true
  }
});


var nodes = ref({})

var edges = ref({})


watchEffect(async () => {
  if(props.items.length > 0){
    props.items.forEach((item, i) => {
        if(!nodes.value.hasOwnProperty(item.id)){
            nodes.value[item.id] = { name: item.name, face: item.image.full }
        }
    });
    var cpt = 0
    props.items.forEach((item, i) => {
        item.from.forEach((frome) => {
          edges.value[cpt] = { source: item.id.toString(), target: frome.toString() } 
          cpt++
        });

    });
  }
})

const configs = reactive(
  vNG.defineConfigs({
    view: {
      layoutHandler: new ForceLayout({
        positionFixedByDrag: false,
        positionFixedByClickWithAltKey: true,
        createSimulation: (d3, nodes, edges) => {
          // d3-force parameters
          const forceLink = d3.forceLink(edges).id(d => d.id)
          return d3
            .forceSimulation(nodes)
            .force("edge", forceLink.distance(40).strength(0.5))
            .force("charge", d3.forceManyBody().strength(-800))
            .force("center", d3.forceCenter().strength(0.05))
            .alphaMin(0.001)
        }
      }),
    }
  })
)


</script>

<template>

<v-network-graph
    class="graph"
    :nodes="nodes"
    :edges="edges"
    :configs="configs"
  >
  <defs>
      <!--
        Define the path for clipping the face image.
        To change the size of the applied node as it changes,
        add the `clipPathUnits="objectBoundingBox"` attribute
        and specify the relative size (0.0~1.0).
      -->
      <clipPath id="faceCircle" clipPathUnits="objectBoundingBox">
        <circle cx="0.5" cy="0.5" r="0.5" />
      </clipPath>
    </defs>

    <!-- Replace the node component -->
    <template #override-node="{ nodeId, scale, config, ...slotProps }">
      <!-- circle for filling background -->
      <circle
        class="face-circle"
        :r="config.radius * scale"
        fill="#ffffff"
        v-bind="slotProps"
      />
      <!--
        The base position of the <image /> is top left. The node's
        center should be (0,0), so slide it by specifying x and y.
      -->
      <image
        class="face-picture"
        :x="-config.radius * scale"
        :y="-config.radius * scale"
        :width="config.radius * scale * 2"
        :height="config.radius * scale * 2"
        :xlink:href="`${nodes[nodeId].face}`"
        clip-path="url(#faceCircle)"
      />
      <!-- circle for drawing stroke -->
      <circle
        class="face-circle"
        :r="config.radius * scale"
        fill="none"
        stroke="#808080"
        :stroke-width="1 * scale"
        v-bind="slotProps"
      />
    </template>
  </v-network-graph>

</template>

<style scoped>

.face-circle,
.face-picture {
  transition: all 0.1s linear;
}

.face-picture {
  pointer-events: none;
}
</style>
