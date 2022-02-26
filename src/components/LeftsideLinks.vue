<template>
  <div>
    <q-icon name="fas fa-paw" size="lg" color="primary" class="q-pa-md" />

    <q-list>
      <q-item clickable v-ripple to="/" exact>
        <q-item-section avatar>
          <q-icon name="home" size="md" />
        </q-item-section>

        <q-item-section class="h6 text-weight-bolder">Home</q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/tree" exact>
        <q-item-section avatar>
          <q-icon name="fas fa-hand-spock" size="md" />
        </q-item-section>

        <q-item-section class="h6 text-weight-bolder"
          >Tree Of Files</q-item-section
        >
      </q-item>

      <q-item clickable v-ripple to="/WeatherApp" exact>
        <q-item-section avatar>
          <q-icon name="fas fa-cloud-sun" size="md" />
        </q-item-section>

        <q-item-section class="h6 text-weight-bolder"
          >WeatherApp</q-item-section
        >
      </q-item>

      <q-item clickable v-ripple to="/WeatherAppPrecise" exact>
        <q-item-section avatar>
          <q-icon name="fas fa-cloud-sun" size="md" />
        </q-item-section>

        <q-item-section class="h6 text-weight-bolder"
          >WeatherApp Cool</q-item-section
        >
      </q-item>

      <q-item clickable v-ripple to="/about" exact>
        <q-item-section avatar>
          <q-icon name="fas fa-cat" size="md" />
        </q-item-section>

        <q-item-section class="h6 text-weight-bolder">About</q-item-section>
      </q-item>

      <q-separator />
      <login-button />
    </q-list>
  </div>
</template>

<script>
import LoginButton from './LoginButton.vue'
export default {
  components: { LoginButton },
  name: 'LeftsideLinks'
}
</script>
