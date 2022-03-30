/*
 * @Author: maggot-code
 * @Date: 2022-03-19 15:36:53
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-03-25 09:55:52
 * @Description: file content
 */
import { isValid, isVoid } from 'biz/utils/checkers';
import { assign } from 'biz/utils/common';
import * as mars3d from 'mars3d';
import mars3dConfig from 'svc/mars3d.json';
import { onBeforeUnmount, onMounted } from 'vue';
import { UseBindLayerPopup } from './use-bind-layer-popup';

export function useMars3d(el: string): Promise<mars3d.Map> {
    let map: Nullable<mars3d.Map>;

    onBeforeUnmount(() => {
        if (isVoid(map)) return Promise.reject(map);

        map!.destroy();
        map = null;
    });

    return new Promise<mars3d.Map>((resolve, reject) => onMounted(() => {
        if (isValid(map)) return reject(map);

        map = new mars3d.Map(el, assign(mars3dConfig, {
            showRenderLoopErrors: import.meta.env.DEV
        }));

        map.addLayer(new mars3d.layer.GraphicLayer({ id: "graphic" }));
        map.addLayer(new mars3d.layer.GraphicLayer({ id: "gltfModel" }));

        UseBindLayerPopup(map.getLayerById('gltfModel'));

        map.on(mars3d.EventType.load, (context) => {
            resolve(context.target);
        });
    }));
}
