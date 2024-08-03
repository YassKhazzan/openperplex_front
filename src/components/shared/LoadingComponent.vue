<template>
  <div class="card dashed-border mb-3">
    <div class="card-body">
      <p class="fw-bold  mb-0">Searching "{{ query.slice(0, 30) }}..."</p>
      <div class="loading-container">
        <div class="loading-row row-1"></div>
      </div>
      <div class="mt-3" v-if="sources && sources.length > 0">
        <p class="fw-bold  mb-0">Sources found</p>
        <span class="badge rounded-pill bg-card-graph text-dark me-2" v-for="source in sources.slice(0, 3)">
          <img :src="source.favicon" alt="test" class="card-icon me-1" v-if="source.favicon">
          {{ source.title.slice(0, 30) }}
        </span>
        <span class="badge rounded-pill bg-card-graph text-dark me-2">
          <img src="https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png"
               alt="test" class="card-icon me-1">
          + {{sources.length - 3}} more
        </span>
        <p id="div1" class="fw-bold  mb-0 mt-3" v-if="showDiv1">Analysing resources ...</p>
        <p id="div2" class="fw-bold  mb-0 mt-3" v-if="showDiv2">Answer generation <span class="dots"></span></p>
      </div>
    </div>
  </div>

</template>

<script setup>
import {ref, watch} from 'vue';

const props = defineProps({
  query: String,
  sources: Array
});

let showDiv1 = ref(true);
let showDiv2 = ref(true);

watch(() => props.sources, (newSources) => {
  if (newSources && newSources.length > 0) {
    showDiv1.value = true;
    setTimeout(() => {
      showDiv2.value = true;
    }, 1000);
  }
});

watch(() => props.sources, () => {
  if (props.sources && props.sources.length > 0) {
    showDiv1.value = true;
    setTimeout(() => {
      showDiv2.value = true;
    }, 1000);
  }
})

</script>

<style scoped>
.loading-container {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.loading-row {
  height: 20px;
  width: 100%;
  animation: loading-animation 1s infinite;
}

.row-1 {
  background-color: #f3f3ee;
}

.row-2 {
  background-color: #f3f3ee;
}

@keyframes loading-animation {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.5;
  }
}

.dots::after {
  content: '';
  display: inline-block;
  width: 1em;
  height: 1em;
  text-align: left;
  animation: ellipsis 1s steps(4, end) infinite;
}

@keyframes ellipsis {
  0% {
    content: '';
  }
  25% {
    content: '.';
  }
  50% {
    content: '..';
  }
  75% {
    content: '...';
  }
  100% {
    content: '';
  }
}
</style>