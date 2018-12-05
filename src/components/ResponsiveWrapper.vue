<template>
  <div ref="root">
    <slot
      :width="currentWidth"
      :height="currentHeight"
    />
  </div>
</template>

<script>
export default {
  name: 'ResponsiveWrapper',
  data() {
    return {
      currentWidth: null,
      currentHeight: null,
    };
  },
  mounted() {
    window.addEventListener('resize', this.resizeCallback);
    this.resizeCallback();
    this.setupChildrenCallbacks();
  },
  destroyed() {
    window.removeEventListener('resize', this.resizeCallback);
  },
  activated() {
    window.addEventListener('resize', this.resizeCallback);
  },
  deactivated() {
    window.removeEventListener('resize', this.resizeCallback);
  },
  methods: {
    storeDimensions({ width, height }) {
      this.currentWidth = width;
      this.currentHeight = height;
    },
    resizeCallback() {
      const {
        width,
        height,
      } = this.$refs.root.getBoundingClientRect();

      if ((width !== this.currentWidth
        || height !== this.currentHeight)
      ) {
        this.storeDimensions({ width, height });
        this.$emit('resize', { width, height });
      }
    },
    setupChildrenCallbacks() {
      this.$children.forEach((child) => {
        if (child.onResize) {
          const callBack = (oldValue, newValue) => {
            if (oldValue !== newValue) {
              child.onResize();
            }
          };
          if (typeof child.width !== 'undefined') {
            child.$watch('width', callBack);
          }
          if (typeof child.height !== 'undefined') {
            child.$watch('height', callBack);
          }
        }
      });
    },
  },
};
</script>
