<template>
    <div :class="{'show-sidebar': sidebar}" class="admin-sidebar">
        <profile />
        <namespace />
        <sidebar-menu />
    </div>
</template>

<script>
    import Profile from './profile'
    import Namespace from './namespace'
    import SidebarMenu from './menu'
    export default {
      components:{
        Profile,
        Namespace,
        SidebarMenu
      },
      computed:{
      	sidebar(){
          return this.$store.state.sidebar === 2
        }
      }
    }
</script>

<style lang="stylus" scoped>
    .admin-sidebar
        background-image linear-gradient(to bottom, #2f1ea1, #0b003a);
        box-shadow -2px 0 6px 0 rgba(21, 0, 113, 0.36);
        min-height 100vh
        width 350px
        position fixed
        top 110px
        left 0
        transition all ease .5s
        z-index 9999
    @media only screen and (max-width: 1230px)
      .admin-sidebar
        top 60px
        transform translate(-100%)
      &.show-sidebar
        transform translate(0)

</style>
