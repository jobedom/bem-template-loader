<template lang="bem-html">
   <div block="card">
      <div element="signal" modifiers="round"></div>
   </div>
</template>

<script>
   export default {};
</script>

<style lang="stylus">
   .card
      &__signal
         background #888888
         width 200px
         height 200px;

         &--small
            width 50px
            height 50px

         &--round
            border-radius 50%
</style>
