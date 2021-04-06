import request from '@/http/request.js'

/**
 * 分页查询
 */
export function page(data) {
    return request({
        url: '/JsXq/page/user',
        method: 'post',
        data: data
    })
}
/**
 * 需求成果（一起的）
 */
 export function PageByTJsFb(data) {
    return request({
        url: '/JsXq/PageByTJsFb',
        method: 'post',
        data: data
    })
}
/**
 * 需求导入
 */
export function importCompany(data) {
    return request({
        url: '/JsXq/importCompany',
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
 * 需求申请发布
 */
export function auditXq(data) {
    return request({
        url: '/JsXq/auditXq',
        method: 'put',
        data: data
    })
}
/**
 * 招标申请
 */
export function assistanceUpdate(data) {
    return request({
        url: '/JsXq/assistanceUpdate',
        method: 'put',
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
