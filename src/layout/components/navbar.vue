    
<template>
    <div class="app-navbar">
        <div class="app-navbar-fold" @click="fold">
            <span :class="{'el-icon-s-unfold': isSidebarFold, 'el-icon-s-fold': !isSidebarFold}"></span>
        </div>
        <div class="tags-nav">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :key="-1" :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item v-for="(val,index) in tagsNavList" :key="index">{{ val }}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="app-navbar-right">
            <nav-search></nav-search>
            <div class="app-navbar-right-screen">
                <span>
                    <i v-if="!isFullScreen" class="el-icon-rank" @click="fullScreen"></i>
                    <i v-else class="el-icon-full-screen" @click="exitScreen"></i>
                </span>
            </div>
            <el-dropdown trigger="click">
                <span class="el-dropdown-link">
                    管理员<i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item icon="el-icon-plus">黄金糕</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-plus">狮子头</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-circle-plus-outline">螺蛳粉</el-dropdown-item>
                    <el-dropdown-item icon="el-icon-check">双皮奶</el-dropdown-item>
                    <el-dropdown-item divided>退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import navSearch from "./navSearch"
export default {
    name: 'navbar',
    computed: {
        isSidebarFold() {
            return this.$store.state.layout.isSidebarFold
        },
        tagsNavList() {
            if(this.$route.path==="/") return [];
            var arr=this.$route.matched.map(v=>v.meta.title);
            arr.shift();
            return arr;
        },
    },
    data() {
        return {
            isFullScreen: false
        }
    },
    components: {
        navSearch
    },
    methods: {
        ...mapMutations({
            fold: 'changeSidebarFold'
        }),
        fullScreen() {
            var ele = document.documentElement;
            var reqFullScreen = ele.requestFullScreen || ele.webkitRequestFullScreen || ele.mozRequestFullScreen || ele.msRequestFullscreen;      
            if(typeof reqFullScreen !== 'undefined' && reqFullScreen) {
                reqFullScreen.call(ele);
            };
            this.isFullScreen=true;
        },
        exitScreen() {
            var ele = document.documentElement;
            if (document.exitFullscreen) {  
                document.exitFullscreen();  
            } else if (document.mozCancelFullScreen) {  
                document.mozCancelFullScreen();  
            } else if (document.webkitCancelFullScreen) {  
                document.webkitCancelFullScreen();  
            } else if (document.msExitFullscreen) {  
                document.msExitFullscreen();  
            }
            this.isFullScreen=false;
        }
    },
    
}

</script>

<style lang="scss" scoped>
    @import "~/layout/layoutStyle/config.scss";
    .app-navbar{
        width: 100%;
        height: $navbarHeight;
        line-height: $navbarHeight;
        color: $navbarColor;
        background-color: $navbarBgColor;
        position: relative;
        overflow: hidden;
        .app-navbar-fold{
            width: $navbarHeight;
            display: inline-block;
            text-align: center;
            cursor: pointer;
        }
        .tags-nav{
            display: inline-block;
        }
        .app-navbar-right{
            float: right;
            padding: 0px 30px;
            .el-dropdown-link{
                color: $navbarColor;
            }
            .app-navbar-right-screen{
                display: inline-block;
                padding-right: 20px;
                i{
                    display: inline-block;
                    text-align: center;
                    cursor: pointer;
                    font-size: 22px;
                    &.el-icon-rank{
                        transform: translateY(4px) rotate(45deg);
                    }
                    &.el-icon-full-screen{
                        transform: translateY(4px);
                        font-size: 20px;
                    }
                }
            }
        }
    }
</style>