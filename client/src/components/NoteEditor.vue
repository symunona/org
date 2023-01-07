<template>
  <div class="editor" v-if="file">
    <i>{{ path }}</i>
    <span v-if="file?.dirty">*</span>
    <div>
      <textarea v-model="file.content"></textarea>
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"
import { getFileToEdit } from "../data"
import iFile from "../../../api/interface/iFile"

export default defineComponent({
  name: "NoteEditor",
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
  async setup(props) {
    let file: iFile = { dirty: false, content: '', path: props.path || 'empty.md' }
    if (props.path) {
      file = await getFileToEdit(props.path)
    } else {
      console.error('NoteEditor did not get a path.')
    }
    return { file }
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 { margin: 40px 0 0; }
ul { list-style-type: none; padding: 0; }
li { display: inline-block; margin: 0 10px; }
textarea{
  width: 100%; display: block; min-height: 100px; border: 0;
  &:focus{ outline: 1px solid #7777}
}
</style>
