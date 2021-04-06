import request from '@/http/request.js'
/**
 *
 */
export function upload(data) {
    return request({
        url: '/file/upload',
        method: 'post',
        data: data
    })
}