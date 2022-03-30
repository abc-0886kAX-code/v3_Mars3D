/*
 * @Author: zhangxin
 * @Date: 2022-03-25 14:33:56
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-03-25 16:05:28
 * @Description:
 */
import * as mars3d from 'mars3d';


class SceneEffects {
    private map!: mars3d.Map;
    rainEffect!: mars3d.effect.RainEffect;
    snowEffect!: mars3d.effect.SnowEffect;
    snowCoverEffect!: mars3d.effect.SnowCoverEffect;
    fogEffect!: mars3d.effect.FogEffect;
    constructor() { }

    rain = () => {
        this.unmount();
        this.rainEffect = new mars3d.effect.RainEffect();

        this.rainEffect.addTo(this.map);
    }

    snow = () => {
        this.unmount();
        this.snowEffect = new mars3d.effect.SnowEffect()

        this.snowCoverEffect = new mars3d.effect.SnowCoverEffect({
            enabled: true,
            alpha: 0.2,
            maxHeight: 9000
        })

        this.snowEffect.addTo(this.map);
        this.snowCoverEffect.addTo(this.map);
    }

    fog = () => {
        this.unmount()
        this.fogEffect = new mars3d.effect.FogEffect(
            {
                maxHeight: 20000, // 大于此高度后不显示
                fogByDistance: new mars3d.Cesium.Cartesian4(100, 0.0, 9000, 0.9),
                color: mars3d.Cesium.Color.WHITE
            }
        )

        this.fogEffect.addTo(this.map)
    }

    mount = (map: mars3d.Map) => {
        this.map = map;

        return this.map;
    }

    unmount = () => {
        this.snowEffect && this.snowEffect.remove()
        this.rainEffect && this.rainEffect.remove()
        this.snowCoverEffect && this.snowCoverEffect.remove()
        this.fogEffect && this.fogEffect.remove()
    }
}


export function useSceneEffects() {
    return new SceneEffects();
}


