import request from '@/http/request.js'

/**
 * 需求导入excel
 */
export function importCg(data) {
    return request({
        url: '/sys/excel/importCg',
        method: 'post',
        data: data
    })
}
/**
 * 分页查询
 */
export function page(data) {
    return request({
        url: '/JsCg/page',
        method: 'post',
        data: data
    })
}

/**
 * 保存
 */
export function save(data) {
    return request({
        url: '/JsCg/save',
        method: 'post',
        data: data
    })
}

/**
 * 更新
 */
export function update(data) {
    return request({
        url: '/JsCg/update',
        method: 'post',
        data: data
    })
}

/**
 * 删除
 */
export function remove(id) {
    return request({
        url: '/JsCg/remove/' + id,
        method: 'get'
    })
}

/**
 * 根据ID查询明细
 */
export function getById(id) {
    return request({
        url: '/JsCg/getById/' + id,
        method: 'get'
    })
}

/**
 * 根据ID查询明细
 */
export function getByName(cgmc) {
    return request({
        url: '/JsCg/getByName/' + cgmc,
        method: 'get'
    })
}

/**
 * 根据ID通过(传id)
 */
// export function pass(id) {
//     return request({
//         url: '/back/tJsCg/pass/' + id,
//         method: 'get'
//     })
// }
/**
 * 不通过(传id和fbwtgsm)
 */
// export function disPass(data) {
//     return request({
//         url: '/back/tJsCg/disPass',
//         method: 'post',
//         data: data
//     })
// }
/*
审核统一接口
*/
export function auditCg(data) {
    return request({
        url: '/JsSh/auditCg ',
        method: 'post',
        data: data
    })
}
/**
 * 批量下发传数组
 */
export function issueBatch(data) {
    return request({
        url: '/JsCg/issueBatch',
        method: 'post',
        data: data
    })
}
