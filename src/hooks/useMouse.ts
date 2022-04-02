/*
 * @Author: zhangxin
 * @Date: 2022-03-30 18:02:49
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-03-31 09:53:26
 * @Description:
 */
import { onMounted, onUnmounted, ref } from 'vue';


export function useMouse() {
    const x = ref(0);
    const y = ref(0);

    function update(event) {
        x.value = event.pageX;
        y.value = event.pageY;
    }

    onMounted(() => window.addEventListener('mousemove', update))
    onUnmounted(() => window.removeEventListener('mousemove', update))


    return { x, y }
}
