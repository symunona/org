<template>
  <div class="home">
    Editor
    <div>
      <NoteEditor :path="path"></NoteEditor>
    </div>
  </div>

  <CRow class="spaced-above">
    <CCol lg>
      <h2>latest with this tag</h2>
      <div class="panel">
        <ul>
          <li v-for="file in files" v-bind:key="file.path">
            <RouterLink :to="'/edit/' + file.path">{{ file.path }}</RouterLink>
          </li>
        </ul>
      </div>
    </CCol>
    <CCol lg>
      <h2>related tags</h2>
      <div class="panel">2 of 2</div>
    </CCol>
  </CRow>
</template>

<script lang="ts">
import { defineComponent, ref, Ref } from "vue"
import { CRow, CCol } from "@coreui/vue"
// import { load } from '../data'
// import iFile from "../../../api/interface/iFile"
import { RouterLink } from "vue-router"
import iFile from "../../../api/interface/iFile"
import NoteEditor from "../components/NoteEditor.vue"

export default defineComponent({
  name: "EditView",
  components: {
    CRow,
    CCol,
    RouterLink,
    NoteEditor
  },
  data() {
    const files: Ref<Array<iFile>> = ref([])
    return {
      path: '',
      files
    }
  },
  created() {
    console.log('created', this.$route.path)

    let path = this.$route.params.path
    if (Array.isArray(path)) {
      console.log('array', )
      this.path = path.join('/')
    }
  }
})
</script>
