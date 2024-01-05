import { onMounted, onUnmounted, ref } from "vue";


const useArcadePhysics = (floorPosition: number) => {
    const gravity = 0.98;
    const damping = 0.8;
    const dampingHorizontal = 0.98;

    const position = ref({ x: 200, y: 50 });
    const velocity = ref({ x: 0, y: 1 });

    let animationFrameId: number | null = null;

    const update = () => {
        velocity.value.y += gravity;
        velocity.value.x *= dampingHorizontal;
        position.value.x += velocity.value.x;
        position.value.y += velocity.value.y;


        if (position.value.y > floorPosition) {
            position.value.y = floorPosition;
            velocity.value.y *= -damping;


            if (Math.abs(velocity.value.x) < 0.5) {
                velocity.value.x = 0;
            }
        }


        if (Math.abs(velocity.value.x) > 0.01 || Math.abs(velocity.value.y) > 0.01) {
            animationFrameId = requestAnimationFrame(update);
        } else {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        }
    };

    onMounted(() => {
        animationFrameId = requestAnimationFrame(update);
    });

    onUnmounted(() => {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
    });

    return {
        position
    };
};

export default useArcadePhysics;