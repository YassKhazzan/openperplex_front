<template>
  <nav class="navbar navbar-expand-lg navbar-light">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">
        <img src="../../assets/img/logo.png" alt="openperplex Logo" height="40">
      </a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo02"
              aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </nav>

</template>

<script setup>
import {onBeforeMount, ref} from "vue";

let collapse = ref(null);
let isMainMT = ref('');

const props = defineProps({
  isMain: Boolean
});

onBeforeMount(() => {
  isMainMT.value = props.isMain ? '' : "margin-top : 24rem !important;"
})


</script>
