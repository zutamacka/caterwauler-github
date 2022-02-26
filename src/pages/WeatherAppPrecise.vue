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
        <template v-if="todayData">
          <single-weather-precise
            :weatherData="todayData"
            :city="city"
            :name="city.name"
          />
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
        <div class="col skyline"></div>

        <div v-if="dailyData">
          <single-weather-precise
            v-for="data in dailyData"
            :key="data.key"
            :weatherData="data"
            :city="city"
          />
        </div>
      </q-scroll-area>
    </q-page>
  </div>
</template>

<script>
import TopCat from '../components/TopCat.vue'
import SingleWeatherPrecise from '../components/SingleWeatherPrecise.vue'
export default {
  components: { TopCat, SingleWeatherPrecise },
  name: 'WeatherAppPrecise',
  data() {
    return {
      location: '',
      error: '',
      // data for today
      todayData: null,
      // data for other days
      dailyData: null,
      //
      //all data
      combinedData: null,
      alerts: null,
      lat: null,
      lon: null,
      city: null,
      apiUrlCurrent: 'https://api.openweathermap.org/data/2.5/weather',
      apiUrlOneCall: 'https://api.openweathermap.org/data/2.5/onecall',
      apiDaysHours: 'https://api.openweathermap.org/data/2.5/forecast',
      apiKey: '9a35e80d7621ee9c5a2a8361729aac5a',
      initData: null
    }
  },
  computed: {
    backgroundColor() {
      if (this.currentPData) {
        if (this.currentPData.weather[0].icon.slice(-1) === 'd') {
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
  // mounted throws an error!
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
        `${this.apiDaysHours}?lat=${this.lat}&lon=${this.lon}&appid=${this.apiKey}&units=metric`
      ).then(
        response => {
          console.log(response)
          this.collectData(response)
          this.error = ''
        },
        error => {
          console.log(error)
          this.error = 'Location Not Found.'
        }
      )
    },
    getDataBySearch() {
      this.$axios(
        `${this.apiDaysHours}?q=${this.location}&appid=${this.apiKey}&units=metric`
      ).then(
        response => {
          console.log(response)
          this.collectData(response)
          this.error = ''
        },
        error => {
          console.log(error)
          this.error = 'Location Not Found.'
        }
      )
    },
    getDataByIdunno() {
      this.$axios(
        `${this.apiDaysHours}?q=${this.city.name}&appid=${this.apiKey}&units=metric`
      ).then(
        response => {
          console.log(response)
        },
        error => {
          console.log(error)
          this.error = 'Location Not Found.'
        }
      )
    },
    collectData(response) {
      this.city = response.data.city
      this.lat = response.data.city.coord.lat
      this.lon = response.data.city.coord.lon
      // save all data, for checking purposes
      this.combinedData = response

      // collect hourly data - every 3 hours - and sort by date
      let data = this.combinedData.data.list
      let prevDate = new Date(data[0].dt * 1000).toDateString()
      this.dailyData = {}
      let wdata = {}
      let i = 0,
        j = 0
      data.forEach(hour => {
        let date = new Date(hour.dt * 1000).toDateString()
        // console.log(date, prevDate)
        if (date === prevDate) {
          wdata[`${i}`] = hour
          i++
        } else {
          this.dailyData[`${j}`] = wdata
          j++
          i = 0
          wdata = {}
        }
        prevDate = date
      })
      this.todayData = {}
      Object.assign(this.todayData, this.dailyData['0'])
      delete this.dailyData['0']
      console.log('this.dailyData ', this.dailyData)
      console.log('this.todayData ', this.todayData)
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
      this.getDataByIdunno()
      console.log('Init data:', this.initData)
      console.log('todayData:', this.todayData)
      console.log('dailyData:', this.dailyData)
      // console.log('hourlyData:', this.hourlyData)
      // console.log('allData:', this.allData)
      console.log('combinedData:', this.combinedData)
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
