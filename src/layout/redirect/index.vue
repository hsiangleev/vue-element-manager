<script>
export default {
    beforeCreate() {
        this.$nextTick(()=>{
            const { params, query } = this.$route
            const { path } = params
            this.$router.replace({ path: '/' + path, query })
        })
    },
    render: function(h) {
        return h()
    }
}
</script>
