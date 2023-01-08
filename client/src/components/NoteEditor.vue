<template>
  <div class="md-editor panel" :class="{'show-toolbar': showToolbar}">

    <div class="editor-header">
      <i v-if="showPath">{{ path }}</i>
      <span v-if="file?.dirty">*</span>
    </div>

    <button class="toolbar-toggle" @click="showToolbar = !showToolbar">T</button>

    <div ref="editor"></div>

    <!-- <textarea v-model="file.content"></textarea> -->
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, ref } from "vue"
import { getFileToEdit } from "../data"
import iFile from "../../../api/interface/iFile"
import { Editor, EditorOptions } from '@toast-ui/editor'

const defaultEditorOptions = {
  minHeight: 'auto',
  language: 'en-US',
  useCommandShortcut: true,
  usageStatistics: false,
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
  props: {
    path: String,
    showPath: Boolean
  },
  watch: {
    path: async function (newPath: string) {
      this.file = await getFileToEdit(newPath)
      console.warn('watch change', newPath)
      this.bind()
    },
    showToolbar(newVal: boolean){
      console.log(newVal)
    }
  },
  methods: {
    toggleToolbar() {
      this.showToolbar = !this.showToolbar
    },
    bind() {
      console.warn('created')
      if (this.editorInstance) {
        this.editorInstance.destroy()
      }
      this.editorInstance = new Editor({
        el: this.$refs.editor,
        height: '500px',
        initialEditType: 'markdown',
        previewStyle: "tab",
        initialValue: this.file.content,
        useCommandShortcut: true,
        usageStatistics: false,
        hideModeSwitch: true,
        toolbarItems: [
          ['heading', 'bold', 'italic', 'strike'],
          ['hr', 'quote'],
          ['ul', 'ol', 'task', 'indent', 'outdent'],
          ['image', 'link'],
          ['code', 'codeblock'],
          ['scrollSync'],
        ]
      } as EditorOptions)
    },
  },

  created() {
    if (this.$props.path) {
      console.warn('created change', this.$props.path)
      getFileToEdit(this.$props.path).then(openedFile => {
        this.file = openedFile
        this.bind()
      })
    }

  },
  setup(props) {
    let file: Ref<iFile> = ref({ dirty: false, content: '', path: props.path || 'empty.md' })
    let editorInstance: Ref<Editor | null> = ref(null)
    let showToolbar: Ref<boolean> = ref(false)
    // let editorInstance: Editor
    if (props.path) {
      console.log('[ORG] [Editor] Opening path: ', props.path)
    } else {
      console.error('[ORG] !!! NoteEditor did not get a path.')
    }
    return { file, defaultEditorOptions, editorInstance, showToolbar }
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
  min-height: 500px;
  border: 0;

  &:focus {
    outline: 1px solid #7777
  }
}

.toolbar-toggle {
  position: absolute;
  right: 0; top: 0;
  z-index: 100;
}

.md-editor{ position: relative;}

.editor-header{
  position: absolute; top: 0; left: 0;
}

</style>
