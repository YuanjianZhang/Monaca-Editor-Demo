<script setup>
import * as monaco from "monaco-editor";
import { toRaw,ref, onBeforeUpdate, onMounted, onBeforeMount } from "vue";
import { MenuId, MenuRegistry } from 'monaco-editor/esm/vs/platform/actions/common/actions';

const props = defineProps({
  label: String,
  id: String,
  className: String,
  config: Object,
  heightValue: String,
  removeAllMenus:Boolean,
  storageData:Boolean
});
const editorInstance = ref();
const defaultConfig = {
  value: `public class Program{
        public static void Main(string[] args){
            Console.WriteLine("Hello Word!");
        }
    }`,
  language: "csharp",
  automaticLayout: true, // 自动布局
  readOnly: false, // 是否为只读模式
  contextmenu: true, // 上下文菜单
  minimap: {
    enabled: true, // 代码缩略图
  },
  lightbulb: {
    enabled: false, // 快速修复功能
  },
  scrollBeyondLastLine: true, //滚动超出最后一行
};

onBeforeMount(() => {
  console.debug(`the component is on Before Mount.`);
});

onMounted(() => {
  const storageData = localStorage.getItem(`${props.id}_monaco_val`)||'';
  if(storageData) props.config.value=storageData;
  
  console.debug(`the component is now mounted.`);

  editorInstance.value = monaco.editor.create(
    document.getElementById(props.id),
    props.config ?? defaultConfig
  );
  if(props.storageData){
    editorInstance.value.onDidChangeModelContent((e) => {
    // do somethings ...
    // console.log("内容变更！");
    localStorage.setItem(`${props.id}_monaco_val`,toRaw(editorInstance.value).getValue())
  });
  }
  if(props.removeAllMenus){
    removeAllMenus();
  }
});
onBeforeUpdate(() => {
  console.debug(`the component is on Before Update.`);
});

const getEditor = () => toRaw(editorInstance.value);

defineExpose({
  getEditor,
});

const removeAllMenus = () => {
    const contextMenuEntry = MenuRegistry._menuItems.get(MenuId.EditorContext);
    let node = contextMenuEntry._first;
    do {
      if (node.element) {
        contextMenuEntry._remove(node);
      }
      node = node.next;
    } while (node !== undefined);
};

</script>

<template>
  <div class="editorComponents">
    <div :id="id + '_label'" class="label">{{ label }}：</div>
    <div class="editor" :id="id"></div>
  </div>
</template>

<style scoped>
.editorComponents {
  height: 100%;
  width: 100%;
}
.editorComponents .label {
  height: 20px;
  line-height: 16px;
}
.editor {
  border: 1px solid grey;
  height: calc(100% - 20px);
}
</style>