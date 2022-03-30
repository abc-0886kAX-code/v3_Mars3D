/*
 * @Author: zhangxin
 * @Date: 2022-03-24 14:45:47
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-03-24 15:09:04
 * @Description:
 */
import * as mars3d from 'mars3d';



export function UseBindLayerPopup(graphicLayer: mars3d.layer.GraphicLayer) {
    graphicLayer.bindPopup(function (event) {
        const { attr: { label, value } } = event.graphic;

        const title = label['title'] || '示例'

        const target = {}
        for (const key in label) {
            if (value[key]) {
                target[label[key]] = value[key]
            }
        }

        return mars3d.Util.getTemplateHtml({ title: title, template: "all", attr: target, edit: true, width: 290 })
    })
}
