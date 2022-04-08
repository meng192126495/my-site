<template>
  <div class="area-manage">
    <div class="head">
      <el-button type="primary" @click="handleAddArea"> + 新增区域</el-button>
      <el-input v-model.trim="areaName" class="areaInput" placeholder="请输入内容" prefix-icon="el-icon-search" @change="handleSearch" />
    </div>
    <div class="content">
      <template>
        <el-table v-loading="isLoading" :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="名称" width="180" />
          <el-table-column prop="describe" label="描述" width="350">
            <template slot-scope="scope">
              <span>{{ scope.row.describe ? scope.row.describe:'-无' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="创建日期" width="260">
            <template slot-scope="scope">
              <span>{{ scope.row.createdAt | formatTime }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="handle" width="320" label="操作">
            <template slot-scope="scope">
              <el-button
                size="small"
                type="primary"
                style="font-size: 12px"
                @click="handleLook(scope.row)"
              >查看</el-button>
              <el-button
                size="small"
                type="warning"
                style="font-size: 12px"
                @click="handleModify(scope.row)"
              >编辑</el-button>

              <el-button
                slot="reference"
                size="small"
                type="danger"
                style="font-size: 12px"
                @click="handleDelete(scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </template>
    </div>
    <div class="pager">
      <el-pagination
        :total="pager.total"
        :current-page="pager.page"
        :page-sizes="[1, 5, 10, 20]"
        :page-size="pager.szie"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <div>
      <AddModel v-if="isShowModel" :info="areaInfo" :type="modelType" @modelCancle="modelCancle" @onOk="handleOk" />
    </div>
  </div>
</template>

<script>
import AddModel from './components/AddModel.vue'
import { getAllArea, deleteArea } from '@/api/areaManage'
import moment from 'moment'
export default {
  filters: {
    formatTime(time) {
      return moment(time).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  components: {
    AddModel
  },
  data() {
    return {
      modelType: 'add',
      areaInfo: {},
      isShowModel: false,
      tableData: [],
      isLoading: false,
      areaName: '',
      pager: {
        page: 1,
        size: 10,
        total: 0
      }
    }
  },
  created() {
    // 调接口
    this.getAllList()
  },
  methods: {
    getAllList() {
      const data = {
        name: this.areaName,
        ...this.pager
      }
      this.isLoading = true
      getAllArea(data).then(res => {
        console.log(res)
        this.pager.total = res.count
        this.tableData = res.data.data
      }).finally(() => {
        this.isLoading = false
      })
    },
    handleAddArea() {
      console.log('新增区域')
      this.isShowModel = true
      this.modelType = 'add'
      this.areaInfo = {}
    },
    handleSizeChange(size) {
      this.pager.size = size
      this.pager.page = 1
      this.getAllList()
    },
    handleCurrentChange(page) {
      this.pager.page = page
      this.getAllList()
    },
    handleSearch(value) {
      this.getAllList()
    },
    // 点击了查看
    handleLook(row) {
      console.log(row)
    },
    // 点击了编辑
    handleModify(row) {
      this.areaInfo = row
      this.modelType = 'modify'
      this.isShowModel = true
    },
    // 点击了删除
    handleDelete(row) {
      this.$confirm('此操作将该区域删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击确定的操作(调用接口)
        deleteArea({
          id: row.id
        }).then(res => {
          if (res.code === '1001') {
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getAllList()
          }
        })
      }).catch(() => {
        // 几点取消的提示
      })
    },
    modelCancle() {
      this.isShowModel = false
    },
    handleOk() {
      console.log('od')
      this.getAllList()
    }
  }
}
</script>

<style lang="scss" scoped>
.area-manage {
  padding: 20px 30px;
  .content{
    margin-top: 20px;
  }
  .pager{
    margin-top: 20px;
  }
}
.areaInput{
  margin-left: 30px;
  width: 240px;
}
</style>
