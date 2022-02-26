<template>
  <transition-group
    appear
    enter-active-class="animated bounceInLeft slow"
    leave-active-class="animated bounceOutRight slower"
  >
    <q-item v-ripple class="caterwaul-main q-py-md" key="Cwaul.date">
      <q-item-section avatar top>
        <q-avatar size="xl">
          <img src="https://i.imgur.com/PqSNKmX.png" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label class="text-subtitle1">
          <strong> {{ Cwaul.user }}</strong>
          <span class="text-grey-7">{{ Cwaul.handle }}</span>
          <br class="lt-md" />
          <span class="gt-sm">&bull;</span>{{ Cwaul.date | relativeDate }}
        </q-item-label>
        <q-item-label class="caterwaul_content text-body1">
          {{ Cwaul.content }}
        </q-item-label>

        <!-- Caterwaul Buttons-->
        <div class="caterwaul-icons row justify-between q-mt-sm">
          <div class="col">
            <q-btn
              flat
              round
              color="secondary"
              icon="fas fa-comment"
              @click="commentCwaul"
            />
          </div>
          <div class="col">
            <q-btn
              flat
              round
              color="secondary"
              icon="fas fa-retweet"
              @click="commentCwaul"
            />
          </div>
          <div class="col">
            <q-btn
              flat
              round
              :color="Cwaul.likes ? 'primary' : 'secondary'"
              :icon="Cwaul.likes ? 'fas fa-heart' : 'far fa-heart'"
              @click="likeCwaul"
            />
            {{ Cwaul.likes }}
          </div>
          <div class="col">
            <q-btn
              flat
              round
              :color="Cwaul.hates ? 'deep-purple-13' : 'secondary'"
              icon="fas fa-heart-broken"
              @click="hateCwaul"
            />
            {{ Cwaul.hates }}
          </div>
          <div v-if="this.userDetails.userId === Cwaul.userId" class="col">
            <q-btn
              flat
              round
              color="secondary"
              icon="fas fa-trash"
              @click="deleteCwaul"
            />
          </div>
        </div>
      </q-item-section>
    </q-item>
  </transition-group>
</template>

<script>
import { formatDistance, subDays } from 'date-fns'
import { mapState, mapActions } from 'vuex'
export default {
  name: 'Home',
  props: {
    Cwaul: Object
  },
  data() {
    return {}
  },
  methods: {
    ...mapActions('store', ['deletePost', 'likePost', 'hatePost']),
    deleteCwaul() {
      this.deletePost(this.Cwaul)
    },
    likeCwaul() {
      this.likePost(this.Cwaul)
    },
    hateCwaul() {
      this.hatePost(this.Cwaul)
    },
    commentCwaul(Cwaul) {
      this.$emit('commentCwaul', Cwaul)
    }
  },
  filters: {
    relativeDate(value) {
      return formatDistance(value, new Date(), {
        addSuffix: true
      })
    }
  },
  computed: {
    ...mapState('store', ['userDetails'])
  }
}
</script>

<style lang="sass" scoped>
.caterwaul_content
  white-space: pre-line
.caterwaul-icons
  margin-left: -5px
.caterwaul-main
  border-top: 2px solid $grey-5
.button-hidden
</style>
