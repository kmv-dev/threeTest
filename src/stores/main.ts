import { defineStore } from 'pinia';

export const useDoorStore = defineStore('door', {
  state: () => ({
    width: 0.9,
    height: 2.0,
  }),
  actions: {
    setWidth(value: number) {
      this.width = value;
    },
    setHeight(value: number) {
      this.height = value;
    },
  },
});
