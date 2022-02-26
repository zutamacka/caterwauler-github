<template>
  <div class="row justify-center">
    <q-card :class="backgroundColor">
      <div class="row  q-gutter-md justify-center">
        <div
          class="col-auto justify-center text-center "
          @click="execute"
        ></div>

        <div class="col-3 text-center">
          <div v-if="name" class="justify-center text-h4">{{ name }}</div>
          <div class="text-h6 text-weight-bold">
            {{ date.toString().slice(0, 3) }}
          </div>
          <div class="text-h6 text-weight-bold">
            {{ date.toLocaleDateString() }}
          </div>
          <div class="text-subtitle1 text-weight-thin ">
            Morning:
            {{ Number.parseFloat(weatherData.temp.morn).toPrecision(2) }}&deg; C
          </div>
          <div class="text-subtitle1 text-weight-normal ">
            Day:
            {{ Number.parseFloat(weatherData.temp.day).toPrecision(2) }}&deg; C
          </div>
          <div class="text-subtitle1 text-weight-thin ">
            Evening:
            {{ Number.parseFloat(weatherData.temp.eve).toPrecision(2) }}&deg; C
          </div>
          <div class="text-subtitle1 text-weight-thin ">
            Night:
            {{ Number.parseFloat(weatherData.temp.eve).toPrecision(2) }}&deg; C
          </div>
          <div class="text-subtitle1 text-weight-bold q-my-md">
            Wind: {{ weatherData.wind_speed }} m/s
          </div>
        </div>

        <div class="col-3 text-center">
          <img
            :src="
              `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
            "
            class="weather-icon"
          />
          <div class="col skyline"></div>
          <div class="text-h7 text-weight-bold">
            {{ weatherData.weather[0].description }}
          </div>
          <img :src="`${this.icon}`" class="image" />
        </div>
        <div class="col-auto"></div>
      </div>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'SingleWeather',
  props: {
    weatherData: Object,
    name: String
  },
  data() {
    return {
      date: null,
      icon: null
    }
  },
  methods: {
    execute() {
      let a = this.date.set
      console.log(this.date, this.weatherData.dt)
    }
  },
  // mounted gives an error
  created() {
    this.date = new Date(this.weatherData.dt * 1000)
  },
  computed: {
    backgroundColor() {
      let classes = 'q-pa-md q-my-sm weather-main'
      if (this.weatherData) {
        let desc = this.weatherData.weather[0].description
        if (desc.includes('sun')) {
          this.icon = require('../statics/cat-happy.png')
          return classes + ' nice'
        } else if (desc.includes('clear')) {
          this.icon = require('../statics/cat-happy.png')
          return classes + ' nice'
        } else if (desc.includes('snow')) {
          this.icon = require('../statics/cat-pussed.png')
          return classes + ' snow'
        } else if (desc.includes('rain')) {
          this.icon = require('../statics/cat-angry.png')
          return classes + ' bad'
        } else if (desc.includes('cloud')) {
          this.icon = require('../statics/cat-playful.png')
          return classes + ' mediocre'
        } else {
          this.icon = require('../statics/cat-playful.png')
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
.image

.weather-icon
  padding:0px
  margin: 0px
.skyline
  flex: 0 0 100px
  background: url(../statics/treeline.png)
  background-size: contain
  background-position: center bottom
  height:50px
</style>
