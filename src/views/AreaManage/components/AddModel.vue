<template>
  <div class="model">
    <el-dialog width="35%" :title="title" :visible.sync="dialogFormVisible" :before-close="onCancle">
      <el-form
        ref="form"
        :rules="rules"
        :model="form"
        :label-width="formLabelWidth"
      >
        <el-form-item
          label="区域名称"
          prop="name"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.name" placeholder="请输入区域名称" />
        </el-form-item>
        <el-form-item label="区域描述" prop="describe">
          <el-input
            v-model="form.describe"
            placeholder="请输入区域描述"
            type="textarea"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="onCancle">取 消</el-button>
        <el-button type="primary" :loading="loading" @click="onSubmit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addArea, updateArea } from '@/api/areaManage'
export default {
  props: {
    info: {
      type: Object,
      default: () => {}
    },
    type: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      loading: false,
      dialogFormVisible: true,
      form: {
        name: this.info?.name || '',
        describe: this.info?.describe || ''
      },
      title: this.type === 'add' ? '新增区域' : '编辑区域',
      formLabelWidth: '120px',
      rules: {
        name: [
          { required: true, message: '请输入活动名称', trigger: 'blur' },
          {
            min: 1,
            max: 10,
            message: '长度在 1 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    onSubmit() {
      console.log(this.form)
      this.$refs.form.validate((valid) => {
        if (valid) {
          // 验证成功
          this.loading = true
          if (this.type === 'add') {
            // 调用新增接口
            addArea(this.form).then(res => {
              console.log(res)
              if (res.code === '1001') {
                this.$message({
                  type: 'success',
                  message: '新增区域成功'
                })
                this.$emit('onOk')
              }
            }).finally(() => {
              this.loading = false
              this.$emit('modelCancle')
            })
          } else {
            // 调用修改接口
            const data = {
              id: this.info.id,
              ...this.form
            }
            updateArea(data).then(res => {
              console.log(res)
              if (res.code === '1001') {
                this.$message({
                  type: 'success',
                  message: '修改区域成功'
                })
                this.$emit('onOk')
              }
            }).finally(() => {
              this.loading = false
              this.$emit('modelCancle')
            })
          }
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    onCancle() {
      console.log('取消')
      this.$emit('modelCancle')
    }
  }
}
</script>

<style lang="scss" scoped>
.model {
}
</style>
