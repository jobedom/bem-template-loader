<template>
  <div bem-block="profile">
    <div bem-element="info">INFO</div>
    <div
      bem-element="picture"
      bem-modifiers="small round"
    >PICTURE</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="stylus">
.profile
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
