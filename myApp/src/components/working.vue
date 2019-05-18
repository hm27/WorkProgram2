<template>
    <div>
       <!-- <div class="toolbar">
            <el-form :inline="true" :model="formInline"  class="demo-form-inline">
                <el-form-item label="学生姓名">
                    <el-input v-model="formInline.user" placeholder="请输入学生姓名"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">查询</el-button>
                </el-form-item>
            </el-form>
        </div>-->
        <el-table
            v-loading="loading"
            border
            :data="workIngList"
            style="width: 100%;">
            <el-table-column
                label="学生姓名" >
                <template slot-scope="scope">
                    {{scope.row.aName}}
                </template>
            </el-table-column>
            <el-table-column  label="工作岗位">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{scope.row.aPost}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="工作地点">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{scope.row.aWhere}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="工作内容">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{scope.row.aContent}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="应干工作天数">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{scope.row.aDays}}</span>
                </template>
            </el-table-column>
            <el-table-column   label="出勤天数">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{scope.row.aAttendance}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                    size="mini"
                    type="primary"
                    @click="completeWork(scope.row._id,scope.row.workId,scope.row.aName)">完成</el-button>
                    <el-button
                        size="mini"
                        type="info"
                        @click="handleDelete(scope.row._id,scope.row.aName)">详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="getWorkingList"
                :page-count="pageSum"
                :current-page.sync="pageIndex"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "working",
        data(){
            return{
                loading:false,
                pageIndex:1,
                pageSum:1,
                formInline:{
                    user:""
                },
                workIngList:[]
            }
        },
        methods:{
            getWorkingList(pageIndex){/*获取派出人员列表*/
                this.$ajax.get("/getWorkingList",{
                    params:{
                        pageIndex
                    }
                }).then(data=>{
                        if(data.ok === 1){
                            this.pageSum = data.pageSum;
                            this.workIngList = data.workInfo;
                        }
                    })
            },
            completeWork(id,workId,aName){/*工作完成*/
                this.$ajax.get("/completeWork",{
                    params:{id,workId,aName}
                }).then(data=>{
                    if(data.ok === 1){
                        this.getWorkingList(this.pageIndex);
                        this.$message({
                            type: 'success',
                            message: data.msg
                        });
                    }else{
                        this.$message.error(data.msg);
                    }
                })
            },
            handleDelete(id,name){
                this.$router.push({path:'/detailMsg',query:{id,name}});
            }
        },
        mounted(){
            this.getWorkingList(1);
        }
    }
</script>

<style scoped>

</style>
