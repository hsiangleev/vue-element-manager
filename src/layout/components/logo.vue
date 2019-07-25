    
<template>
    <div class="app-sidebar-logo">
        <p>Vue Element Manager</p>
    </div>
</template>

<script>
export default {
    name: 'logo',
    mounted () {
        // console.log(logoStyle)
    }
}

</script>

<style lang="scss" scoped>
    @import "~/layout/layoutStyle/config.scss";
    .app-sidebar-logo{
        width: 100%;
        height: $navbarHeight;
        line-height: $navbarHeight;
        color: $logoColor;
        text-align: center;
        font-size: 14px;
        background-color: $logoBgColor;
    }
</style>