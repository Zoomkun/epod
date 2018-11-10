<template>
    <div><PublicHeader :header-title="header"></PublicHeader></div>
</template>

<script>
    import PublicHeader from '@/components/header.vue'

    export default {
        name: 'createVote',
        mounted() {

        },
        data() {
            return {
                header:"我的投票"
            }
        },
        methods: {},
        components:{
            PublicHeader
        }
    }
</script>

<style lang="stylus">
</style>
