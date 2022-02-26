<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-height full-width">
      <!-- header cat -->
      <top-cat />

      <!-- input section -->
      <create-caterwaul />
      <q-separator size="11px" color="searchback" class="caterwaul-main-sep" />
      <caterwauls :posts="posts" />
    </q-scroll-area>
  </q-page>
</template>

<script>
import TopCat from '../components/TopCat.vue'
import Caterwauls from '../components/Caterwauls.vue'
import CreateCaterwaul from 'src/components/CreateCaterwaul.vue'
import { mapGetters } from 'vuex'
export default {
  components: { TopCat, Caterwauls, CreateCaterwaul },
  name: 'Home',
  computed: {
    ...mapGetters('store', ['posts'])
  }
}
</script>

<style lang="sass" scoped>
.caterwaul-main-sep
  border-top: 2px solid
  border-bottom: 2px solid
  border-color: $grey-3
  margin-top: 2px
</style>
