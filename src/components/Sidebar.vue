<script setup lang="ts">
import { ref, computed } from 'vue';
import { useDoorStore } from '@/stores/main';
import Slider from 'primevue/slider';
const store = useDoorStore();

const width = computed({
  get: () => store.width,
  set: (val) => store.setWidth(val),
});
const height = computed({
  get: () => store.height,
  set: (val) => store.setHeight(val),
});
</script>

<template>
  <div class="sidebar p-5">
    <div class="card flex justify-center mb-4">
      <div class="w-56">
        <label for="width" class="mb-3 block">Ширина двери</label>
        <Slider v-model="width" :step="0.01" :min="0.7" :max="1.2" class="w-56" />
      </div>
      <span>{{ width }}</span>
    </div>
    <div class="card flex justify-center">
      <div class="w-56">
        <label for="height" class="mb-3 block">Высота двери</label>
        <Slider v-model="height" :step="0.01" :min="1.7" :max="2.4" class="w-56" />
      </div>
      <span>{{ height }}</span>
    </div>
  </div>
</template>
