function resizeCallback(newValue, oldValue) {
  return newValue !== oldValue && this.update();
}

export default {
  props: {
    width: {
      type: Number,
      default: 800,
    },
    height: {
      type: Number,
      default: 500,
    },
    margin: {
      type: Object,
      default() {
        return {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
        };
      },
    },
  },
  watch: {
    width: resizeCallback,
    height: resizeCallback,
    data() {
      this.update();
    },
  },
  methods: {
    update() {
      this.render();
      this.renderChildren();
    },
    renderChildren() {
      this.$children.forEach((child) => {
        child.render();
      });
    },
  },
};
