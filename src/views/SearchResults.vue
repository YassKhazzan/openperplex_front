<template>
  <div class="mainContentContainer pt-0 flex-column min-vh-100 position-relative mt-3">
    <div class="row w-75 m-auto">
      <navbar :is-main="false"></navbar>
    </div>
    <div class="row w-75 m-auto">
      <div class="col-md-9 col-sm-12">
        <h5 class="alert alert-custom customFont" role="alert">
          {{ searchTitle }}
        </h5>
      </div>
    </div>

    <div class="row w-75 m-auto">
      <div class="col-md-9 col-sm-12">
        <SourcesCompnent :sources="sources"></SourcesCompnent>
      </div>

    </div>

    <div class="row w-75 m-auto">
      <div class="col-md-9 col-sm-12">


        <LoadingComponent :query="searchTitle" :sources="sources" v-if="isLoading && proMode"/>

        <div class="row mb-3" v-if="answerBox">
          <div class="card bg-card-graph">
            <div class="card-body">
              <div class="row w-100 m-auto">
                <div class="col-md-8 col-sm-12 border-end  align-content-center">
                  <h3 class="timeFont">{{ answerBox.answer }}</h3>
                </div>
                <div class="col-md-4 col-sm-12 align-content-center">
                  <div class="row w-100 m-auto fw-bold">
                    {{ answerBox.title }}
                  </div>
                  <div class="row w-100 m-auto fw-bold" v-if="answerBox.sourceLink">
                    <a :href="answerBox.sourceLink" target="_blank">{{ answerBox.source }}</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="row maxWidth m-auto mb-4" v-if="graph">
          <div class="card bg-card-graph border-2">
            <div class="card-body">
              <div class="row w-100 m-auto">
                <div class="col-2" v-if="graph.imageUrl">
                  <img :src="graph.imageUrl" alt="result image"
                       class="maxWidth shadowed-graph-image w-auto shadowed-image">
                </div>
                <div class="col-9">
                  <h5 class="mt-2">{{ graph.title }}</h5>
                  <p class="mb-1">{{ graph.type }}</p>
                </div>
                <div :class="graph.imageUrl ? 'col-1' : 'col-1 offset-2'">
                  <a class="btn border-0 text-secondary" data-bs-toggle="collapse" href="#collapseCard" role="button"
                     aria-expanded="true" aria-controls="collapseCard">
                    <fa icon="angle-down"></fa>
                  </a>
                </div>
              </div>

              <div class="collapse mt-3 show" id="collapseCard">
                <div class="row mb-2 w-100 m-auto" v-if="graph.description ">
                  <div class="col-md-4 col-sm-12 fw-bold ">
                    Description :
                  </div>
                  <div class="col-md-8 col-sm-12">
                    {{ graph.description }}
                  </div>
                </div>
                <div v-for="(value, key) in graph.attributes" :key="key"
                     class="row mb-2 w-100 m-auto small">
                  <div class="col-md-4 col-sm-12 fw-bold ">
                    {{ formatKey(key) }} :
                  </div>
                  <div class="col-md-8 col-sm-12">
                    {{ value }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row mb-3">
          <VMarkdownView
              :mode="mode"
              :content="llmResponse"
          ></VMarkdownView>
        </div>


        <Spinner v-if="isLoading && !proMode" class="mt-5"></Spinner>


        <div class="row w-100 m-auto mt-4 mb-md-5 pb-md-5 " v-if="relatedQuestions.length>0">
          <h6 class="fw-bold zenGreen">
            <fa icon="question-circle" class="me-2"></fa>
            Related Questions :
          </h6>

          <div class="row w-100 m-auto">
            <ul class="list-group list-group-flush">
              <li class="list-group-item related-li" v-for="question in relatedQuestions"
                  @click="searchNew(question)">
                <a href="#" class="text-decoration-none text-black">
                  {{ question }}
                  <fa icon="plus" class="float-end zenGreen ifNoMobile"></fa>
                </a>
              </li>
            </ul>
          </div>
          <hr class="ifMobile"/>
        </div>
        <TextAreaComponent :is-main-comp="false" @searchFunction="search_analysis_global"
                           @change-pro-mode="changeProMode"></TextAreaComponent>
      </div>
      <div class="col-md-3 col-sm-12">
        <div class="row sticky-top">
          <div class="row maxWidth m-auto justify-content-center">
            <div class="row justify-content-center mb-2" v-if="images.length > 0">
              <div class="card border-0 bg-transparent">
                <img :src="images[0]" alt="Main image"
                     class="main-img w-auto shadowed-image pointerCursor"
                     @click="showLightbox(0)">
              </div>
            </div>
            <div class="row mb-2">
              <div v-for="(image, index) in images.slice(1, 5)" :key="index" class="col-6 d-flex mb-2">
                <div class="card border-0 justify-content-center bg-transparent">
                  <img :src="image" :alt="`Image ${index + 1}`"
                       class="secondary-img w-auto shadowed-image pointerCursor"
                       @click="showLightbox(index + 1)">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <vue-easy-lightbox
        :visible="visible"
        :imgs="images"
        :index="currentIndex"
        @hide="visible = false"
    />

  </div>


</template>

<script setup>
import { ref, onBeforeMount, computed } from 'vue';
import getSources from "@/composables/search/getSources.js";
import getRelevants from "@/composables/search/getRelevants.js";
import SourcesCompnent from "@/components/searchResults/SourcesCompnent.vue";
import TextAreaComponent from "@/components/searchResults/TextAreaComponent.vue";
import LoadingComponent from "@/components/shared/LoadingComponent.vue";
import VueEasyLightbox from 'vue-easy-lightbox';
import { VMarkdownView } from 'vue3-markdown';
import 'vue3-markdown/dist/style.css';
import Navbar from "@/components/nav/navbar.vue";
import Spinner from "@/components/shared/Spinner.vue";
import getCurrentDateContext from "@/composables/utils/getCurrentDateContext.js";

const props = defineProps({
  query: String,
  proMode: Boolean,
  id: String
});

const mode = ref('light');
const isLoading = ref(false);
const query = ref('');
const proMode = ref(false);
const searchTitle = ref('');
const sources = ref([]);
const images = ref([]);
const relatedQuestions = ref([]);
const llmResponse = ref('');
const positionClass = ref('fixed-bottom tempSearchPosition');
const graph = ref(null);
const answerBox = ref(null);
const searchServer = ref('http://127.0.0.1:8000');


const storedLocation = localStorage.getItem('userCountryOpenPerplex');
const visible = ref(false);
const currentIndex = ref(0);

const showLightbox = (index) => {
  currentIndex.value = index;
  visible.value = true;
};

onBeforeMount(async () => {
  try {
    searchTitle.value = props.query;
    query.value = props.query;
    proMode.value = props.proMode;
    await search_analysis_global(query.value, proMode.value);
  } catch (e) {
    isLoading.value = false;
    console.error(e);
  }
});

const changeProMode = (proModeEmitted) => {
  proMode.value = proModeEmitted;
};

const search_analysis_global = async (queryParam) => {
  if (!queryParam?.trim()) {
    alert('Please enter a query');
    return;
  }

  try {
    resetSearchState();
    const trimmedQuery = queryParam.trim();
    searchTitle.value = trimmedQuery;

    const date_context = getCurrentDateContext();
    const url = `${searchServer.value}/search?query=${encodeURIComponent(trimmedQuery)}&pro_mode=${proMode.value}&date_context=${date_context}&stored_location=${storedLocation}`;
    const eventSource = new EventSource(url);

    let loadingUpdated = false;

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      handleEventData(data, loadingUpdated);
      if (data.type === 'finished') eventSource.close();
    };

    eventSource.onerror = handleEventError;

  } catch (e) {
    isLoading.value = false;
    alert('An error occurred, please try again');
    console.error(e);
  }
};

const handleEventData = (data, loadingUpdated) => {
  switch (data.type) {
    case 'sources':
      updateSearchResults(data.data);
      break;
    case 'llm':
      llmResponse.value += data.text;
      if (data.text && !loadingUpdated) {
        isLoading.value = false;
        loadingUpdated = true;
      }
      break;
    case 'relevant':
      relatedQuestions.value = getRelevants(data.data);
      isLoading.value = false;
      break;
  }
};

const handleEventError = (event) => {
  isLoading.value = false;
  event.target.close();
  llmResponse.value = '<p>Nous rencontrons actuellement quelques problèmes! veuillez réessayer plus tard...</p>';
};

const updateSearchResults = (data) => {
  if (data.organic?.length > 0) {
    sources.value = getSources(data.organic);
  }

  if (data.graph) {
    graph.value = { ...data.graph, imageUrl: data.images?.[0]?.imageUrl };
  }

  if (data.answerBox?.answer && !data.graph) {
    answerBox.value = data.answerBox;
  }

  if (data.images?.length > 0) {
    images.value = data.images.map(img => img.imageUrl);
  }

  updateFavicons();
};

const resetSearchState = () => {
  searchTitle.value = '';
  positionClass.value = 'fixed-bottom tempSearchPosition';
  sources.value = [];
  images.value = [];
  llmResponse.value = '';
  relatedQuestions.value = [];
  isLoading.value = true;
  graph.value = null;
  answerBox.value = null;
};

const updateFavicons = () => {
  sources.value.forEach(source => {
    const url = new URL(source.link);
    source.favicon = `https://www.google.com/s2/favicons?domain=${url.hostname}`;
  });
};

const searchNew = (question) => {
  searchTitle.value = question;
  search_analysis_global(question);
};

const formatKey = computed(() => {
  return (key) => key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
});
</script>

