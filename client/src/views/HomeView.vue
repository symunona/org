<template>
  <div class="home">
    <Suspense>
      <QuickEdit />
    </Suspense>
  </div>

  <CRow class="spaced-above">
    <CCol lg>
      <h2>recently viewed</h2>
      <div class="panel">
        <ul>
          <li v-for="file in files" v-bind:key="file.path">
            <RouterLink :to="'/edit/' + file.path">{{ file.path }}</RouterLink>
          </li>
        </ul>
      </div>
    </CCol>
    <CCol lg>
      <h2>active tags</h2>
      <div class="panel">2 of 2</div>
    </CCol>
  </CRow>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue"
import QuickEdit from "@/components/QuickEdit.vue" // @ is an alias to /src
import { CRow, CCol } from "@coreui/vue"
import { recentlyEdited, get } from '../data'
import iFile from "../../../api/interface/iFile"
import { RouterLink } from "vue-router"

export default defineComponent({
  name: "HomeView",
  components: {
    QuickEdit,
    CRow,
    CCol,
    RouterLink
},
  setup() {
    const files: Ref<Array<iFile>> = ref([])
    get().then(()=>files.value = recentlyEdited(10))
    return {
      files
    }
  }
})
</script>
