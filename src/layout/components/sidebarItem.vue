    
<template>
    <el-submenu :index="item.path" :key="item.path" v-if="!item.meta.isHide && item.children">
        <template slot="title">
            <i :class="item.meta.icon"></i>
            <span>{{ item.meta.title }}</span>
        </template>

        <template v-if="item.children">
            <sidebar-item :index="child.path" v-for="child in item.children" :key="child.path" :item="child"></sidebar-item>
        </template>
    </el-submenu>

    <el-menu-item :index="item.path" v-else-if="!item.meta.isHide && !item.children">
        <i :class="item.meta.icon" v-if="item.meta.icon"></i>
        <span slot="title">{{ item.meta.title }}</span>
    </el-menu-item>
        
</template>

<script>
export default {
    name: 'sidebarItem',
    computed: {
        routeList() {
            return this.$store.state.layout.routeList
        },
    },
    props: {
        item: {
            type: Object,
            required: true
        }
    },
    mounted () {
        // console.log(this.item)
    }
}

</script>

<style lang="scss" >

</style>