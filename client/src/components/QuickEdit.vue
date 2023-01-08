<template>
  <div>
    <CNav variant="tabs" role="tablist">
      <CNavItem v-if="!quickEdit.length" active></CNavItem>
      <CNavItem v-for="file in quickEdit" v-bind:key="file">
        <CNavLink href="javascript:void(0);" :active="currentQuickEditing === file" @click="
          () => {
            currentQuickEditing = file;
          }
        ">
          {{ file }}
        </CNavLink>
      </CNavItem>
    </CNav>

    <CTabContent class="panel" v-if="currentQuickEditing">
      <NoteEditor v-bind:path="currentQuickEditing"/>
    </CTabContent>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
import type { Ref } from 'vue'
import NoteEditor from "./NoteEditor.vue"
import { CNav, CNavItem, CNavLink, CTabContent } from "@coreui/vue"
import { get } from "../data"
import iFile from "../../../api/interface/iFile"

export default defineComponent({
  name: "QuickEdit",
  components: {
    NoteEditor,
    CNav,
    CNavItem,
    CNavLink,
    CTabContent,
  },
  props: {},
  setup() {
    const quickEdit: Ref<Array<iFile|string>> = ref([])
    const currentQuickEditing: Ref<string> = ref('')

    get().then((index) => {
      console.log(index)
      quickEdit.value = index.rootOrg.quickEdit
      if (quickEdit.value.length) {
        currentQuickEditing.value = quickEdit.value[0] as string
      }
    })

    return {
      quickEdit,
      currentQuickEditing
    }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  display: inline-block;
  margin: 0 10px 0 0;
  padding: 10px;
}

.nav-item {
  padding-bottom: 0px;
  padding-left: 0;

  .nav-link,
  .active.nav-link {
    border: 0;
    border-radius: 0;
  }
}

.nav.nav-tabs {
  border-bottom: 0;
}
</style>
