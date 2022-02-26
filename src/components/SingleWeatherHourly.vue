<template>
  <div class="row q-gutter-none  ">
    <div class="col-2 text-subtitle1 text-weight-bold text-center q-pt-sm">
      {{ date.getHours() }}:00
    </div>
    <div class="col-4 text-body2 text-weight-medium q-pt-sm q-col-gutter-none ">
      <div class="row q-gutter-none  ">
        Temp min:
        {{ Number.parseFloat(weatherData.main.temp_min).toPrecision(2) }} &deg;C
      </div>
      <div class="row q-gutter-none  ">
        Temp max:
        {{ Number.parseFloat(weatherData.main.temp_max).toPrecision(2) }} &deg;C
      </div>
      <div class="row q-gutter-none  ">
        Feel:
        {{ Number.parseFloat(weatherData.main.feels_like).toPrecision(2) }}
        &deg;C
      </div>
      <div class="row q-gutter-none  ">
        Humidity:
        {{ Number.parseFloat(weatherData.main.humidity).toPrecision(2) }} %
      </div>
    </div>

    <div
      class="col-4 text-body2  text-weight-medium q-pt-sm q-col-gutter-none "
    >
      <div class="row q-gutter-none  ">
        <div v-if="weatherData.rain">
          Rain: {{ weatherData.rain['3h'] }} mm/3h
        </div>
        <div v-else>
          Rain: 0 mm/3h
        </div>
      </div>
      <div class="row q-gutter-none  ">
        Clouds: {{ weatherData.clouds.all }} %
      </div>
      <div class="row q-gutter-none  ">
        Wind: {{ weatherData.wind.speed }} m/s
      </div>
      <div class="row q-gutter-none  ">
        Visibility: {{ weatherData.visibility / 1000 }} km
      </div>
    </div>

    <div class=" col-2 text-center">
      <img
        :src="
          `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
        "
        class="weather-icon"
      />
      {{ weatherData.weather[0].description }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SingleWeatherHourly',
  props: {
    weatherData: Object
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
  computed: {}
}
</script>

<style lang="sass" scoped>
.weather-icon
  height: 60px
  padding:0px
  margin: 0px
.my-card
  width: 100%
  max-width: 3000px
  // opacity: 0.4
</style>
