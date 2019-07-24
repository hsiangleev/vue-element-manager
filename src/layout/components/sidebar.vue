    
<template>
    <div class="app-sidebar-nav">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :background-color="backgroundColor"
                :text-color="textColor"
                class="el-menu-vertical-demo first-menu"
                :router=true
                :collapse="isCollapse"
                :collapse-transition=false
                :default-active="defaultActive"
                :unique-opened=true
                @select="select">

                <sidebar-item :index="item.path" v-for="item in routeList" :key="item.path" :item="item"></sidebar-item>
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import sidebarStyle from "../layoutStyle/config.scss"
import sidebarItem from "./sidebarItem"
export default {
    name: 'sidebar',
    data() {
        return {
            textColor: sidebarStyle.sidebarColor,
            backgroundColor: sidebarStyle.sidebarBgColor,
        }
    },
    computed: {
        isCollapse() {
            return this.$store.state.layout.isSidebarFold
        },
        routeList() {
            return this.$store.state.layout.routeList
        },
        defaultActive() {
            return this.$route.path
        }
    },
    components: {
        sidebarItem
    },
    mounted() {
        // console.log(sidebarStyle)
    },
    methods: {
        select(key, keyPath, el) {
            setTimeout(() => {
                let path=this.$route.path
                if(path==="/"){
                    return void this.$router.push({ path: "/" })
                }
                this.$store.commit('pushTagsCacheList',{
                    path,
                    title: this.$route.meta.title,
                })
            }, 100);
        }
    }
}

</script>

<style lang="scss" scoped>
    .el-menu{
        border: none;
    }
</style>