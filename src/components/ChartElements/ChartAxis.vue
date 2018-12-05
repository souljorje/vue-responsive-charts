<template>
  <g
    ref="root"
    :transform="`translate(${translate})`"
  />
</template>

<script>
import d3 from '@/assets/js/d3';
import chartElement from '@/mixins/chartElement'


export default {
  name: 'Axis',
  mixins: [chartElement],
  props: {
    translate: {
      type: String,
      default: '0, 0',
    },
    tickSize: {
      type: Array,
      default: () => [null],
    },
    ticks: {
      type: Number,
      default: null,
    },
    tickPadding: {
      type: Number,
      default: null,
    },
    tickFormat: {
      type: Function,
      default: null,
    },
    scale: {
      type: Function,
      required: true,
    },
    position: {
      type: String,
      required: true,
      validator: value => ['Left', 'Right', 'Top', 'Bottom'].includes(value),
    },
    callback: {
      type: Function,
      default: (selector, config) => selector.call(config),
    },
  },
  methods: {
    setup() {
      const axisType = `axis${this.position}`;
      this.axis = d3[axisType]();
      this.render();
    },
    render() {
      this.axis
        .scale(this.scale)
        .tickSize(...this.tickSize)
        .tickFormat(this.tickFormat)
        .ticks(this.ticks);
      this.callback(d3.select(this.$refs.root), this.axis);
    },
  },
};
</script>
