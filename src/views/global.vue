<template>
  <TextAreaComponent v-if="showMainComp" :is-main-comp="true" @searchFunction="defineQuery" @change-pro-mode="changeProMode"></TextAreaComponent>
  <SearchResultComponent v-if="showResultComp" :query="query" :proMode="proMode"></SearchResultComponent>
</template>


<script setup>
import {onBeforeMount, ref} from "vue";
import SearchResultComponent from "@/views/SearchResults.vue";
import TextAreaComponent from "@/components/searchResults/TextAreaComponent.vue";

let showMainComp = ref(true);
let showResultComp = ref(false);

let query = ref('');
let proMode = ref(false);

onBeforeMount(() => {
  showMainComp.value = true;
});

const changeProMode = (proModeSend) => {
  proMode.value = proModeSend;
}

const defineQuery = (q) => {
  query.value = q;
  showMainComp.value = false;
  showResultComp.value = true;
}

</script>
