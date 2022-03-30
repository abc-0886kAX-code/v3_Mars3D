/*
 * @Author: zhangxin
 * @Date: 2022-03-23 16:36:14
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-03-25 09:51:59
 * @Description:
 */
import * as mars3d from 'mars3d';

interface ModelEntityOptions {
    id: string | number;
    url: string;
    position: Array<any>;
    heading?: number;
    scale?: number;
    clampToGround?: boolean;
    attr?: object;
}

interface FlyToOptions {
    radius?: number;
    heading?: number;
    duration?: number;
}

class GltfModel {
    private map!: mars3d.Map;
    private options: ModelEntityOptions;
    model!: mars3d.graphic.ModelEntity;
    constructor(options: ModelEntityOptions) {
        this.options = options;
        this.setupModel();
    }

    protected setupModel() {
        this.model = new mars3d.graphic.ModelEntity({
            id: this.options.id,
            position: this.options.position,
            style: {
                url: this.options.url,
                heading: this.options.heading, //方向角
                scale: this.options.scale, //比例
                clampToGround: this.options.clampToGround, //是否贴地
            },
            attr: this.options.attr// 自定义属性
        })
    }

    flyTo = (flyToOptions?: FlyToOptions) => {
        return this.model.flyTo({
            radius: flyToOptions?.radius || 100, //相机距离目标点的距离
            heading: flyToOptions?.heading, //方向角度值
            duration: flyToOptions?.duration, //飞行时间
            minHeight: 2000
        })
    }

    mount = (map: mars3d.Map) => {
        this.map = map;

        this.model.addTo(this.map.getLayerById("gltfModel"));

        return this.map;
    }

    unmount = () => {
        this.model.destroy();
    }
}

export function useGltfModel(options: ModelEntityOptions) {
    return new GltfModel(options)
}
