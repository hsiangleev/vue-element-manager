    
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
import sidebarStyle from "~/layout/layoutStyle/config.scss"
import sidebarItem from "./sidebarItem"
import { mapMutations } from 'vuex'
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
        ...mapMutations({
            hideSidebar: "hideSidebar"
        }),
        select(path, keyPath, el) {
            var text=el.$el.querySelector("span").innerText;
            if(path==="/"){
                return void this.$router.push({ path: "/" })
            }
            this.$store.commit('pushTagsCacheList',{
                path,
                title: text,
            })
            if(this.$store.state.layout.isPad){
                this.hideSidebar();
            }
        }
    }
}

</script>

<style lang="scss" scoped>
    .el-menu{
        border: none;
    }
</style>