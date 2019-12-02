import Mock from 'mockjs'

const data = Mock.mock({
  'items|5': [{
    id: '@id',
    title: '@sentence(5, 10)',
    author: 'name',
    display_time: '@datetime',
    pageviews: '@integer(300, 5000)'
  }]
})

export default [
  {
    url: '/table/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: 35,
          items: items
        }
      }
    }
  }
]
