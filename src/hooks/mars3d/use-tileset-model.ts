/*
 * @Author: zhangxin
 * @Date: 2022-03-23 09:45:31
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-03-25 09:14:49
 * @Description:
 */
import * as mars3d from 'mars3d';

interface TilesetModelOptions {
    id: string | number;
    url: string,
    position?: {
        lng: number;
        lat: number;
        alt: number;
    };
    rotation?: {
        x: number;
        y: number;
        z: number;
    };
    scale?: number,
    flyTo?: boolean;
    popup?: string;
}

export interface callbackParams {
    (event: any): void;
}

class TilesetModel {
    private map!: mars3d.Map;
    private options: TilesetModelOptions;
    model!: mars3d.layer.TilesetLayer;
    constructor(options: TilesetModelOptions, callback: callbackParams) {
        this.options = options;
        this.setupModel();
        this.model.on(mars3d.EventType.click, callback)
    }

    protected setupModel() {
        this.model = new mars3d.layer.TilesetLayer({
            id: this.options.id,
            url: this.options.url,
            maximumScreenSpaceError: 16,
            maximumMemoryUsage: 2048,
            dynamicScreenSpaceError: true,
            cullWithChildrenBounds: false,
            luminanceAtZenith: 0.6,
            position: this.options.position,
            rotation: this.options.rotation, // 自动旋转方向， { x:方向, y:y方向 , z:四周方向}
            // 高亮时的样式
            highlight: {
                // all: true, //全部整体高亮，false时是构件高亮
                type: mars3d.EventType.click, // 默认为鼠标移入高亮，也可以指定click单击高亮
                color: "#00FF00"
            },
            scale: this.options.scale, //自定义缩放比例
            flyTo: this.options.flyTo // 加载完成数据后是否自动飞行定位到数据所在的区域
        })
        if (this.options.popup) {
            this.model.setOptions({ popup: this.options.popup })
        }
    }

    mount = (map: mars3d.Map) => {
        this.map = map;

        this.map.addLayer(this.model);

        return this.map
    }
    unmount = () => {
        if (this.model.hasPopup()) {
            this.model.closePopup()
        }

        this.model.remove();
    }
}


export function useTilesetModel(options: TilesetModelOptions, callback?: callbackParams) {
    return new TilesetModel(options, callback ?? function () { });
}


export default TilesetModel;
