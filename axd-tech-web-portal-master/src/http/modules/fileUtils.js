import request from '@/http/request.js'
/**
 *
 */
export function upload(data) {
    return request({
        url: '/File/upload',
        method: 'post',
        data: data
    })
}