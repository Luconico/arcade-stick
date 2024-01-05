<script setup lang="ts">
import useArcadePhysics from '../composables/useArcadePhysics';

const props = defineProps({
floorPosition: { type: Number, default: 300 },
});

const { position } = useArcadePhysics(props.floorPosition);

</script>
<template>
    <div class="arcade-prize-container" :style="{ transform: `translate(${position.x}px, ${position.y}px)` }"></div>
</template>

<style>


.arcade-prize-container {
    position: absolute;
    width: 20px;
    height: 20px;
    background-color: red;
    border-radius: 50%;
    border-top: 2px solid black;
}
</style>
