<!--
 * @Author: maggot-code
 * @Date: 2022-03-07 17:02:12
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-06 15:42:55
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

const region = useGltfModel({
    id: 'region',
    url: '//data.mars3d.cn/gltf/mars/shanghai/scene.gltf',
    position: [116.624565, 40.310797, 100],
    scale: 200,
    // clampToGround: true,
    attr: {
        label: {
            title: '区域',
            type: '类型',
            material: ''
        },
        value: {
            type: 'ModelEntity',
            material: ''
        }
    }
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
    }
})

// 天安门
const tiananmen = useGltfModel({
    id: 'tiananmen',
    url: import.meta.env.VITE_BASE + '/model/gate/Tiananmen+Gate.gltf',
    position: [116.39156909573994, 39.90733150530523, 0],
    clampToGround: true,
    scale: 2.5,
    attr: {
        label: {
            title: '天安门',
            type: '类型',
            material: ''
        },
        value: {
            type: '模型',
            material: ''
        }
    },
    tetrahedron: true,
    tetrahedronHeight: 500,
})
// 水立方
const shuilifang = useGltfModel({
    id: 'shuilifang',
    url: import.meta.env.VITE_BASE + '/model/gate/Watercube.gltf',
    position: [116.38424223503922, 39.99151313670175, 0],
    clampToGround: true,
    scale: 1.2,
    attr: {
        label: {
            title: '水立方',
            type: '类型',
            material: ''
        },
        value: {
            type: '模型',
            material: ''
        }
    },
    tetrahedron: true,
    tetrahedronHeight: 500,
})
// 鸟巢
const niaochao = useGltfModel({
    id: 'niaochao',
    url: import.meta.env.VITE_BASE + '/model/gate/niaochao1.gltf',
    position: [116.39006386843438, 39.99144168899861, 0],
    clampToGround: true,
    scale: 1.2,
    attr: {
        label: {
            title: '鸟巢',
            type: '类型',
            material: ''
        },
        value: {
            type: '模型',
            material: ''
        }
    },
    tetrahedron: true,
    tetrahedronHeight: 500,
})
// 人民英雄纪念碑
const renmin = useGltfModel({
    id: 'renmin',
    url: import.meta.env.VITE_BASE + '/model/gate/renmjinian.gltf',
    position: [116.391302, 39.903210, 0],
    clampToGround: true,
    scale: 1.5,
    attr: {
        label: {
            title: '人民英雄纪念碑',
            type: '类型',
            material: ''
        },
        value: {
            type: '模型',
            material: ''
        }
    },
    tetrahedron: true,
    tetrahedronHeight: 500,
})
// 盘古七星酒店
const pangu = useGltfModel({
    id: 'pangu',
    url: import.meta.env.VITE_BASE + '/model/gate/pangu.gltf',
    position: [116.380439, 39.989995, 0],
    clampToGround: true,
    scale: 1.5,
    attr: {
        label: {
            title: '盘古七星酒店',
            type: '类型',
            material: ''
        },
        value: {
            type: '模型',
            material: ''
        }
    },
    tetrahedron: true,
    tetrahedronHeight: 500,
})
// 国家大剧院
const dajuyuan = useGltfModel({
    id: 'dajuyuan',
    url: import.meta.env.VITE_BASE + '/model/gate/nationaltheater.gltf',
    position: [116.383911, 39.903552, 0],
    clampToGround: true,
    scale: 1.5,
    attr: {
        label: {
            title: '国家大剧院',
            type: '类型',
            material: ''
        },
        value: {
            type: '模型',
            material: ''
        }
    },
    tetrahedron: true,
    tetrahedronHeight: 500,
})
// CCTV电视塔
const dianshita = useGltfModel({
    id: 'dianshita',
    url: import.meta.env.VITE_BASE + '/model/gate/CCTV+Headquarters.gltf',
    position: [116.457954, 39.913596, 0],
    clampToGround: true,
    attr: {
        label: {
            title: 'CCTV电视塔',
            type: '类型',
            material: ''
        },
        value: {
            type: '模型',
            material: ''
        }
    },
    tetrahedron: true,
    tetrahedronHeight: 500,
})
// 故宫
const gugong = useGltfModel({
    id: 'gugong',
    url: import.meta.env.VITE_BASE + '/model/gate/gugong.gltf',
    position: [116.390898, 39.916287, 0],
    clampToGround: true,
    scale: 1.2,
    attr: {
        label: {
            title: '故宫博物院',
            type: '类型',
            material: ''
        },
        value: {
            type: '模型',
            material: ''
        }
    },
    tetrahedron: true,
    tetrahedronHeight: 500,
})
// 北京南站
const beijingnan = useGltfModel({
    id: 'beijingnan',
    url: import.meta.env.VITE_BASE + '/model/gate/beijingnan.gltf',
    position: [116.372852, 39.863520, 0],
    clampToGround: true,
    attr: {
        label: {
            title: '北京南站',
            type: '类型',
            material: ''
        },
        value: {
            type: '模型',
            material: ''
        }
    },
    tetrahedron: true,
    tetrahedronHeight: 500,
})
// 京都信苑
const jingduxinyuan = useGltfModel({
    id: 'jingduxinyuan',
    url: import.meta.env.VITE_BASE + '/model/gate/nanyuan.gltf',
    position: [116.306054, 39.897079, 0],
    clampToGround: true,
    attr: {
        label: {
            title: '京都信苑',
            type: '类型',
            material: ''
        },
        value: {
            type: '模型',
            material: ''
        }
    },
    tetrahedron: true,
    tetrahedronHeight: 500,
})
// 天坛
const tiantan = useGltfModel({
    id: 'tiantan',
    url: import.meta.env.VITE_BASE + '/model/gate/QND.gltf',
    position: [116.406734, 39.882178, 0],
    clampToGround: true,
    attr: {
        label: {
            title: '天坛',
            type: '类型',
            material: ''
        },
        value: {
            type: '模型',
            material: ''
        }
    },
    tetrahedron: true,
    tetrahedronHeight: 500,
})
// 回音壁
const huiyinbi = useGltfModel({
    id: 'huiyinbi',
    url: import.meta.env.VITE_BASE + '/model/gate/huiyinbi.gltf',
    position: [116.406916, 39.876917, 0],
    clampToGround: true,
    attr: {
        label: {
            title: '回音壁',
            type: '类型',
            material: ''
        },
        value: {
            type: '模型',
            material: ''
        }
    },
    tetrahedron: true,
    tetrahedronHeight: 500,
})
// 体育场
const tiyuchang = useGltfModel({
    id: 'tiyuchang',
    url: import.meta.env.VITE_BASE + '/model/gate/tiyuchang.gltf',
    position: [116.477409, 39.871141, 0],
    clampToGround: true,
    attr: {
        label: {
            title: '体育场',
            type: '类型',
            material: ''
        },
        value: {
            type: '模型',
            material: ''
        }
    },
    tetrahedron: true,
    tetrahedronHeight: 500,
})
// 和谐号
const hexiehao = useGltfModel({
    id: 'hexiehao',
    url: import.meta.env.VITE_BASE + '/model/gate/hexiehao.gltf',
    position: [116.368335, 39.859180, 0],
    clampToGround: true,
    attr: {
        label: {
            title: '和谐号',
            type: '类型',
            material: ''
        },
        value: {
            type: '模型',
            material: ''
        }
    },
    tetrahedron: true,
    tetrahedronHeight: 500,

})


const getModelData: callbackParams = (event) => {
    console.log(event.graphic.attr);
}

const zhuba = useTilesetModel({
    id: 'zhuba',
    url: import.meta.env.VITE_BASE + '/model/3dtileset/zhuba/tileset.json',
    position: { lng: 116.614412, lat: 40.308022, alt: 45 },
    rotation: { z: -44.5, x: 0, y: 0 },
    scale: 0.7,
}, getModelData)


const xiyihongdao = useTilesetModel({
    id: 'xiyihongdao',
    url: import.meta.env.VITE_BASE + '/model/3dtileset/xiyihongdao/tileset.json',
    position: { lng: 116.612872, lat: 40.304438, alt: 45 },
    rotation: { z: -38, x: 0, y: 0 },
    scale: 0.7
}, getModelData)

const dongyihongdao = useTilesetModel({
    id: 'dongyihongdao',
    url: import.meta.env.VITE_BASE + '/model/3dtileset/dongyihongdao/tileset.json',
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

function handlerTan() {
    tiananmen.flyTo()
}

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
    zhuba.unmount()
    xiyihongdao.unmount()
    dongyihongdao.unmount()
    feiji.unmount()
    region.unmount()
    tiananmen.unmount()
    shuilifang.unmount()
    niaochao.unmount()
    renmin.unmount()
    pangu.unmount()
    dajuyuan.unmount()
    dianshita.unmount()
    gugong.unmount()
    beijingnan.unmount()
    jingduxinyuan.unmount()
    tiantan.unmount()
    huiyinbi.unmount()
    tiyuchang.unmount()
    hexiehao.unmount()
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
    .then(tiananmen.mount)
    .then(shuilifang.mount)
    .then(niaochao.mount)
    .then(renmin.mount)
    .then(pangu.mount)
    .then(dajuyuan.mount)
    .then(dianshita.mount)
    .then(gugong.mount)
    .then(beijingnan.mount)
    .then(jingduxinyuan.mount)
    .then(tiantan.mount)
    .then(huiyinbi.mount)
    .then(tiyuchang.mount)
    .then(hexiehao.mount)
    .catch((error) => {
        console.log(error);
    });
</script>

<template>
    <div class="cesium-vessel" id="cesium-vessel">
        <div class="cesium-vessel-control">
            <n-button @click="handlerTan">市中心</n-button>
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
