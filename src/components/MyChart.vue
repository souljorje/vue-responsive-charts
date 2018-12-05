<template>
  <ResponsiveWrapper :class="$style.wrapper">
    <LineChart
      slot-scope="{ parentWidth, parentHeight }"
      :width="parentWidth"
      :height="parentHeight"
      :margin="{
        top: 0,
        bottom: 20,
        right: 0,
        left: 0,
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
        }"
      >
        <g>
          <ChartAxis
            :scale="scaleX"
            :translate="`0, ${chartHeight}`"
            :ticks="6"
            :tick-format="multiFormat"
            :class="$style.axisX"
            position="Bottom"
          />
          <ChartAxis
            :scale="scaleY"
            :callback="(element, config) => createAxisY(element, config, chartHeight)"
            :tick-format="formatTicksY"
            :ticks="6"
            :tick-size="[chartWidth, chartWidth]"
            :class="$style.axisY"
            position="Right"
          />
        </g>
        <ChartLine
          v-for="dataItem in data"
          :id="dataItem.id"
          :key="dataItem.id"
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
import ResponsiveWrapper from '@/components/AppChart/ResponsiveWrapper';
import LineChart from '@/components/LineChart/LineChart';
import ChartAxis from '@/components/ChartElements/ChartAxis';
import ChartLine from '@/components/ChartElements/ChartLine';

export default {
  name: 'YeldChart',
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
      multiFormat,
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
    createAxisY(element, config, chartHeight) {
      element.call(config);
      element.select('.domain').remove();
      const axisNode = element.node();
      const tickNodes = axisNode.querySelectorAll('.tick');
      const ticksInterval = chartHeight / tickNodes.length;
      let interval = ticksInterval * tickNodes.length;
      element.selectAll('.tick')
        .each((d, i, nodes) => {
          const tick = d3.select(nodes[i]);
          tick.attr('transform', `translate(0, ${interval})`);
          interval -= ticksInterval;
        });
      element.selectAll('.tick text')
        .attr('dy', -8)
        .attr('dx', -16)
        .style('text-anchor', 'end');
    },
    /* TODO: replace % with prop */
    formatTicksY(d, i, nodes) {
      if (i === nodes.length - 1) {
        return '%';
      }
      return d;
    },
  },
};
</script>
