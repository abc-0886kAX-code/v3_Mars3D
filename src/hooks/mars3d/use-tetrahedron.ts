/*
 * @Author: zhangxin
 * @Date: 2022-04-06 10:31:02
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-06 11:23:50
 * @Description:  四面体、倒立三角椎体(标记渲染方法)
 */

import * as mars3d from 'mars3d';

interface tetrahedronOptions {
    position: number[];
}

class Tetrahedron {
    private map!: mars3d.Map;
    private options: tetrahedronOptions;
    tetrahedronPrimitive!: mars3d.graphic.Tetrahedron;
    constructor(options: tetrahedronOptions) {
        this.options = options;

        this.setupTetrahedronPrimitive();
    }

    protected setupTetrahedronPrimitive() {
        this.tetrahedronPrimitive = new mars3d.graphic.Tetrahedron({
            position: this.options.position,
            style: {
                width: 25,
                height: 40,
                color: "rgba(200,200,0,0.7)",
                moveHeight: 50
            },
        })
    }
    mount = (map: mars3d.Map) => {
        this.map = map;

        this.tetrahedronPrimitive.addTo(this.map.getLayerById("gltfModel"));

        return this.map;
    }
    unmount = () => {
        this.tetrahedronPrimitive.destroy();
    }
}

export function useTetrahedron(options: tetrahedronOptions) {
    return new Tetrahedron(options)
}
