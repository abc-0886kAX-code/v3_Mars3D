<!--
 * @Author: maggot-code
 * @Date: 2022-03-07 17:02:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-02 13:34:16
 * @Description: file content
-->
<script setup lang='ts'>
// import * as mars3d from 'mars3d';
import hedaoJSON from '@/assets/json/huaihe.json';
import LineJSON from '@/assets/json/line.json';
import shuikuJSON from '@/assets/json/shuiku.json';
import { useBasicsModel } from '@/hooks/mars3d/use-basics-model';
import { useFloodDeduce } from '@/hooks/mars3d/use-flood-deduce';
import { useGltfModel } from '@/hooks/mars3d/use-gltf-model';
import { useLocation } from '@/hooks/mars3d/use-location';
import { useMapEffect } from '@/hooks/mars3d/use-map-effect';
import { useMars3d } from '@/hooks/mars3d/use-mars3d';
import { usePathPlan } from '@/hooks/mars3d/use-path-plan';
import { useSceneEffects } from '@/hooks/mars3d/use-scene-effects';
import { callbackParams, useTilesetModel } from '@/hooks/mars3d/use-tileset-model';
// import { getDrive } from '@/api/geo-server';
import { onBeforeUnmount, ref } from 'vue';

const selectLabel = ref('场景特效')


const dropdownOptions = [
    {
        key: 'rain',
        label: '下雨场景',
        disabled: false,
        handler: () => { scene.rain() }
    },
    {
        key: 'snow',
        label: '下雪场景',
        disabled: false,
        handler: () => { scene.snow() }
    },
    {
        key: 'fog',
        label: '浓雾场景',
        disabled: false,
        handler: () => { scene.fog() }
    },
    {
        key: 'reset',
        label: '重置场景',
        disabled: false,
        handler: () => { scene.unmount() }
    }
]

const scene = useSceneEffects();

const getModelData: callbackParams = (event) => {
    console.log(event.graphic.attr);
}

const region = useGltfModel({
    id: 'region',
    url: '//data.mars3d.cn/gltf/mars/shanghai/scene.gltf',
    position: [116.624565, 40.310797, 25],
    scale: 520,
    clampToGround: true,
    attr: {
        label: {
            title: '',
            type: '',
        },
        value: {
            type: '天安门',
        }
    },
})

const feiji = useGltfModel({
    id: 'feiji',
    url: '//data.mars3d.cn/gltf/mars/feiji.glb',
    position: [116.595159, 40.325770, 2000],
    attr: {
        label: {
            title: 'gltf格式模型示例',
            type: '类型',
            material: ''
        },
        value: {
            type: 'ModelEntity',
            material: ''
        }
    },
    tetrahedron:true,
    tetrahedronHeight:2200
})


const zhuba = useTilesetModel({
    id: 'zhuba',
    url: 'src/assets/3dtileset/zhuba/tileset.json',
    position: { lng: 116.614412, lat: 40.308022, alt: 45 },
    rotation: { z: -44.5, x: 0, y: 0 },
    scale: 0.7
}, getModelData)


const xiyihongdao = useTilesetModel({
    id: 'xiyihongdao',
    url: 'src/assets/3dtileset/xiyihongdao/tileset.json',
    position: { lng: 116.612872, lat: 40.304438, alt: 45 },
    rotation: { z: -38, x: 0, y: 0 },
    scale: 0.7
}, getModelData)

const dongyihongdao = useTilesetModel({
    id: 'dongyihongdao',
    url: 'src/assets/3dtileset/dongyihongdao/tileset.json',
    position: { lng: 116.619394, lat: 40.310979, alt: 45 },
    rotation: { z: -47, x: 0, y: 0 },
    scale: 0.7
}, getModelData)


const shuiku = useFloodDeduce({
    position: shuikuJSON,
    waterLevel: 200
});
const hedao = useFloodDeduce({
    position: hedaoJSON,
    waterLevel: 100
});
const { routelatlon } = LineJSON;
const pathPlan = usePathPlan({
    positions: routelatlon
});

function handlerStart() {
    shuiku.start().run(false);
    hedao.start().run(true);
}

function handlerEnd() {
    shuiku.stop();
    hedao.stop();
}

function handlerReset() {
    shuiku.reset();
    hedao.reset();
}
function handlerRouteLineStart() {
    console.log('开始规划路线');
    pathPlan.draw();
    // const start = [116.613599, 40.304793];
    // const end = [116.391253, 39.907146];
    // return getDrive(start, end)
}
function handlerRouteLineRun() {
    console.log('开始移动');
    pathPlan.run().locking();
}

function handlerSelect(key, option) {
    const { handler, label } = option;
    key === 'reset' ? selectLabel.value = '场景特效' : selectLabel.value = label;
    handler();
}

onBeforeUnmount(() => {
    shuiku.stop();
    hedao.stop();
});
useMars3d("cesium-vessel")
    .then(useLocation)
    .then(useBasicsModel)
    .then(useMapEffect)
    .then(scene.mount)
    .then(shuiku.mount)
    .then(hedao.mount)
    .then(pathPlan.mount)
    .then(zhuba.mount)
    .then(xiyihongdao.mount)
    .then(dongyihongdao.mount)
    .then(feiji.mount)
    .then(region.mount)
    .catch((error) => {
        console.log(error);
    });
</script>

<template>
    <div class="cesium-vessel" id="cesium-vessel">
        <div class="cesium-vessel-control">
            <n-button @click="handlerStart">模拟开始</n-button>
            <n-button @click="handlerEnd">模拟结束</n-button>
            <n-button @click="handlerReset">模拟重置</n-button>
            <n-button @click="handlerRouteLineStart">开始规划路线</n-button>
            <n-button @click="handlerRouteLineRun">开始移动</n-button>
            <n-dropdown
                trigger="hover"
                :options="dropdownOptions"
                @select="handlerSelect"
                size="huge"
            >
                <n-button>{{ selectLabel }}</n-button>
            </n-dropdown>
        </div>
    </div>
</template>

<style scoped lang='scss'>
@import "./cesium.scss";
</style>
