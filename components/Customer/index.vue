<template>
  <div class="customer">
    <!-- <div :class="{container:!isMobile}"> -->
    <div class="container">
      <div class="text">
        <h2 class="title">فندقی‌ها</h2>
        <p class="description">برخی از مشتری‌های فندق</p>
      </div>
      <div class="customer-wrapper" @mouseover="stopSlider" @mouseout="startSlider">
        <div class="customer-item-wrapper">
          <div class="customer-items" v-for="(item,j) in items">
            <div
              class="customer-item"
              v-for="(image,index) in item"
              @click="setActive(image,index,j)"
              :class="{active:isActive === index && parentActive === j}"
            >
              <img :src="`${image.logo}`" alt>
              <a :href="image.link" target="_blank">{{image.text}}</a>
            </div>
          </div>
        </div>
        <div class="customer-banner">
          <div v-for="(item,j) in items">
            <div v-for="(image,index) in item" v-if="isActive === index && parentActive === j">
              <div class="customer-banner-item">
                <a
                  :href="image.link"
                  target="_blank"
                  :style="{'background-image':'url('+image.cover+')'}"
                ></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "customer",

  data() {
    return {
      isActive: 0,
      parentActive: 0,
      activeImage: "img/customer/cover-roozame.png",
      interval: null,
      activeCount: 1,
      items: [
        [
          {
            logo: "img/customer/logo-roozame.png",
            id: 1,
            cover: "img/customer/cover-roozame.png",
            text: "roozame.com",
            link: "https://roozame.com/"
          },
          {
            logo: "img/customer/logo-salameno.png",
            id: 2,
            cover: "img/customer/cover-salameno.png",
            text: "salameno.ir",
            link: "http://salameno.ir"
          }
        ],
        [
          {
            logo: "img/customer/logo-botick.png",
            id: 3,
            cover: "img/customer/botick-v.jpg",
            text: "botick.com",
            link: "https://botick.com"
          },
          {
            logo: "img/customer/logo-pay-ping-small.png",
            id: 4,
            cover: "img/customer/cover-payping.png",
            text: "payping.ir",
            link: "https://www.payping.ir"
          }
        ]
      ],
    };
  },
  computed: {
    isMobile() {
      return this.$store.state.windowWidth <= 992;
    }
  },
  mounted() {
    this.startSlider()
  },
  destroyed() {
    this.stopSlider()
  },
  methods: {
    setActive(item, index, j) {
      this.activeImage = item.cover;
      this.isActive = index
      this.parentActive = j
      if (this.isActive === 0 && this.parentActive === 0) {
        this.activeCount = 1
      }
      if (this.isActive === 1 && this.parentActive === 0) {
        this.activeCount = 2
      }
      if (this.isActive === 0 && this.parentActive === 1) {
        this.activeCount = 3
      }
      if (this.isActive === 1 && this.parentActive === 1) {
        this.activeCount = 0
      }
    },
    startSlider() {
      this.interval = setInterval(() => {
        this.activeCount += 1
        if (this.activeCount === 1) {
          this.setActive(this.items[0][0], 0, 0)
        }
        if (this.activeCount === 2) {
          this.setActive(this.items[1][0], 1, 0)
        }
        if (this.activeCount === 3) {
          this.setActive(this.items[0][1], 0, 1)
        }
        if (this.activeCount === 4) {
          this.setActive(this.items[1][1], 1, 1)
          this.activeCount = 0
        }
      }, 5000);
    },
    stopSlider() {
      clearInterval(this.interval)
    }
  }
};
</script>

<style lang="stylus" scoped>
.customer
  padding-bottom 100px
  &-wrapper
    display flex
    margin-top 40px
    @media (max-width: 1030px)
      flex-direction column-reverse
  &-item-wrapper
    @media (max-width: 1030px)
      display flex
      flex-direction column
      justify-content space-between
  &-items
    display flex
    justify-content center
    align-items center
    @media (max-width: 1030px)
      justify-content space-between
  &-item
    position relative
    display flex
    flex-direction column
    justify-content center
    align-items center
    align-content center
    margin-bottom 20px
    margin-left 30px
    min-width 270px
    min-height 180px
    border-radius 10px
    background-color rgba(0, 0, 0, 0.14)
    cursor pointer
    transition box-shadow 0.3s ease-in-out
    @media (max-width: 1200px)
      min-width 179px
      min-height 170px
      img
        @media (max-width: 1200px)
          width 96px
    @media (max-width: 1030px)
      padding 20px
      min-width auto
      min-height auto
      min-height 94px
      width 50%
    &.active
      box-shadow 0px 0px 2px 2px rgba(38, 198, 236, 1)
    a
      margin-top 20px
      color #fff
      font-weight bold
      font-size 24px
      font-family Roboto
      @media (max-width: 1200px)
        font-size 14px
    &:last-child
      margin-left 0
  &-banner
    margin-right 30px
    width 100%
    @media (max-width: 1030px)
      margin-right 0
      margin-bottom 35px
  &-banner-item
    position relative
    overflow hidden
    margin 0
    padding-top 66%
    width 100%
    border-radius 10px
    a
      position absolute
      top 0
      right 0
      width 100%
      height 100%
      border-radius inherit
      background-position 50%
      background-size cover
</style>
