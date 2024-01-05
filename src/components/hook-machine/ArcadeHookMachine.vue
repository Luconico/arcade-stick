<script setup lang="ts">
import ArcadeButtom from './components/ArcadeButtom.vue';
import ArcadeStick from './components/ArcadeStick.vue';
import ArcadeHook from './components/ArcadeHook.vue';
import { ref, onMounted } from 'vue';
import ArcadePrize from './components/ArcadePrize.vue';


const currentAngle = ref(0);
const releaseRope = ref(false);

const arcadeBody = ref<HTMLElement | null>(null);
const arcadeBodyHeight = ref<number>(0);

const getAngle = (angle: number) => {
  currentAngle.value = angle;
};

const handleClicked = () => {
  releaseRope.value = !releaseRope.value;
};

const getArcadeBodyHeight = () => {
  if (!arcadeBody.value) return;
  arcadeBodyHeight.value = arcadeBody.value.clientHeight;
};

onMounted(() => {
  getArcadeBodyHeight();
  console.log(arcadeBodyHeight.value);
});
</script>

<template>
  <div class='arcade-hook-machine'>
    <div class='arcade-top'>
      <ArcadeHook :desired-position='currentAngle' :release-rope='releaseRope' />
    </div>
    <div class='arcade-body' ref='arcadeBody'>
      <ArcadePrize :floor-position='arcadeBodyHeight' v-if='arcadeBodyHeight' />
    </div>
    <div class='arcade-botton'>
      <ArcadeButtom @click='handleClicked' />
      <ArcadeStick @moving='getAngle' />
    </div>
  </div>
</template>

<style>
.arcade-hook-machine {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  flex-direction: column;
}

.arcade-top {
  width: 100%;
}

.arcade-body {
  width: 100%;
  height: 100%;
}

.arcade-botton {
  margin-top: auto;
  display: flex;
  align-items: baseline;
  width: 100%;
  justify-content: space-evenly;
}
</style>
