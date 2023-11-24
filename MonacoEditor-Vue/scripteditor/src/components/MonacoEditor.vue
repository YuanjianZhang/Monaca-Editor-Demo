<script setup>
import * as monaco from "monaco-editor";
import { ref, onBeforeUpdate, onMounted, onBeforeMount } from "vue";
const props = defineProps({
  label: String,
  id: String,
  className: String,
  config: Object,
  heightValue: String,
});

let editorInstance = ref();
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
  console.log(`the component is on Before Mount.`);
});

onMounted(() => {
  console.log(`the component is now mounted.`);

  editorInstance = monaco.editor.create(
    document.getElementById(props.id),
    props.config ?? defaultConfig
  );
});
onBeforeUpdate(() => {
  console.log(`the component is on Before Update.`);
});

const getEditor = () => {
  return editorInstance;
};

defineExpose({
  defaultConfig,
  getEditor,
});
</script>

<template>
  <div
    class="editorComponents"
    :class="className"
    :style="{ height: heightValue }"
  >
    <div :id="id + 'Label'" class="label">{{ label }}：</div>
    <div class="editor" :id="id"></div>
  </div>
</template>

<script>
// config =  config ?? defaultConfig;
// console.log(config);

// config.onDidChangeModel = function(event){
//   console.log(event)
//   content  = event
// }

//
</script>

<style scoped>
.editorComponents {
  min-height: 50px;
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