<template>
  <div>
    <!-- News Section -->
    <q-list padding separator>
      <q-item class="q-pa-md">
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" icon="fas fa-paw" />
        </q-item-section>

        <q-item-section>
          <q-item-label overline class="text-grey">Education</q-item-label>
          <q-item-label class="text-weight-bold"
            >Catfight on Mars Ensues
          </q-item-label>
          <q-item-label caption lines="2"
            >Secondary line text. Lorem ipsum dolor sit amet, consectetur
            adipiscit elit.</q-item-label
          >
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-item class="q-pa-md">
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" icon="fas fa-paw" />
        </q-item-section>

        <q-item-section>
          <q-item-label overline class="text-grey">Education</q-item-label>
          <q-item-label class="text-weight-bold"
            >Catfight on Mars Ensues
          </q-item-label>
          <q-item-label caption lines="2"
            >Secondary line text. Lorem ipsum dolor sit amet, consectetur
            adipiscit elit.</q-item-label
          >
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>

      <q-item class="q-pa-md">
        <q-item-section top avatar>
          <q-avatar color="primary" text-color="white" icon="fas fa-paw" />
        </q-item-section>

        <q-item-section>
          <q-item-label overline class="text-grey">Education</q-item-label>
          <q-item-label class="text-weight-bold"
            >Catfight on Mars Ensues
          </q-item-label>
          <q-item-label caption lines="2"
            >Secondary line text. Lorem ipsum dolor sit amet, consectetur
            adipiscit elit.</q-item-label
          >
        </q-item-section>

        <q-item-section side top>
          <q-item-label caption>5 min ago</q-item-label>
          <q-icon name="star" color="yellow" />
        </q-item-section>
      </q-item>
    </q-list>
    <!-- USers Section -->
    <q-list padding separator>
      <single-user v-for="(user, key) in users" :key="key" :user="user" />
    </q-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import SingleUser from './SingleUser'
export default {
  components: { SingleUser },
  name: 'NewsFeed',
  methods: {
    logOut() {
      console.log(this.users)
    }
  },
  computed: {
    ...mapGetters('store', ['users'])
  }
}
</script>
