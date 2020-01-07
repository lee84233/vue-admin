/**
 * table列表、分页，常用方法
 */
export default {
  created() {
    /**
     * 默认加载 第一页 数据
     */
    this.searchFormSubmit()
  },
  data() {
    return {
      // 搜索表单字段
      // searchForm: {},

      // 用于搜索的表单字段
      doSearchForm: {},

      // 表格字段
      tableList: [],
      tableLoading: false,
      // 分页字段
      tablePage: {
        currentPage: 1,
        pageSize: 10,
        total: 0
      }
    }
  },
  methods: {
    /*
     * !!! 必须在页面自定义 getListApi 方法：用于获取列表接口
     * 异步返回 列表接口 的方法

    async getListApi(data) {
      return new Promise((resolve, reject) => {
        getList(data).then(res => {
          resolve(res)
        }).catch(e => {
          reject(e)
        })
      })
    },
    */

    // 列表接口返回处理
    doListApi() {
      this.tableLoading = true

      // 请求参数
      const data = {
        ...this.doSearchForm,
        currentPage: this.tablePage.currentPage,
        pageSize: this.tablePage.pageSize
      }

      this.getListApi(data).then(data => {
        this.tableList = data.list
        this.tablePage.total = data.total || 0
        this.tableLoading = false
      }).catch(e => {
        this.tableLoading = false
      })
    },

    // 搜素
    searchFormSubmit() {
      (this.searchForm && typeof this.searchForm === 'object') ? (this.doSearchForm = Object.assign({}, this.searchForm)) : (this.doSearchForm = {})
      this.paginationChange({ limit: this.tablePage.pageSize })
    },
    // 分页切换
    paginationChange({ page = 1, limit = 10 }) {
      this.tablePage.currentPage = page
      this.tablePage.pageSize = limit
      this.doListApi()
    },

    // 重置
    searchFormReset(formName) {
      this.$refs[formName].resetFields()
    },
    // table 序号
    tableIndex(index) {
      return (this.tablePage.currentPage - 1) * this.tablePage.pageSize + index + 1
    },
    // 跳转页面
    goPage(path) {
      this.$router.push(path)
    }
  }
}
