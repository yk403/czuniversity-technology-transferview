import request from '@/http/request.js'

/**
 * 需求导入excel
 */
export function importXq(data) {
    return request({
        url: '/sys/excel/importXq',
        method: 'post',
        data: data
    })
}
/**
 * 分页查询(传递五个参数，分别是:lyId领域id,)
 */
export function page(data) {
    return request({
        url: '/JsXq/page',
        method: 'post',
        data: data
    })
}

/**
 * 保存
 */
export function save(data) {
    return request({
        url: '/JsXq/save',
        method: 'post',
        data: data
    })
}

/**
 * 更新
 */
export function update(data) {
    return request({
        url: '/JsXq/update',
        method: 'post',
        data: data
    })
}

/**
 * 删除
 */
export function remove(id) {
    return request({
        url: '/JsXq/remove/' + id,
        method: 'get'
    })
}

/**
 * 根据ID查询明细
 */
export function getById(id) {
    return request({
        url: '/JsXq/getById/' + id,
        method: 'get'
    })
}
/**
 * 根据Name查询明细
 */
export function getByName(xqmc) {
    return request({
        url: '/JsXq/getByName/' + xqmc,
        method: 'get'
    })
}
/**
 * 根据ID通过(传id)
 */
// export function pass(id) {
//     return request({
//         url: '/JsXq/pass/' + id,
//         method: 'get'
//     })
// }
/**
 * 不通过(传id和fbwtgsm)
 */
// export function disPass(data) {
//     return request({
//         url: '/JsXq/disPass',
//         method: 'post',
//         data: data
//     })
// }
/*
审核统一接口
*/
 export function auditXq(data) {
     return request({
         url: '/JsSh/auditXq',
         method: 'post',
         data: data
     })
 }
/**
 * 批量下发传数组
 */
export function issueBatch(data) {
    return request({
        url: '/JsXq/issueBatch',
        method: 'post',
        data: data
    })
}
