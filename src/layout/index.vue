    
<template>
    <div :class="{'container': true,'sidebar-fold': isSidebarFold && !isPad,'sidebar-hide': isSidebarFold && isPad}">
        <div class="cover-bg" v-if="!isSidebarFold && isPad" @click="hideSidebar"></div>
        <div class="app-sidebar">
            <logo />
            <sidebar />
        </div>
        <div :class="{'main': true, 'scrollbar-md': !isSidebarFold && isPad}">
            <div>
                <navbar />
                <tags />
            </div>
            <app-content />
        </div>
    </div>
</template>

<script>
import sidebar from "~/layout/components/sidebar"
import navbar from "~/layout/components/navbar"
import appContent from "~/layout/components/appContent"
import tags from "~/layout/components/tags"
import logo from "~/layout/components/logo"
import { mapMutations } from 'vuex'
import {windowResize} from "~/utils/common.js"
export default {
    name: 'Layout',
    components: {
        sidebar,
        navbar,
        appContent,
        tags,
        logo,
    },
    computed: {
        isSidebarFold() {
            return this.$store.state.layout.isSidebarFold
        },
        isPad() {
            return this.$store.state.layout.isPad
        }
    },
    mounted() {
        this.init();
    },
    methods: {
        ...mapMutations({
            changePadStatus: "changePadStatus",
            hideSidebar: "hideSidebar"
        }),
        init() {
            windowResize(200,()=>{
                this.changePadStatus();
            })
        },
    }
}

</script>

<style lang="scss" scoped>
    @import "~/layout/layoutStyle/config.scss";
    .container{
        height: 100%;
        overflow-x: hidden;
        .cover-bg{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #000;
            opacity: .3;
            z-index: 99;
        }
        .main{
            height: 100%;
            margin-left: $sidebarWidth;
            -webkit-transition: all .3s;
            transition: all .3s;
            &.scrollbar-md{
                margin-left: 0px;
                transform: translate3d($sidebarWidth,0,0);
                -webkit-transform: translate3d($sidebarWidth,0,0);
            }
        }
        .app-sidebar{
            width: $sidebarWidth;
            height: 100%;
            background-color: $sidebarBgColor;
            position: fixed;
            top: 0px;
            left: 0;
            z-index: 100;
            -webkit-transition: width .3s;
            transition: width .3s;
            overflow: hidden;
        }
        &.sidebar-fold{
            .main{
                margin-left: 64px;
            }
            .app-sidebar{
                width: 64px;
            }
        }
        &.sidebar-hide{
            .main{
                margin-left: 0px;
            }
            .app-sidebar{
                width: 0px;
            }
        }
    }
    
</style>