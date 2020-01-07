<template>
  <div class="app-container">
    <!-- form表单 -->
    <block-title name="条件查询" />
    <el-form
      ref="listSearchForm"
      :model="searchForm"
      label-width="100px"
    >
      <el-row>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 8}">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="searchForm.name" placeholder="姓名" />
          </el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 8}">
          <el-form-item label="活动区域" prop="region">
            <el-select v-model="searchForm.region" placeholder="活动区域" class="w-100">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 8}">
          <el-form-item label="工号" prop="userCode">
            <el-input v-model="searchForm.userCode" placeholder="工号" />
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label-width="0" class="flex-center">
            <el-button type="primary" @click="searchFormSubmit('listSearchForm')">查 询</el-button>
            <el-button type="primary" plain @click="searchFormReset('listSearchForm')">重 置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <!-- table表格 -->
    <block-title name="数据列表">
      <div>
        <el-button type="primary" icon="el-icon-plus" @click="goPage('/')">新增</el-button>
        <el-button type="primary" plain icon="el-icon-download">模板下载</el-button>
      </div>
    </block-title>
    <el-table
      v-loading="tableLoading"
      :data="tableList"
      element-loading-text="加载中..."
      fit
    >
      <el-table-column
        type="index"
        label="序号"
        :index="tableIndex"
        align="center"
        width="60"
      />
      <el-table-column label="ID" prop="id" align="center" width="120" />
      <el-table-column label="姓名" prop="name" />
      <el-table-column label="操作" align="center" width="150">
        <template slot-scope="scope">
          <el-button type="primary" plain size="mini" @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button type="danger" plain size="mini" @click="deleteRecord(scope.$index, scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <pagination
      :page.sync="tablePage.currentPage"
      :total="tablePage.total"
      :limit.sync="tablePage.pageSize"
      @pagination="paginationChange"
    />
  </div>
</template>

<script>
import { getList, del } from '@/api/table' // api 接口
import tables from '@/mixins/tables'
import BlockTitle from '@/components/BlockTitle' // 标题栏
import Pagination from '@/components/Pagination/index' // 分页

export default {
  components: { BlockTitle, Pagination },
  mixins: [tables],
  data() {
    return {
      /**
       * 存在搜索条件，字段必须在 searchForm 里！！！
       * 没有搜素条件，建议删除 searchForm
       */
      searchForm: {
        name: '',
        region: 'beijing',
        userCode: ''
      }
    }
  },
  methods: {
    /**
     * ！！！必须方法，获取 list 接口
     *
     * @params {Object} data 请求数据：包含 searchForm 和 tablePage 属性
     * @return {Promise} Promise 获取 list 接口的异步方法
     */
    async getListApi(data) {
      return new Promise((resolve, reject) => {
        getList(data).then(data => {
          resolve(data)
        }).catch(e => {
          console.log(2)
          reject(e)
        })
      })
    },

    // 编辑
    handleEdit() {
      this.dataModalVisible = true
    },
    // 删除
    deleteRecord(index, id) {
      this.$confirm('此操作将永久删除该记录, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        del({ id }).then(res => {
          this.$delete(this.tableList, index)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
      }).catch(() => { })
    }
  }
}
</script>
