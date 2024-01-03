<script setup lang="ts">
import { ref, onUnmounted, onMounted, watch } from 'vue';

const emits = defineEmits(['moving']);

const isDragging = ref(false);
const stickTop = ref<HTMLElement | null>(null);

const stickCircle = ref<HTMLElement | null>(null);

const calculateAngle = (clientX: number) => {
    if (!stickTop.value) return 0;

    const { left, width } = stickTop.value.getBoundingClientRect();
    const centerX = left + width / 2;
    const dx = clientX - centerX;

    const angle = (dx / width) * 2 * 20;
    return Math.max(-20, Math.min(20, angle));
};

const handleMove = (event: MouseEvent | TouchEvent) => {
    if (!stickTop.value || !stickCircle.value) return;

    const clientX = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;

    const angle = isDragging.value ? calculateAngle(clientX) : 0;
    setAngle(angle);

    handleEmits(angle);

    if (angle === 0) {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('touchmove', handleMove);
    }
};

const setAngle = (angle: number) => {
    if (!stickTop.value || !stickCircle.value) return;

    stickTop.value.style.transform = `translateY(57px) rotate(${angle}deg)`;
    stickCircle.value.style.transform = `rotate(${-angle}deg)`;
};


const handleDragging = (toggleDragging: boolean) => {
    isDragging.value = toggleDragging;
    if (toggleDragging) {
        window.addEventListener('mousemove', handleMove);
        window.addEventListener('touchmove', handleMove, { passive: false });
    } else {
        window.removeEventListener('mousemove', handleMove);
        window.removeEventListener('touchmove', handleMove);
    }
};

const handleEmits = (angle: number) => {
    emits('moving', angle);
};

watch(isDragging, (value) => {
    if (value) return;
    setAngle(0);
});

onMounted(() => {
    window.addEventListener('mouseup', () => handleDragging(false));
    window.addEventListener('touchend', () => handleDragging(false));
});

onUnmounted(() => {
    window.removeEventListener('mousemove', handleMove);
    window.removeEventListener('mouseup', () => handleDragging(false));
    window.removeEventListener('touchmove', handleMove);
    window.removeEventListener('touchend', () => handleDragging(false));
});

</script>

<template>
    <div class='arcade-stick'>
        <div class='arcade-stick_top' ref='stickTop'>
            <div class='arcade-stick_handle' @mousedown.prevent='handleDragging(true)'
                @touchstart.prevent='handleDragging(true)'>
            </div>
            <div class='arcade-stick_bar'></div>
            <div class='arcade-stick_circle' ref='stickCircle'></div>
        </div>
        <div class='arcade-stick_bottom'>
            <div class='arcade-stick_base'>
            </div>
        </div>
    </div>
</template>

<style>
.arcade-stick {
    width: 100px;
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.arcade-stick_top {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform: translateY(57px);
    transform-origin: 50% 100%;
    z-index: 1;
}

.arcade-stick_bottom {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    filter: drop-shadow(0px 7px 0px #800);
}

.arcade-stick_handle {
    width: 30%;
    height: 100%;
    background-color: #000;
    border-radius: 65% 65% 75% 75%;
    transform: translateY(13px);
    z-index: 2;
    cursor: grab;
}

.arcade-stick_bar {
    width: 15%;
    height: 100%;
    background-color: #ccc;
    transform: translateY(10px);
    border-radius: 0% 0% 5px 5px;
    z-index: 1;
}

.arcade-stick_circle {
    width: 50%;
    height: 50%;
    border-radius: 50%;
    background-color: #000;
}

.arcade-stick_base {
    width: 80%;
    height: 80%;
    transform: rotateX(45deg);
    clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
    background-image: linear-gradient(to bottom right, #ff0000, #cc0000);
}
</style>
