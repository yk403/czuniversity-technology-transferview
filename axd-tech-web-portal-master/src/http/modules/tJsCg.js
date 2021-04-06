import request from '@/http/request.js'

/**
 * 分页查询
 */
export function page(data) {
    return request({
        url: '/JsCg/page/user',
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
 * 拍卖申请
 */
export function assistanceUpdate(data) {
    return request({
        url: '/JsCg/assistanceUpdate',
        method: 'put',
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
 * 成果申请发布
 */
export function auditCg(data) {
    return request({
        url: '/JsXq/auditCg',
        method: 'put',
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

