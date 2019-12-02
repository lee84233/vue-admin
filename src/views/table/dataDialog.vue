<template>
  <el-dialog
    title="编辑"
    :visible.sync="visible"
    width="500px"
    :close-on-click-modal="false"
    :show-close="false"
    destroy-on-close
    @close="dialogClose"
  >
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item label="Auther">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai" />
          <el-option label="区域二" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="特殊资源">
        <el-radio-group v-model="form.resource">
          <el-radio label="online">线上赞助</el-radio>
          <el-radio label="offline">线下赞助</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="活动形式">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="dialogClose">取 消</el-button>
      <el-button type="primary" @click="dialogClose">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'DataModal',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      form: {
        name: '',
        region: '',
        type: [],
        resource: 'offline',
        desc: ''
      }
    }
  },
  methods: {
    dialogClose() {
      this.$emit('dialogClose', false)
    }
  }
}
</script>
