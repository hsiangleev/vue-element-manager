    
<template>
    <div class="header-tags">
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <div class="header-tags-page">
                    <ul>
                        <li :class="{active: $route.path==='/'}"><span class="header-tags-noclose" @click="changeRoute('/')"><i class="el-icon-s-home"></i></span></li>
                        <li :class="{active: val.path===$route.path}" v-for="(val, index) in tagsCacheList" :key="val.path" @contextmenu.prevent="showTagsMenu($event,val.path, index)">
                            <span @click="changeRoute(val.path)">{{ val.title }}</span>
                            <i class="el-icon-close" @click="removeTags(val.path, index)"></i>
                        </li>
                        <!-- 占位，解决滚动条短了的问题 -->
                        <li><span></span></li>
                    </ul>
            </div>
        </el-scrollbar>
        <ul class="header-tags-menu" :style="menuStyle" v-if="isShowTagsMenu">
            <li @click="refreshPage">刷新</li>
            <li @click="removeTags(tagsMenuPath.path, tagsMenuPath.index)">关闭</li>
            <li @click="removeOtherTags">关闭其它</li>
            <li @click="removeAllTags">关闭全部</li>
        </ul>
    </div>
</template>

<script>
import {windowResize} from "~/utils/common.js"
export default {
    name: 'tags',
    data() {
        return {
            menuStyle: {
                top: "10px",
                left: "10px"
            },
            isShowTagsMenu: false,
            tagsMenuPath: {
                path: "",
                index: -1
            }
        }
    },
    computed: {
        tagsCacheList() {
            let list=this.$store.state.layout.tagsCacheList
            let path=this.$route.path
            if(list.length===0 && path!=="/"){
                let obj={
                    path,
                    title: this.$route.meta.title,
                }
                this.$store.commit('pushTagsCacheList',obj)
                return [obj]
            }
            return this.$store.state.layout.tagsCacheList
        },
    },
    methods: {
        changeRoute(path) {
            this.$router.push({ path })
        },
        removeTags(path, index) {
            if(index===0) {
                this.$router.push({ path: "/" })
            }else if(path===this.$route.path){
                this.$router.push({ path: this.tagsCacheList[index-1].path })
            }
            this.$store.commit("removeTags", path)
        },
        showTagsMenu(event, path, index){
            this.isShowTagsMenu=true
            this.menuStyle.top=event.clientY+"px"
            this.menuStyle.left=event.clientX+"px"
            this.tagsMenuPath.path=path
            this.tagsMenuPath.index=index
        },
        hideTagsMenu() {
            this.isShowTagsMenu=false;
        },
        removeOtherTags() {
            if(this.tagsMenuPath.path!==this.$route.path) {
                this.$router.push({ path: this.tagsMenuPath.path })
            }
            this.$store.commit("removeOtherTags", this.tagsMenuPath)
        },
        removeAllTags() {
            this.$router.push({ path: "/" })
            this.$store.commit("removeAllTags")
        },
        refreshPage() {
            this.$router.replace({
                path: '/redirect' + this.tagsMenuPath.path
            })
        }
    },
    mounted() {
        document.addEventListener("click",this.hideTagsMenu)
        windowResize(200,()=>{
            this.isShowTagsMenu && this.hideTagsMenu()
        })
    },
}

</script>

<style lang="scss" scoped>
    @import "~/layout/layoutStyle/config.scss";
    .header-tags{
        width: 100%;
        height: $tagsHeight;
        line-height: $tagsHeight;
        color: $tagsColor;
        background-color: $tagsBgColor;
        border-top: 1px solid $tagsBorderColor;
        border-bottom: 1px solid $tagsBorderColor;
        box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
        position: relative;
        z-index: 10;
        .header-tags-page{
            margin-top: -1px;
            ul{
                li{
                    display: inline-block;
                    border-right: 1px solid $tagsBorderColor;
                    font-size: 14px;
                    position: relative;
                    cursor: pointer;
                    i.el-icon-close{
                        position: absolute;
                        right: 5px;
                        top: 50%;
                        margin-top: -8px;
                        border-radius: 50%;
                        padding: 2px;
                        &:hover{
                            background-color: $tagsCloseHoverBgColor;
                            color: $tagsCloseHoverColor;
                        }
                    }
                    &.active{
                        background-color: $tagsActiveColor;
                    }
                    span{
                        display: inline-block;
                        height: 100%;
                        padding: 0px 35px 0 20px;
                        &.header-tags-noclose{
                            padding-right: 20px;
                            i{
                                font-size: 20px;
                                vertical-align: middle;
                            }
                        }
                    }
                    &:last-of-type{
                        border-right: none;
                        cursor: default;
                    }
                }
                
            }
        }
        .header-tags-menu{
            position: fixed;
            background-color: rgba(255,255,255,.95);
            border: 1px solid $tagsBorderColor;
            box-shadow: 0 1px 2px 0 rgba(0,0,0,.1);
            li{
                font-size: 14px;
                padding: 10px 15px;
                height: auto;
                list-style: none;
                line-height: normal;
                cursor: pointer;
            }
        }
    }
</style>