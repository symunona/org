<template>
  <div class="editor">
    <i>{{ path }}</i>
    <span v-if="file?.dirty">*</span>
    <!-- <div>
      <Editor
        :options="defaultEditorOptions"
      />

    </div> -->

    <textarea v-model="file.content"></textarea>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue"
import { getFileToEdit } from "../data"
import iFile from "../../../api/interface/iFile"
// import { Editor } from '@toast-ui/vue-editor'

const defaultEditorOptions = {
  minHeight: '200px',
  language: 'en-US',
  useCommandShortcut: true,
  usageStatistics: true,
  hideModeSwitch: false,
  toolbarItems: [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr', 'quote'],
    ['ul', 'ol', 'task', 'indent', 'outdent'],
    ['table', 'image', 'link'],
    ['code', 'codeblock'],
    ['scrollSync'],
  ]
}
export default defineComponent({
  name: "NoteEditor",
  // components: { Editor },
  props: {
    path: String,
  },
  watch: {
    path: async function (newPath: string) {
      console.log('path changed', newPath)
      this.file = await getFileToEdit(newPath)
      console.log('[ORG] file content: ', this.file.content)
    },
  },
  setup(props) {
    let file: Ref<iFile> = ref({ dirty: false, content: '', path: props.path || 'empty.md' })

    if (props.path) {
      console.log('[ORG] [Editor] Opening path: ', props.path)
      getFileToEdit(props.path).then(openedFile => {
        file.value = openedFile
      })
    } else {
      console.error('[ORG] !!! NoteEditor did not get a path.')
    }
    return { file, defaultEditorOptions }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

textarea {
  width: 100%;
  display: block;
  min-height: 100px;
  border: 0;

  &:focus {
    outline: 1px solid #7777
  }
}
</style>
