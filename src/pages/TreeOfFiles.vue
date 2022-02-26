<template>
  <q-page class="relative-position">
    <q-scroll-area class="absolute full-height full-width">
      <!-- header cat -->
      <top-cat />
      <h3 class="main-entry">I am your File Tree</h3>
      <div class="col" clickable @click="loadFileTree">
        <q-avatar size="xl">
          <img src="https://i.imgur.com/PqSNKmX.png" />
        </q-avatar>
      </div>
      <div><img src="../assets/cat.jpg" /></div>

      <!-- input section -->
      <q-separator size="11px" color="searchback" class="caterwaul-main-sep" />
    </q-scroll-area>
  </q-page>
</template>

<script>
import TopCat from '../components/TopCat.vue'

export default {
  components: { TopCat },
  name: 'TreeOfFiles',
  methods: {
    loadFileTree() {
      const dirTree = require('directory-tree')
      const tree = dirTree('./assets/')
      console.log('tree:', tree)
      console.log('tree:', dirTree)
      // const pages = require.context('./components/')
      // const comps = require.context('./components', true, /[A-Z]\w+\.vue$/)
      // console.log('tree:', comps)
    }
  },
  updated() {},
  computed: {}
}
</script>

<style lang="sass" scoped>
.caterwaul-main-sep
  border-top: 2px solid
  border-bottom: 2px solid
  border-color: $grey-3
  margin-top: 2px
</style>
