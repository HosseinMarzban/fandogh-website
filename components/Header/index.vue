<template>
    <header >
        <nav class="header-container" :class="{'no-fixed': noFixed, 'header-dashboard': dashboard}">
            <div class="right-menu">
                <div class="menu">
                    <a href="#" @click.prevent="toggleMenu(1)">
                        <img alt="hamburger button" :src="require('../../assets/svg/ic_hamburger.svg')" />
                    </a>
                </div>
                <div class="logo">
                    <router-link title="fandogh logo" :to="{path:'/'}"><logo  /></router-link>
                </div>
                <div class="navbar">
                    <ul>
                        <li><router-link :to="{path:'/'}"><progress-hover :hover="true">صفحه اصلی</progress-hover></router-link></li>
                        <li><router-link :to="{path:'/#prices'}"><progress-hover :hover="true"> سرویس ها </progress-hover></router-link></li>
                        <li><a rel="noopener" target="_blank" href="https://docs.fandogh.cloud"><progress-hover :hover="true"> مستندات </progress-hover></a></li>
                        <li><a rel="noopener" target="_blank" href="https://blog.fandogh.cloud"><progress-hover :hover="true">بلاگ</progress-hover></a></li>
                        <li><router-link  :to="{path:'/about-us'}" ><progress-hover :hover="true"> درباره ما </progress-hover></router-link></li>
                    </ul>
                </div>
            </div>
            <div class="user" v-if="!loggedIn">
                <f-button style="width: 100px" path="/user/login"  styles="transparent" > ورود </f-button>
                <f-button path="/user/register" styles="transparent border" > ثبت نام </f-button>
            </div>
            <div class="user" v-else>
                <f-button style="width: 100px" @onClick="logout"  styles="transparent" > خروج </f-button>
                <!--<f-button style="width: 100px" @onClick="$router.push('/dashboard/images')"  styles="transparent border" > داشبورد </f-button>-->
                <!--<f-button style="width: 100px" path="/dashboard/images"  styles="transparent border" > داشبورد </f-button>-->
            </div>

            <div v-if="loggedIn" class="profile">
                <a href="#" @click.prevent="toggleMenu(2)">
                    <img :src="avatar" alt="profile">
                </a>
            </div>

        </nav>
        <sidebar ref="menu" />
        <login ref="login" />
        <register ref="register" />
        <message ref="message" />
    </header>
</template>

<script>

import logo from './logo'
import FButton from '~/components/elements/button'
import Login from '~/components/Auth/Login'
import Sidebar from './sidebar'
import Register from "../Auth/Register";
import Message from "../Auth/Message";
import {getValue} from "~/utils/cookie";
import Gravatar from '~/utils/gravatar'

export default {
  components:{
    Register,
    logo,
    FButton,
    Login,
    Sidebar,
    Message
  },
  props:['noFixed'],
  data(){
    return {
     // loggedIn: getToken()
    }
  },
  mounted(){
    if(!this.noFixed) {
      let headerContainer = document.querySelector('.header-container')
      document.addEventListener('scroll', () => {
        if (window.pageYOffset > 10) {
          headerContainer.classList.add('header-container-fixed')
        } else {
          headerContainer.classList.remove('header-container-fixed')
        }
      })
    }
  },
  computed:{
    loggedIn(){
      return this.$store.state.user.token
    },
    avatar(){
      let email = getValue('email')
      return Gravatar(email, 150)
    },
    dashboard(){
      return this.$route.fullPath.includes('dashboard')
    }
  },
  methods:{
    toggleMenu(number){
      if(this.$route.fullPath.includes('dashboard') || number === 1) {
        this.$store.dispatch('toggleSidebar', number)
      } else {
        this.$router.push('/dashboard/images')
      }
    },
    showModal(modal){
      this.$store.dispatch('showModal', modal)
    },
    logout(){
      this.$store.dispatch('logout')
      this.$router.push('/user/login')
    }
  }
}
</script>

<style lang="stylus">
    .header-container
        padding 30px 90px
        position fixed
        box-sizing border-box
        z-index 1000
        top 0
        right 0
        width 100%
        display flex
        align-items center
        justify-content space-between
        flex-flow wrap row
        background-color transparent

    .header-container
        -webkit-transition all 0.3s
        -moz-transition all 0.3s
        transition all 0.3s

    .header-container-fixed
        background-color #3f10ae
        padding 15px 90px
        position fixed
        .logo
            img
                width 96px

    .no-fixed
        background linear-gradient(to right, #160074, #0f0050)
    header
        display block
        .right-menu
            display flex
            align-items center
            ul
                margin 0
                li
                    display  inline-block
                    a
                        text-decoration none
                        color white
                        padding 20px
        .menu
           display none
           margin-left 16px
        .header-container
            .profile
                display none

        .logo
            img
                width 126px
        .user
          button 
            margin-right 10px

    @media only screen and (max-width: 1230px)

        .header-container
            height: 60px
            padding 30px
            position initial
        .header-container-fixed
            background-color transparent
            padding 0 30px
            z-index 10
        .header-dashboard
        &.dashboard
            position fixed

        .navbar
            display none
        header
            .header-container
                .profile
                    display block
                    img
                        width 32px
                        border-radius 32px
            .user
                display none
            .menu
                display block
                float left
                img
                    width 24px
            .logo
                img
                    width 96px

</style>
