import request from '@/http/request.js'

/**
 * 分页查询
 */
export function page(data) {
    return request({
        url: '/JsLb/page',
        method: 'post',
        data: data
    })
}

/**
 * 保存
 */
export function save(data) {
    return request({
        url: '/JsLb/save',
        method: 'post',
        data: data
    })
}

/**
 * 更新
 */
export function update(data) {
    return request({
        url: '/JsLb/update',
        method: 'post',
        data: data
    })
}

/**
 * 删除
 */
export function remove(id) {
    return request({
        url: '/JsLb/remove/' + id,
        method: 'get'
    })
}

/**
 * 根据ID查询明细
 */
export function getById(id) {
    return request({
        url: '/JsLb/getById/' + id,
        method: 'get'
    })
}
