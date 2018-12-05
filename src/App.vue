<template>
  <div id="app">
    <img
      alt="Vue logo"
      src="./assets/logo.png"
    >
    <FinanceChart
      :data="financeData"
    />
  </div>
</template>

<script>
import FinanceChart from '@/components/FinanceChart';
import axios from 'axios';
import d3 from '@/assets/js/d3';
const dateParser = d3.utcParse('%Y-%m-%dT%H:%M:%SZ')

export default {
  name: 'App',
  components: {
    FinanceChart,
  },
  data() {
    return {
      financeData: [],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    async getData() {
      const response = await axios.get('http://localhost:8080/data.json');
      const data = response.data.map(dataItem => (
        dataItem.map(item => ({
          value: item.value,
          dateTime: dateParser(item.dateTime),
        })
      )));
      this.financeData = data;
    },
  },
};
</script>
<style lang="stylus">
#app
  font-family 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  color #2c3e50
  margin-top 60px

g
  fill none
  i = 1
  for c in red green blue
    &:nth-child({i})
      .line
        stroke c
    i = i + 1
</style>
