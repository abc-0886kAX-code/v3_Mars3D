/*
 * @Author: zhangxin
 * @Date: 2022-03-23 16:36:14
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-02 16:52:17
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
    tetrahedron?: boolean;
    tetrahedronHeight?: number;
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
    tetrahedronPrimitive!: mars3d.graphic.Tetrahedron;
    tetrahedronPosition!: Array<number>;
    constructor(options: ModelEntityOptions) {
        this.options = options;

        this.setupModel();
    }

    protected setupModel() {

        // 根据模型 position 定位四面体的 position , 并且将四面体的高度与经纬度整合起来
        if (this.options.tetrahedron && this.options.tetrahedronHeight) {
            this.tetrahedronPosition = [...this.options.position.slice(0, 2), this.options.tetrahedronHeight]
        }

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

        this.tetrahedronPrimitive = new mars3d.graphic.Tetrahedron({
            position: this.options.tetrahedronHeight ? this.tetrahedronPosition : this.options.position,
            style: {
                width: 25,
                height: 40,
                color: "rgba(200,200,0,0.7)",
                moveHeight: 50
            },
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

        if (this.options.tetrahedron) {
            this.tetrahedronPrimitive.addTo(this.map.getLayerById("gltfModel"));
        }


        return this.map;
    }

    unmount = () => {
        this.model.destroy();
        if (this.tetrahedronPrimitive) {
            this.tetrahedronPrimitive.destroy();
        }
    }
}

export function useGltfModel(options: ModelEntityOptions) {
    return new GltfModel(options)
}
