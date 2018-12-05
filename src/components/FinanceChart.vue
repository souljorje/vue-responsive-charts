<template>
  <ResponsiveWrapper class="wrapper">
    <LineChart
      slot-scope="parent"
      :width="parent.width"
      :height="parent.height"
      :margin="{
        top: 30,
        bottom: 20,
        right: 0,
        left: 20,
      }"
      :data="fullData"
      property-x="dateTime"
      property-y="value"
    >
      <template
        slot-scope="{
          scaleX,
          scaleY,
          chartHeight,
          chartWidth,
          propertyX,
          propertyY,
          margin,
        }"
      >
        <g>
          <ChartAxis
            :scale="scaleX"
            :translate="`0, ${chartHeight}`"
            :ticks="6"
            position="Bottom"
          />
          <ChartAxis
            :scale="scaleY"
            :translate="`${margin.left}, 0`"
            :ticks="6"
            position="Right"
          />
        </g>
        <ChartLine
          v-for="(dataItem, index) in data"
          :key="index"
          :scale-x="scaleX"
          :scale-y="scaleY"
          :data="dataItem"
          :property-x="propertyX"
          :property-y="propertyY"
        />
      </template>
    </LineChart>
  </ResponsiveWrapper>
</template>

<script>
import d3, { multiFormat } from '@/assets/js/d3';
import ResponsiveWrapper from '@/components/ResponsiveWrapper';
import LineChart from '@/components/LineChart/LineChart';
import ChartAxis from '@/components/ChartElements/ChartAxis';
import ChartLine from '@/components/ChartElements/ChartLine';

export default {
  name: 'FinanceChart',
  components: {
    ResponsiveWrapper,
    LineChart,
    ChartAxis,
    ChartLine,
  },
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      fullData: [],
    };
  },
  watch: {
    data(value) {
      if (value) {
        this.setFullData();
      }
    },
  },
  mounted() {
    if (this.data) {
      this.setFullData();
    }
  },
  methods: {
    setFullData() {
      this.fullData = this.data.reduce((acc, dataItem) => {
        const merged = acc.concat(dataItem);
        return merged;
      }, []);
    },
  },
};
</script>

<style lang="stylus">
.wrapper
  height 450px
</style>
