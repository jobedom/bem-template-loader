<template>
   <div block="profile">
      <div element="info">INFO</div>
      <div
         element="picture"
         modifiers="small round"
      >PICTURE
      </div>
   </div>
</template>

<script>
   export default {};
</script>

<style lang="stylus">
   .profile
      border 1px solid #cccccc
      border-radius 1em
      padding 1em

      &__info
         background yellow

         &__picture
            background orange
            width 100px
            height 100px

            &--small
               width 50px
               height 50px

            &--round
               border-radius 50%
</style>
