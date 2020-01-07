import request from '@/utils/request'

// 列表
export function getList(data) {
  // return request({
  //   url: '/table/list',
  //   method: 'get',
  //   data
  // })

  const ResponseData = {
    total: 200,
    list: [
      { id: 1, name: 'lee1' },
      { id: 2, name: 'lee2' },
      { id: 3, name: 'lee3' },
      { id: 4, name: 'lee4' },
      { id: 5, name: 'lee5' },
      { id: 6, name: 'lee6' },
      { id: 7, name: 'lee7' },
      { id: 8, name: 'lee8' },
      { id: 9, name: 'lee9' },
      { id: 10, name: 'lee10' }
    ]
  }

  return new Promise(resolve => {
    resolve(ResponseData)
  })
}

// 删除
export function del(data) {
  return request({
    url: '/table/del',
    method: 'delete',
    data
  })
}
