<script setup lang="ts">


</script>

<template>
    <div class="arcade-button-container">
        <button class="arcade-button"></button>
    </div>
</template>

<style>
.arcade-button-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
}

.arcade-button {
    background-image: linear-gradient(to bottom right, #ff0000, #cc0000);
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    color: #fff;
    font-size: 1.5rem;
    text-shadow: 1px 1px #000;
    box-shadow: 0 8px #800, 0 15px 15px rgba(0, 0, 0, 0.5);
    outline: none;
    cursor: pointer;
    user-select: none;
    position: relative;
    overflow: hidden;
}

.arcade-button:active {
    box-shadow: 0 5px #800;
    top: 3px;
}

.arcade-button:before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    z-index: -1;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent 70%);
    border-radius: 50%;
    transform: scale(0.9, 0.9);
    transition: transform 0.2s;
}

.arcade-button:hover:before {
    transform: scale(1.1, 1.1);
}

.arcade-button:active:before {
    transform: scale(0.85, 0.85);
}

.arcade-button:focus {
    outline: none;
}
</style>
