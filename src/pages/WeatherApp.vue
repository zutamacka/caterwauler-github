<template>
  <div :class="backgroundColor">
    <q-page class="relative-position">
      <q-scroll-area class="absolute full-height full-width">
        <!-- header cat -->
        <top-cat />
        <q-separator
          size="11px"
          color="searchback"
          class="caterwaul-main-sep"
        />
        <!-- input section -->
        <div class="col q-pt-lg q-px-md">
          <q-input
            bottom-slots
            v-model="location"
            color="secondary"
            @keyup.enter="getDataBySearch"
          >
            <template v-slot:prepend>
              <q-icon
                name="my_location"
                color="secondary"
                @click="getLocation"
              />
            </template>
            <template v-slot:append>
              <q-icon
                name="close"
                @click="location = ''"
                class="cursor-pointer"
              />
            </template>

            <template v-slot:hint>
              Location
            </template>
          </q-input>
          {{ error }}
        </div>
        <!--
        <div class="col q-pt-lg">
          <q-btn flat @click="logToConsole">
            <q-icon left size="3em" name="bug_report" color="accent" />
          </q-btn>
        </div>
-->
        <template v-if="currentData">
          <single-weather :weatherData="currentData" :name="name" />
        </template>

        <template v-else>
          <div class="col text-center">
            <div class="col text-h2 text-weight-thin">
              Caterwauling Weather
            </div>
            <div class="col q-pt-lg">
              <q-btn flat @click="getLocation">
                <q-icon left size="3em" name="my_location" color="secondary" />
                <div class="blue-text">Find My Location</div>
              </q-btn>
            </div>
          </div>
        </template>

        <!-- bottom section -->
        <div class="col skyline">h</div>

        <div v-if="dailyData">
          <single-weather
            v-for="data in dailyData"
            :key="data.key"
            :weatherData="data"
          />
        </div>
      </q-scroll-area>
    </q-page>
  </div>
</template>

<script>
import TopCat from '../components/TopCat.vue'
import SingleWeather from '../components/SingleWeather.vue'
export default {
  components: { TopCat, SingleWeather },
  name: 'WeatherApp',
  data() {
    return {
      location: '',
      error: '',
      allData: null,
      currentData: null,
      nowData: null,
      dailyData: null,
      hourlyData: null,
      alerts: null,
      lat: null,
      lon: null,
      name: null,
      apiUrlCurrent: 'https://api.openweathermap.org/data/2.5/weather',
      apiUrlOneCall: 'https://api.openweathermap.org/data/2.5/onecall',
      apiDaysHours: 'https://api.openweathermap.org/data/2.5/forecast',
      apiKey: '9a35e80d7621ee9c5a2a8361729aac5a',
      initData: null
    }
  },
  computed: {
    backgroundColor() {
      if (this.currentData) {
        if (this.currentData.weather[0].icon.slice(-1) === 'd') {
          return 'daytime'
        }
        return 'nightime'
      }
      if (this.initData) {
        if (this.initData.weather[0].icon.slice(-1) === 'd') {
          return 'daytime'
        }
        return 'nightime'
      }
      return 'newtral'
    }
  },
  created() {
    this.initialise()
  },
  methods: {
    initialise() {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude
        this.lon = position.coords.longitude
        this.$axios(
          `${this.apiUrlOneCall}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`
        ).then(response => {
          this.initData = response.data.current
        })
      })
    },
    getLocation() {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude
        this.lon = position.coords.longitude
        this.getWeatherByCoords()
      })
    },
    getWeatherByCoords() {
      this.$axios(
        `${this.apiUrlCurrent}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`
      ).then(response => {
        this.collectData(response)
        this.error = ''
      })
    },
    getDataBySearch() {
      this.$axios(
        `${this.apiUrlCurrent}?q=${this.location}&appid=${this.apiKey}&units=metric`
      ).then(
        response => {
          this.collectData(response)
          this.error = ''
        },
        error => {
          console.log(error)
          this.error = 'Location Not Found.'
        }
      )
    },
    collectData(responseCurrent) {
      this.name = responseCurrent.data.name
      this.lat = responseCurrent.data.coord.lat
      this.lon = responseCurrent.data.coord.lon
      this.nowData = responseCurrent.data
      this.$axios(
        `${this.apiUrlOneCall}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`
      ).then(
        response => {
          // console.log(response)
          this.currentData = response.data.daily[0]
          let daily = response.data.daily
          daily.shift()
          this.dailyData = daily
          this.hourlyData = response.data.hourly
          this.alerts = response.data.alerts
          this.allData = response
          this.error = ''
        },
        error => {
          console.log(error)
          this.error = 'There was a problem with getting your data.'
        }
      )
    },
    // HELPER - DEBUG METHODS
    downloadObjectAsJson(exportObj, exportName) {
      var dataStr =
        'data:text/json;charset=utf-8,' +
        encodeURIComponent(JSON.stringify(exportObj))
      var downloadAnchorNode = document.createElement('a')
      downloadAnchorNode.setAttribute('href', dataStr)
      downloadAnchorNode.setAttribute('download', exportName + '.json')
      document.body.appendChild(downloadAnchorNode) // required for firefox
      downloadAnchorNode.click()
      downloadAnchorNode.remove()
    },
    logToConsole() {
      console.log('Init data:', this.initData)
      console.log('currentData:', this.currentData)
      console.log('nowData:', this.nowData)
      console.log('dailyData:', this.dailyData)
      console.log('hourlyData:', this.hourlyData)
      console.log('allData:', this.allData)
      // this.downloadObjectAsJson(this.allData, 'file')
    }
  }
}
</script>

<style lang="sass" scoped>
.caterwaul-main-sep
  border-top: 2px solid
  border-bottom: 2px solid
  border-color: $grey-3
  margin-top: 2px
.image
  width: 150px
.skyline
  flex: 0 0 100px
  background: url(../statics/treeline.png)
  background-size: contain
  background-position: center bottom
.blue-text
  color: $secondary
.daytime
  background: linear-gradient(to top, #fc4a1a, #f7b733)
  height: 100%
.nightime
  background: linear-gradient(to top, #373b44, #4286f4)
  height: 100%
.newtral
  background: linear-gradient(to top, #ada996, #f2f2f2, #dbdbdb, #eaeaea)
  height: 100%
.center-weather
  justify-content: center
  text-align:center
</style>
