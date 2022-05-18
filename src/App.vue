<template>
  <div id="app">
    <div class="title mb-3">
      <h3>
        <b-icon-geo-alt-fill></b-icon-geo-alt-fill> {{ cityData.name }}, TX
      </h3>
      <p>{{ moment().format("dddd MMMM Do, YYYY") }}</p>
    </div>

    <WeatherSummary />
  </div>
</template>
<script>
import WeatherSummary from "./components/WeatherSummary.vue";
import moment from "moment";

export default {
  name: "App",
  components: {
    WeatherSummary,
  },
  data() {
    return {
      api_key: "api_key",
      url_base:
        "https://api.openweathermap.org/data/2.5/weather?lat=32.7831&lon=-96.8067",
      query: "",
      cityData: {},
    };
  },
  methods: {
    moment() {
      return moment();
    },
    getData() {
      const url = `${this.url_base}&units=metric&appid=${this.api_key}`;
      fetch(url)
        .then((response) => {
          return response.json();
        })
        .then(this.setResults);
    },
    setResults(data) {
      this.cityData = data;
    },
  },
  mounted() {
    this.getData();
  },
};
</script>

<style>
#app {
  font-family: open-sans, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #65aed5;
  margin-top: 60px;
}

.title h3 {
  color: white;
  font-weight: 600;
  margin-bottom: 0;
}

.title p:nth-child(2) {
  color: white;
  margin-bottom: 0;
}
</style>
