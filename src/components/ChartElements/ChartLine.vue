<template>
  <g>
    <path ref="root" />
  </g>
</template>

<script>
import d3 from '@/assets/js/d3';
import chartElement from '@/mixins/chartElement'

export default {
  name: 'ChartLine',
  mixins: [chartElement],
  props: {
    data: {
      type: Array,
      default: null,
      required: true,
    },
    scaleX: {
      type: Function,
      required: true,
    },
    scaleY: {
      type: Function,
      required: true,
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
      scale: d3.line(),
      line: null,
    };
  },
  watch: {
    data() {
      this.render();
    },
  },
  // mounted() {
  //   this.setup();
  // },
  methods: {
    setup() {
      this.line = d3.select(this.$refs.root)
        .attr('class', 'line')
        .attrs(this.attrs);
      this.render();
    },
    render() {
      this.updateScale();
      this.line
        .datum(this.data)
        .attr('d', this.scale);
    },
    updateScale() {
      this.scale
        .x(d => this.scaleX(d[this.propertyX]))
        .y(d => this.scaleY(d[this.propertyY]));
    },
  },
};
</script>
