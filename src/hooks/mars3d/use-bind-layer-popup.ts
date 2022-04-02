/*
 * @Author: zhangxin
 * @Date: 2022-03-24 14:45:47
 * @LastEditors: zhangxin
 * @LastEditTime: 2022-04-02 13:36:57
 * @Description:
 */
import * as mars3d from 'mars3d';

/*

mars3d弹框，必须有attr对象值 且不能为空，否则即使有标题也不会显示
如只需要一个标题，可以将属性key设置为空，value为标题名，title则不需要传

*/

export function UseBindLayerPopup(graphicLayer: mars3d.layer.GraphicLayer) {
    graphicLayer.bindPopup(function (event) {
        const { attr: { label, value } } = event.graphic;

        const title = label['title'] || ''

        const target = {}
        for (const key in label) {
            if (value[key]) {
                target[label[key]] = value[key]
            }
        }

        return mars3d.Util.getTemplateHtml({ title: title, template: "all", attr: target, edit: true, width: 290 })
    })
}
