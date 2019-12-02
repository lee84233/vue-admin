<template>
  <div class="app-container">
    <!-- form表单 -->
    <el-form inline :model="form">
      <el-form-item label="审批人">
        <el-input v-model="form.user" placeholder="审批人" />
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">查 询</el-button>
      </el-form-item>
    </el-form>

    <!-- table表格 -->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="加载中..."
      border
      stripe
      fit
      highlight-current-row
    >
      <el-table-column
        type="index"
        :index="tableInx"
        label="序号"
        width="60"
        align="center"
      />
      <el-table-column align="center" prop="id" label="ID" width="120" />
      <el-table-column label="Title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="Author" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="Pageviews" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="150"
      >
        <template slot-scope="scope">
          <el-button-group>
            <el-button type="primary" plain size="mini">编辑</el-button>
            <el-button type="danger" plain size="mini" @click="handleDelete(scope.row.id)">删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      style="margin-top: 20px"
      :current-page.sync="pagination.currentPage"
      :page-size="pagination.pageSize"
      :page-sizes="pagination.pageSizes"
      :total="pagination.total"
      :layout="pagination.layout"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import { getList } from '@/api/table'

export default {
  data() {
    return {
      // 表单
      form: {
        user: '',
        region: 'beijing'
      },
      // 表格
      list: [],
      listLoading: true,
      // 分页
      pagination: {
        currentPage: 1,
        pageSize: 5,
        pageSizes: [5, 10, 20, 30, 50],
        total: 400,
        layout: 'prev, pager, next, sizes, jumper, ->, total'
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getList().then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    },

    // 删除
    handleDelete(id) {
      this.$message.error(`删除：${id}`)
    },

    // 页码切换
    handleCurrentChange(page) {
      this.$message.success(`当前页：${page}`)
    },
    // 条数切换
    handleSizeChange(pageSize) {
      this.pagination.currentPage = 1
      this.$message.warning(`切换页面条数：${pageSize}`)
    },
    // 序号
    tableInx(index) {
      return (this.pagination.currentPage - 1) * this.pagination.pageSize + index + 1
    }
  }
}
</script>
