<template>
  <div class="row justify-center">
    <q-card :class="backgroundColor">
      <div v-if="name">
        <div class="row  q-gutter-none justify-center">
          <div class="col-6 text-center">
            <div class="row justify-center text-h4">
              {{ name }}, {{ city.country }}
            </div>
            <div class="row text-subtitle2 text-weight-bold justify-center">
              Population: {{ city.population }}
            </div>
            <div class="row text-subtitle2 text-weight-bold justify-center">
              Lat: {{ city.coord.lat }}&deg; Lon: {{ city.coord.lon }}&deg;
            </div>
            <div class="row text-subtitle2 text-weight-bold justify-center">
              <q-icon
                name="fas fa-sun"
                class="sun-icon text-primary q-pl-sm q-pr-sm"
              />{{ rise.getHours() }}:{{ rise.getMinutes() }}
              <q-icon name="fas fa-moon" class="sun-icon text-grey q-pl-md" />
              {{ set.getHours() }}:{{ set.getMinutes() }}
            </div>
          </div>

          <div class="col-3 text-center self-end ">
            <img :src="`${this.cat}`" class="cat-image" />
          </div>
          <div class="col-3">
            <div class="row self-center items-center">
              <div class="col">
                <img
                  :src="`http://openweathermap.org/img/wn/${icon}@2x.png`"
                  class="weather-icon"
                />
              </div>
            </div>
            <div class="row skyline"></div>
          </div>
        </div>
        <div class="row  q-gutter-none text-h6 text-weight-bold justify-center">
          {{ date.toDateString() }}
        </div>
      </div>

      <div v-else class="row  q-gutter-none justify-center">
        <div class="col-auto justify-center text-center "></div>

        <div class="col-4 text-center">
          <div class="text-h6 text-weight-bold">
            {{ date.toDateString() }}
          </div>
        </div>

        <div class="col-3 text-center self-end">
          <img :src="`${this.cat}`" class="cat-image" />
        </div>

        <div class="col-3">
          <div class="row">
            <img
              :src="`http://openweathermap.org/img/wn/${icon}@2x.png`"
              class="weather-icon"
            />
          </div>
          <div class="row skyline q-py-lg"></div>
        </div>
      </div>

      <div class="col q-col-gutter-sm justify-evenly">
        <single-weather-hourly
          v-for="data in weatherData"
          :key="data.key"
          :weatherData="data"
        />
      </div>
    </q-card>
  </div>
</template>

<script>
import SingleWeatherHourly from '../components/SingleWeatherHourly.vue'
export default {
  name: 'SingleWeatherPrecise',
  components: { SingleWeatherHourly },
  props: {
    weatherData: Object,
    city: Object,
    name: String
  },
  data() {
    return {
      date: null,
      icon: null,
      cat: null,
      rise: null,
      set: null
    }
  },
  methods: {
    execute() {
      console.log(this.icon)
    }
  },
  // mounted gives an error
  created() {
    this.date = new Date(this.weatherData['0'].dt * 1000)
    this.rise = new Date(this.city.sunrise * 1000)
    this.set = new Date(this.city.sunset * 1000)
  },
  computed: {
    backgroundColor() {
      console.log('weatherData', this.weatherData)
      let classes = 'q-pa-md q-my-sm weather-main'
      if (this.weatherData) {
        this.icon = this.weatherData['0'].weather[0].icon
        let desc = this.weatherData['0'].weather[0].description
        if (desc.includes('sun')) {
          this.cat = require('../statics/cat-happy.png')
          return classes + ' nice'
        } else if (desc.includes('clear')) {
          this.cat = require('../statics/cat-happy.png')
          return classes + ' nice'
        } else if (desc.includes('snow')) {
          this.cat = require('../statics/cat-pussed.png')
          return classes + ' snow'
        } else if (desc.includes('rain')) {
          this.cat = require('../statics/cat-angry.png')
          return classes + ' bad'
        } else if (desc.includes('cloud')) {
          this.cat = require('../statics/cat-playful.png')
          return classes + ' mediocre'
        } else {
          this.cat = require('../statics/cat-playful.png')
          return classes + ' nice'
        }
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.weather-main
  border-radius: 25px
  width: 100%
  max-width: 500px
  box-shadow: 4px 4px 4px 4px
.nice
  background: linear-gradient(to top, #fc4a1a, #f7b733)
.bad
  background: linear-gradient(to top, #373b44, #4286f4)
.mediocre
  background: linear-gradient(to right, #8e9eab, #eef2f3)
.snow
  background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)
.cat-image
  padding: 0px
  margin: 0px
.weather-icon
  padding:0px
  margin: 0px
  height: 90px
.skyline
  flex: 0 0 80px
  background: url(../statics/treeline.png)
  background-size: contain
  background-position: center bottom
  height:50px
.my-card
  width: 100%
  max-width: 250px
.sun-icon
  font-size: 1.5em
</style>
