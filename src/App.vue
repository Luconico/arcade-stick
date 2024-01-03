<script setup lang="ts">
import ArcadeButtom from './components/ArcadeButtom.vue';
import ArcadeStick from './components/ArcadeStick.vue';

const getAngle = (angle: number) => {
  console.log(angle);
};

</script>

<template>
  <div class='container'>
    <ArcadeButtom />
    <ArcadeStick @moving='getAngle' />
  </div>
</template>

<style></style>
