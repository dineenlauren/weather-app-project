<template>
  <b-container class="weather p-0">
    <!------------------------------------>
    <!-------- CURRENT WEATHER -------->
    <!------------------------------------>
    <b-container fluid="sm" class="current-container" v-if="weatherData">
      <b-row align-v="center" align-h="center" class="current-weather py-2">
        <b-col sm="12" md="5" order="2" order-md="1">
          <b-row align-h="center" align-v="center">
            <b-col order-md="3">
              <p>{{ citySummary.description }}</p>
            </b-col>
            <b-col order-md="1">
              <h1>{{ Math.round(cityTemp.temp) }}&deg;</h1>
            </b-col>
            <b-col>
              <b-img
                :src="imgSource + citySummary.icon + '@2x.png'"
                :alt="citySummary.description"
              />
            </b-col>
          </b-row>
        </b-col>
        <b-col sm="12" md="2" order="1" order-md="2">
          <toggle-button
            @change="getWeather()"
            :labels="{ checked: 'C\u00B0', unchecked: 'F\u00B0' }"
            :color="{ checked: '#2686bdc7', unchecked: '#2686bdc7' }"
            :font-size="22"
            :height="35"
            :width="70"
          />
        </b-col>
      </b-row>
    </b-container>
    <!------------------------------------>
    <!-------- FORECAST CONTAINER -------->
    <!------------------------------------>
    <b-container fluid class="forecast-container">
      <b-row
        cols="1"
        cols-md="5"
        v-if="weatherData"
        class="weather-data text-center"
        align-h="center"
      >
        <!-- COLUMN -->
        <b-col
          v-for="forecast in weatherData.daily.slice(0, 5)"
          :key="forecast.id"
        >
          <b-row class="text-center pt-3" align-v="center" cols-md="1">
            <b-col>
              <h5>{{ forecast.dt | formatDate }}</h5>
            </b-col>
            <b-col>
              <h2>{{ Math.round(forecast.temp.day) }}&deg;</h2>
            </b-col>
            <b-col>
              <b-img
                fluid
                :src="imgSource + forecast.weather[0].icon + '@2x.png'"
                :alt="forecast.weather[0].main"
              />
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>
<script>
import moment from "moment";
export default {
  name: "WeatherSummary",
  components: {},
  data() {
    return {
      toggleView: false,
      api_key: "api_Key",
      url_base:
        "https://api.openweathermap.org/data/2.5/onecall?lat=32.7831&lon=-96.8067&exclude=hourly,minutely&units=",
      units: "",
      cityTemp: {},
      citySummary: {},
      weatherData: null,
      imgSource: "http://openweathermap.org/img/wn/",
    };
  },
  filters: {
    formatDate: function (value) {
      if (value) {
        return moment.unix(String(value)).format("ddd");
      }
    },
  },
  methods: {
    moment() {
      return moment();
    },
    getWeather() {
      if (!this.toggleView) {
        this.units = "imperial";
      } else if (this.toggleView) {
        this.units = "metric";
      }
      const url = `${this.url_base}${this.units}&appid=${this.api_key}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then(this.setResults);
    },
    setResults(data) {
      this.toggleView = !this.toggleView;
      this.weatherData = data;
      this.cityTemp = data.current;
      this.citySummary = data.current.weather[0];
    },
  },
  mounted() {
    this.getWeather();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.weather {
  background: white;
}
.current-container {
  background-image: url("../assets/dallas.png");
  height: 300px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  box-shadow: 0px 3px 11px 0px #8888888e;
}
.current-weather {
  background: linear-gradient(
    to bottom,
    rgb(255, 255, 255),
    rgba(255, 255, 255, 0.802)
  );
}

.weather-data .row {
  border: 0.5px solid #979797;
}

img {
  filter: brightness(0.9) !important;
  -webkit-filter: brightness(0.9) !important;
}

div.col p {
  font-size: 1rem;
  text-transform: capitalize;
}
p {
  margin: 0;
}
h1 {
  font-size: calc(2.5rem + 2vw);
  font-weight: 600;
}

h2 {
  font-size: calc(2.5rem + 2vw);
}
h5 {
  color: #4a4a4a;
  font-size: calc(1rem + 2vw);
  font-weight: 700;
}

/* MEDIA QUERIES */

/* Small 576px and up */
@media (min-width: 576px) {
}

/* Medium 768px and up */
@media (min-width: 768px) {
  h2 {
    font-size: calc(2rem + 1vw);
  }
  h5 {
    font-size: 1.5rem;
  }
}

/* Large devices 992px and up */
@media (min-width: 992px) {
  h2 {
    font-size: calc(1rem + 1vw);
  }
  h5 {
    font-size: 1rem;
  }
}

/* 1200px and up) */
@media (min-width: 1200px) {
}
</style>
