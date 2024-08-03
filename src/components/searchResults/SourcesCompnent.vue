<template>
  <div class="row mb-2 w-100 m-auto">
    <h6 class="fw-bold mb-2 zenGreen px-0">
      <fa icon="stream" class="me-2"></fa>
      Sources
    </h6>
    <div class="row w-100 m-auto px-0" v-if="props.sources.length > 0">
      <div class="col-3 ps-0" v-for="source in props.sources.slice(0, 3)">
        <a :href="source.link" target="_blank" class="text-decoration-none text-black mb-2 small ">
          <div class="card zenCard customSource">
            <div class="card-body d-block p-2">
              <p class="fw-bold small mb-0 text-truncate">{{ source.title }}</p>
              <div class="d-flex align-items-center fw-bold small text-truncate">
                <img :src="source.favicon" alt="test" class="card-icon me-2" v-if="source.favicon">
                <img
                    src="https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png"
                    alt="test" class="card-icon me-1 fs-1" v-else>
                <span class="text-truncate fw-normal" style="flex: 1;"
                      v-if="source.snippet">{{ source.snippet.slice(0, 50) }}</span>
              </div>
            </div>
          </div>
        </a>
      </div>
      <div class="col-3 ps-0">
        <a href="#" class="text-decoration-none text-black mb-2 small w-100" type="button" data-bs-toggle="offcanvas"
           data-bs-target="#offcanvasRight"
           aria-controls="offcanvasRight">
          <div class="card zenCard customSource">
            <div class="card-body d-block p-2">
              <p class="fw-bold small mb-0 text-truncate">Show More...</p>
              <div class="d-flex align-items-center fw-bold small text-truncate">
                <img
                    src="https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png"
                    alt="test" class="card-icon me-1 fs-1">
                <span class="text-truncate fw-normal" style="flex: 1;">Show More...</span>
              </div>
            </div>
          </div>
        </a>
      </div>

    </div>


    <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasRight" aria-labelledby="offcanvasRightLabel">
      <div class="offcanvas-header">
        <h5 id="offcanvasRightLabel">Sources</h5>
        <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
      </div>
      <div class="offcanvas-body">
        <div v-if="props.sources.length > 0">
          <div class="row w-100 m-auto" v-for="source in props.sources">
            <a :href="source.link" target="_blank" class="text-decoration-none text-black mb-2 small ">
              <div class="card zenCard customSource">
                <div class="card-body d-block p-2">
                  <p class="fw-bold small mb-0 text-truncate">{{ source.title }}</p>
                  <div class="d-flex align-items-center fw-bold small text-truncate">
                    <img :src="source.favicon" alt="test" class="card-icon me-2" v-if="source.favicon">
                    <img
                        src="https://cdn3.iconfinder.com/data/icons/design-n-code/100/272127c4-8d19-4bd3-bd22-2b75ce94ccb4-512.png"
                        alt="test" class="card-icon me-1 fs-1" v-else>
                    <span class="text-truncate fw-normal" style="flex: 1;"
                          v-if="source.snippet">{{ source.snippet.slice(0, 50) }}</span>
                  </div>
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>

const props = defineProps({
  sources: Array
});

</script>