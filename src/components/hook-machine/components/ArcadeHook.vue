<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';

const props = defineProps({
    desiredPosition: { type: Number, default: 0 },
    releaseRope: { type: Boolean, default: false },
});

const left = ref(0);
const currentPosition = ref(0);

const ropeHeight = ref(1);

const ropeSkew = ref(0);



watch(() => props.desiredPosition, (newValue) => {
    currentPosition.value = newValue;
});

const update = () => {
    if (left.value < 0) left.value = 0;
    if (left.value > 100) left.value = 100;

    if (currentPosition.value > 0) {
        left.value += 0.25;
        ropeSkew.value = -4;
    }

    if (currentPosition.value < 0) {
        left.value -= 0.25;
        ropeSkew.value = 4;
    }

    if (currentPosition.value === 0) {
        ropeSkew.value = 0;
    }

    if (props.releaseRope) {
        ropeHeight.value += 2.5;
    }

    if (!props.releaseRope && ropeHeight.value > 1) {
        ropeHeight.value -= 2.5;
    }

    left.value = Math.round(left.value * 100) / 100;
    requestAnimationFrame(update);
};

onMounted(() => {
    requestAnimationFrame(update);
});

</script>
<template>
    <div class="arcade-hook-container">
        <div class='arcade-hook-edge-left'></div>

        <div class='arcade-hook-rail'></div>

        <div class='arcade-hook-body-container'>
            <div class='arcade-hook-body' :style="{ left: `${left}%` }">
                <div class='arcade-hook-body-top'> </div>
                <div class='arcade-hook-rope' :style='{ transform: `skewX(${ropeSkew}deg)`, height: `${ropeHeight + 80}px` }'></div>
                <div class='arcade-hook-body-bottom'
                    :style='{ transform: `translateX(${ropeSkew * 1.8}px) rotateZ(${ropeSkew * -1}deg)` }'></div>
            </div>
        </div>

        <div class='arcade-hook-edge-right'></div>
    </div>
</template>

<style>
.arcade-hook-container {
    display: flex;
    align-items: center;
    height: 70px;
    justify-content: space-between;
}

.arcade-hook-body-container {
    padding: 0 50px;
    pointer-events: none;
    width: 100%;
    position: absolute;
    top: 0;
}

.arcade-hook-body {
    width: 50px;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    transform: translate(-50%);
    left: 0%;
    position: relative;
    transition: left 0.5s ease-out;
}

.arcade-hook-rail {
    width: 100%;
    height: 9px;
    position: absolute;
    z-index: -1;
    top: 25px;
    background-image: linear-gradient(to bottom, #ccc, #5d5d5d);
}

.arcade-hook-body-top {
    width: 50px;
    height: 50px;
    background-image: linear-gradient(to bottom right, var(--ligth-red), var(--dark-red));
    margin-top: 10px;
    clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
}

.arcade-hook-rope {
    width: 0px;
    height: 80px;
    background-color: #a34f07;
    border: 7px dashed saddlebrown;
    transform: skewX(0deg);
    transform-origin: top;
    transition: all 0.5s ease-out;
}

.arcade-hook-body-bottom {
    width: 30px;
    height: 30px;
    background-image: linear-gradient(to bottom right, var(--ligth-red), var(--dark-red));
    transform: translateX(0px) rotateZ(0deg);
    margin-top: -3px;
    transition: all 0.5s ease-out;
}

.arcade-hook-edge-left {
    width: 15px;
    height: 100%;
    background-image: linear-gradient(to bottom right, var(--ligth-red), var(--dark-red));
    clip-path: polygon(0 0, 100% 0, 100% 68%, 0 100%);
}

.arcade-hook-edge-right {
    width: 15px;
    height: 100%;
    background-image: linear-gradient(to bottom right, var(--ligth-red), var(--dark-red));
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 68%);
}
</style>
