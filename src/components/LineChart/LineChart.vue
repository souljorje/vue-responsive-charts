<template>
  <svg
    :width="width"
    :height="height"
  >
    <g
      v-if="ready"
      ref="wrapper"
    >
      <slot
        :data="data"
        :scaleX="scaleX"
        :scaleY="scaleY"
        :propertyX="propertyX"
        :propertyY="propertyY"
        :margin="margin"
        :width="width"
        :height="height"
        :chartWidth="chartWidth"
        :chartHeight="chartHeight"
      />
    </g>
  </svg>
</template>

<script>
import d3 from '@/assets/js/d3';
import chart from '@/mixins/chart';

export default {
  name: 'AppChart',
  mixins: [chart],
  props: {
    data: {
      type: Array,
      default: null,
    },
    scaleXType: {
      type: String,
      default: 'scaleTime',
    },
    scaleYType: {
      type: String,
      default: 'scaleLinear',
    },
    propertyX: {
      type: String,
      required: true,
    },
    propertyY: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      scaleX: d3[this.scaleXType](),
      scaleY: d3[this.scaleYType](),
      ready: true,
    };
  },
  computed: {
    chartWidth() {
      const {
        width,
      } = this;
      const {
        left,
        right,
      } = this.margin;
      return width - (right + left);
    },
    chartHeight() {
      const {
        height,
      } = this;
      const {
        top,
        bottom,
      } = this.margin;
      return height - (top + bottom);
    },
  },
  methods: {
    setupScales() {
      this.scaleX
        .range([0, this.chartWidth])
        .domain(d3.extent(this.data, d => d[this.propertyX]));
      this.scaleY
        .range([this.chartHeight, 0])
        .domain(d3.extent(this.data, d => d[this.propertyY])).nice();
    },
    render() {
      this.setupScales();
      this.$emit('rendered');
    },
  },
};
</script>
