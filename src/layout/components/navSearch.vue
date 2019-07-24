    
<template>
    <div class="app-navbar-right-search hidden-xs-only">
        <el-autocomplete
            class="inline-input"
            v-model="searchVal"
            :fetch-suggestions="querySearch"
            placeholder="请输入搜索内容"
            @select="handleSelect">
            <i
                class="el-icon-search el-input__icon"
                slot="suffix">
            </i>
        </el-autocomplete>
    </div>
</template>

<script>
export default {
    name: 'navSearch',
    data() {
        return {
            searchVal: "",
        }
    },
    computed: {
        routeList() {
            return this.$store.state.layout.routeList
        }
    },
    methods: {
        querySearch(queryString, cb) {
            var routeList=[];
            var f=function(arr) {
                arr.forEach(v=>{
                    if(v.children){
                        f(v.children)
                    }else if(!v.meta.isHide){
                        routeList.push({
                            value: v.meta.title,
                            path: v.path
                        })
                    }
                })
            }
            f(this.routeList)

            var results = queryString ? routeList.filter(v=>{
                return v.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
            }) : routeList;
            cb(results);
        },
        handleSelect(item) {
            this.$router.push(item.path)
            if(item.path==="/") return;
            this.$store.commit('pushTagsCacheList',{
                path: item.path,
                title: item.value,
            })
            this.searchVal="";
        },
    },
    
}

</script>

<style lang="scss" scoped>
    .app-navbar-right-search{
        display: inline-block;
        padding-right: 15px;
    }
</style>