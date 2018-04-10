<template>
  <div id="activity" class="activity clearfix">
    <header>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>报名海报设置</el-breadcrumb-item>
      </el-breadcrumb>
    </header>
    <main>
      <el-row>
        <el-button type="primary" @click="addActivity">新增</el-button>
      </el-row>
      <el-row>
        <el-table :data="tableData" style="width: 100%" stripe>
          <el-table-column label="序号" type="index" align="center">
          </el-table-column>
          <el-table-column label="活动名称" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.activityName }}</span>
            </template>
          </el-table-column>
          <el-table-column label="活动时效" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.activityTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="活动状态" align="center" :formatter="formatterACSta">
          </el-table-column>
          <el-table-column label="海报状态" align="center" :formatter="formatterPOSta">
          </el-table-column>
          <el-table-column label="操作" align="center">
            <el-table-column label="报名表单" align="center">
              <template slot-scope="scope">
                <el-button size="mini">修改</el-button>
                <el-button size="mini" type="primary" @click="previewForm">预览</el-button>
              </template>
            </el-table-column>
            <el-table-column label="海报设计" align="center">
              <template slot-scope="scope">
                <div v-if="scope.row.posterStatus == 0">
                  <el-button size="mini" @click="addPoster">海报设计</el-button>
                </div>
                <div v-else-if="scope.row.posterStatus == 1">
                  <el-button size="mini">修改</el-button>
                  <el-button size="mini" type="primary" @click="previewPoster">预览</el-button>
                </div>
                <div v-else></div>
              </template>
            </el-table-column>
            <el-table-column label="活动管理" align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="danger">删除</el-button>
                <el-button size="mini" type="success" v-if="scope.row.activityStatus == 1">上线</el-button>
                <el-button size="mini" type="success" v-if="scope.row.activityStatus == 2">下线</el-button>
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
      </el-row>
    </main>
  </div>
</template>
<style>

</style>
<script>
export default {
    data() {
        return {
            tableData: [
                {
                    activityTime: "2018-05-01",
                    activityName: "五一活动",
                    activityStatus: 1,
                    posterStatus: -1
                },
                {
                    activityTime: "2018-06-01",
                    activityName: "六一活动",
                    activityStatus: 2,
                    posterStatus: -1
                },
                {
                    activityTime: "2018-10-01",
                    activityName: "国庆活动",
                    activityStatus: 1,
                    posterStatus: 0
                },
                {
                    activityTime: "2018-09-24",
                    activityName: "中秋活动",
                    activityStatus: 1,
                    posterStatus: 1
                },
                {
                    activityTime: "2018-06-18",
                    activityName: "端午活动",
                    activityStatus: 2,
                    posterStatus: 1
                }
            ]
        };
    },
    methods: {
        handleEdit(index, row) {
            console.log(index, row);
        },
        handleDelete(index, row) {
            console.log(index, row);
        },
        formatterACSta(row, column) {
            if (row.activityStatus == 1) {
                return "未上线";
            } else if (row.activityStatus == 2) {
                return "已上线";
            } else {
                return "活动状态有误";
            }
        },
        formatterPOSta(row, column) {
            if (row.posterStatus == -1) {
                return "无需设计海报";
            } else if (row.posterStatus == 0) {
                return "海报未设计";
            } else {
                return "海报已设计";
            }
        },
        addActivity() {
          this.$router.push({ name: 'formdesign'})
        },
        addPoster() {
          this.$router.push({ name: 'posterdesign'})
        },
        previewForm() {
          this.$router.push({ name: 'form'})
        },
        previewPoster() {
          this.$router.push({ name: 'poster'})
        }
    }
};
</script>

