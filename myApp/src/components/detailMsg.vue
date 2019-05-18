<template>
    <div>
        <el-table
            v-loading="loading"
            border
            :data="detailList"
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
            <el-table-column label="工作时间" width="180px">
                <template slot-scope="scope" >
                    <span style="margin-left: 10px;">{{scope.row.aTime}} - {{scope.row.aTime2}}</span>
                </template>
            </el-table-column>
            <el-table-column   label="上班打卡时间">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{scope.row.sdaKaTime | date}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="下班打卡时间">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{scope.row.xdaKaTime}}</span>
                </template>
            </el-table-column>
            <el-table-column  label="工作状态">
                <template slot-scope="scope">
                    <span style="margin-left: 10px;">{{scope.row.workTime}}</span>
                </template>
            </el-table-column>
        </el-table>
        <div class="toolbar">
            <el-pagination
                background
                layout="prev, pager, next"
                @current-change="getDetailList"
                :page-count="pageSum"
                :current-page.sync="pageIndex"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        name: "detailMsg",
        data(){
            return{
                loading:false,
                id:"",
                name:"",
                detailList:[],
                pageSum:1,
                pageIndex:1
            }
        },
        methods:{
            getDetailList(pageIndex){
                this.$ajax.get("/getDetailList",{
                    params:{
                        id:this.id,
                        name:this.name,
                        pageIndex
                    }
                }).then(data=>{
                    if(data.ok === 1){
                        this.detailList = data.detailList;
                        this.pageSum = data.pageSum;
                    }
                })
            }
        },
        mounted(){
            this.id = this.$router.history.current.query.id;
            this.name = this.$router.history.current.query.name;
            this.getDetailList(1);
        }
    }
</script>

<style scoped>

</style>
