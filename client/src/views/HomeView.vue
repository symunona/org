<template>
  <div class="home">
    <Suspense>
      <QuickEdit msg="Todos" />
    </Suspense>
  </div>

  <CRow class="spaced-above">
    <CCol lg>
      <h2>recently viewed</h2>
      <div class="panel">1 of 2</div>
    </CCol>
    <CCol lg>
      <h2>active tags</h2>
      <div class="panel">2 of 2</div>
    </CCol>
  </CRow>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import QuickEdit from "@/components/QuickEdit.vue"; // @ is an alias to /src
import { CRow, CCol } from "@coreui/vue";

export default defineComponent({
  name: "HomeView",
  components: {
    QuickEdit,
    CRow,
    CCol,
  },
});
</script>
