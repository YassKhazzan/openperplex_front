<template>
  <div v-if="!isMainComp" class="row w-100 m-auto mt-2 pb-3 fixed-bottom tempSearchPosition">
    <div class="shadow search-bar-input-group container px-1 m-0 mx-auto">
            <textarea tabindex="0"
                      autocomplete="off"
                      autocapitalize="off"
                      spellcheck="false"
                      name="q"
                      class="ifMobile form-control bg-white fs-6 px-2 pt-2 pb-0 my-1 mx-0 row border-0 textAreaMaxHeight"
                      :rows="rows"
                      placeholder="Ask your question..."
                      aria-label="Ask your question.."
                      id="inputTextArea"
                      v-model="query"
                      @input="autoResizeTextarea"
            >
            </textarea>
      <textarea tabindex="0"
                autocomplete="off"
                autocapitalize="off"
                spellcheck="false"
                name="q"
                class="ifNoMobile form-control bg-white fs-6 px-2 pt-2 pb-0 my-1 mx-0 row border-0 textAreaMaxHeight"
                :rows="rows"
                placeholder="Ask your question..."
                aria-label="Ask your question..."
                id="inputTextAreaWeb"
                @keydown="handleKeyDown"
                v-model="query"
                @input="autoResizeTextareaWeb"
      >
            </textarea>
      <div class="row maxWidth m-auto">


        <div class="col-4 ms-auto d-flex align-items-center justify-content-end pe-0">
          <div class="form-check form-switch me-3">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" v-model="proMode"
                   @change="changeProMode">
            <label class="form-check-label customFont" for="flexSwitchCheckDefault">Pro</label>
          </div>
          <button class="btn btn-sm border-0 green-btn roundedBtn-var lift" @click="searchFunction"
                  :disabled="query.trim().length === 0">
            <fa icon="arrow-right"></fa>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-else class="mainContentContainer d-flex flex-column align-items-center justify-content-center min-vh-100">
    <div class="centeredContent">
      <div class="row">
        <img src="../../assets/img/logo.png" class="logo" alt="logo">
      </div>
      <h5 class="customFont mobileFontSize">Your Portal to knowledge</h5>

      <div class="shadow search-bar-input-group container px-1 m-0 mx-auto">
       <textarea tabindex="0"
                 autocomplete="off"
                 autocapitalize="off"
                 spellcheck="false"
                 name="q"
                 class="ifMobile form-control bg-white fs-6 px-2 pt-2 pb-0 my-1 mx-0 row border-0 textAreaMaxHeight"
                 :rows="rows"
                 placeholder="Ask your question ..."
                 aria-label="Ask your question ..."
                 v-model="query"
                 id="inputTextArea"
                 @input="autoResizeTextarea"
       >
       </textarea>
        <textarea tabindex="0"
                  autocomplete="off"
                  autocapitalize="off"
                  spellcheck="false"
                  name="q"
                  class="ifNoMobile form-control bg-white fs-6 px-2 pt-2 pb-0 my-1 mx-0 row border-0 textAreaMaxHeight"
                  :rows="rows"
                  placeholder="Ask your question..."
                  aria-label="Ask your question..."
                  v-model="query"
                  id="inputTextAreaWeb"
                  @keydown="handleKeyDown"
                  @input="autoResizeTextareaWeb"
        >
       </textarea>
        <div class="row maxWidth m-auto">

          <div class="col-4 ms-auto d-flex align-items-center justify-content-end pe-0">
            <div class="form-check form-switch me-3 ">
              <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                     v-model="proMode" @change="changeProMode">
              <label class="form-check-label customFont" for="flexSwitchCheckDefault">Pro</label>
            </div>
            <button class="btn btn-sm border-0 green-btn roundedBtn-var lift" @click="searchFunction"
                    :disabled="query.trim().length === 0">
              <fa icon="arrow-right"></fa>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>


</template>

<script setup>
import {ref} from "vue";


const props = defineProps({
  isMainComp: Boolean,
});

let rows = ref(2);
let query = ref("");
let proMode = ref(false);

const emit = defineEmits(['searchFunction', 'changeProMode']);

const changeProMode = () => {
  emit('changeProMode', proMode.value);
}

const searchFunction = async () => {
  await emit('searchFunction', query.value.trim(), proMode.value);
  query.value = '';
}

const autoResizeTextarea = () => {
  let textAreaElem = document.getElementById('inputTextArea');
  if (textAreaElem) {
    textAreaElem.style.height = 'auto'; // Reset the height
    textAreaElem.style.height = textAreaElem.scrollHeight + 'px'; // Set the height to the scroll height
  }
}

const autoResizeTextareaWeb = () => {
  let textAreaElemWeb = document.getElementById('inputTextAreaWeb');
  if (textAreaElemWeb) {
    textAreaElemWeb.style.height = 'auto'; // Reset the height
    textAreaElemWeb.style.height = textAreaElemWeb.scrollHeight + 'px'; // Set the height to the scroll height
  }
}

const handleKeyDown = async (event) => {
  const isEnter = event.key === 'Enter';
  const isShift = event.shiftKey;
  const isEmpty = query.value.trim() === '';

  if (isEnter && !isEmpty && !isShift) {
    event.preventDefault();
    await searchFunction();
  }
}


</script>
