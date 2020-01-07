<template>
  <div class="app-container">
    <!-- 表单信息 -->
    <block-title class="m-t" name="表单信息" />
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="110px"
    >
      <el-row>
        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 8}">
          <el-form-item label="名称" prop="name">
            <el-input v-model="form.name" placeholder="名称" />
          </el-form-item>
        </el-col>

        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 8}">
          <el-form-item label="成立日期" prop="time">
            <el-date-picker
              v-model="form.time"
              class="w-100"
              placeholder="成立日期"
              :value-format="dateValueFormat"
              :picker-options="datePickerOptions"
            />
          </el-form-item>
        </el-col>

        <el-col :xs="{span: 24}" :sm="{span: 12}" :md="{span: 8}">
          <el-form-item label="状态" prop="status">
            <el-input v-model="form.status" placeholder="状态" />
          </el-form-item>
        </el-col>

        <el-col :span="24">
          <el-form-item label-width="0" class="flex-center">
            <el-button type="primary" style="width: 150px" @click="onSubmit">保 存</el-button>
            <el-button @click="onReset">重 置</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import BlockTitle from '@/components/BlockTitle' // 标题栏
import forms from '@/mixins/forms'

export default {
  components: { BlockTitle },
  mixins: [forms],
  data() {
    return {
      form: {
        name: '',
        time: '',
        status: ''
      }
    }
  },
  computed: {
    rules() {
      return {
        name: [
          { required: true, message: '请输入内容', trigger: 'change' }
        ],
        time: [
          { required: true, message: '请输入内容', trigger: 'change' }
        ],
        status: [
          { required: true, message: '请输入内容', trigger: 'change' }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          console.log(this.form)
          this.$message('submit!')
        }
      })
    },
    onReset() {
      this.$refs.form.resetFields()
    }
  }
}
</script>
