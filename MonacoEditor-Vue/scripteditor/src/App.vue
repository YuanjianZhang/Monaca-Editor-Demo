<script setup>
import * as monaco from "monaco-editor";
import Editor from "./components/MonacoEditor.vue";
import { ref } from "vue";

const nupkgRef = ref();
const codeRef = ref();
const inputRef = ref();
const previewRef = ref();
const versionValue = ref("");
const methdoname = ref("");
const versions = [{ value: "NET6_0", label: ".net 6" }];


const codeconfig = {
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
    enabled: false, // 代码缩略图
  },
  lightbulb: {
    enabled: false, // 快速修复功能
  },
  scrollBeyondLastLine: true, //滚动超出最后一行
  onDidChangeModelContent: () => {
    console.log(this);
  },
};
const previewconfig = {
  value: ``,
  language: "plaintext",
  automaticLayout: true, // 自动布局
  readOnly: true, // 是否为只读模式
  contextmenu: false, // 上下文菜单
  minimap: {
    enabled: false, // 代码缩略图
  },
  lightbulb: {
    enabled: false, // 快速修复功能
  },
  scrollBeyondLastLine: true, //滚动超出最后一行
};
const nupkgconfig = {
  value: "",
  language: "plaintext",
  wordWrap: "on",
  automaticLayout: true, // 自动布局
  readOnly: false, // 是否为只读模式
  contextmenu: false, // 上下文菜单
  minimap: {
    enabled: false, // 代码缩略图
  },
  lightbulb: {
    enabled: false, // 快速修复功能
  },
  find: {
    addExtraSpaceOnTop: false,
    autoFindInSelection: "never",
    seedSearchStringFromSelection: false,
  },
  scrollBeyondLastLine: true, //滚动超出最后一行
};
const inputconfig = {
  value: "Newtonsoft.Json",
  language: "csharp",
  wordWrap: "off",
  automaticLayout: true, // 自动布局
  readOnly: false, // 是否为只读模式
  contextmenu: false, // 上下文菜单
  minimap: {
    enabled: false, // 代码缩略图
  },
  lightbulb: {
    enabled: false, // 快速修复功能
  },
  find: {
    addExtraSpaceOnTop: false,
    autoFindInSelection: "never",
    seedSearchStringFromSelection: false,
  },
  scrollBeyondLastLine: true, //滚动超出最后一行
};

const Execute = ()=>{
  console.log(codeRef.value.getEditor().getValue())
}
</script>

<template>
  <div class="content" style="min-width: 800px">
    <div class="container input">
      <el-row>
        <el-col :span="8">
          <el-text>C#</el-text>
        </el-col>
        <el-col :span="16" style="min-width: 350px">
          <el-row :gutter="20" justify="end" align="center">
            <el-col :span="8">
              <el-select v-model="versionValue" placeholder="Select">
                <el-option
                  v-for="item in versions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-col>
            <el-col :span="12">
              <el-input
                v-model="methdoname"
                placeholder="Please input Run Methodname"
              ></el-input>
            </el-col>
            <el-col :span="4">
              <el-button id="executeBtn" @click="Execute" type="primary"
                >Run</el-button
              >
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <Editor
        id="nupkg"
        heightValue="120px"
        label="Nuget Reference"
        ref="nupkgRef"
        :config="nupkgconfig"
      />
      <Editor
        id="code"
        heightValue="calc(100% - 60px - 100px - 100px)"
        label="Code"
        ref="codeRef"
        :config="codeconfig"
      ></Editor>
      <Editor
        id="input"
        heightValue="120px"
        label="Input"
        ref="inputRef"
        :config="inputconfig"
      ></Editor>
    </div>
    <div class="separate">
      <div class="resizeline"></div>
    </div>
    <div class="container output">
      <Editor
        id="preview"
        heightValue="100%"
        label="Output"
        ref="previewRef"
        :config="previewconfig"
      ></Editor>
    </div>
  </div>
</template>

<script>


/**
 
let x = 0;
let y = 0;
let dragging = 0;
document.addEventListener("DOMContentLoaded", (event) => {
  editorInit();

  executeInit();

  DraggInit();

  window.addEventListener("resize", (event) => {
    console.debug("resize", window.innerHeight, window.innerWidth);

    document.querySelector(".input").style.setProperty("width", "50%");
    document.querySelector(".output").style.setProperty("width", "50%");
  });
});


function DraggInit() {
  document.querySelector(".separate").onmousedown = function (e) {
    e.preventDefault();
    dragging = 1;
    x = e.screenX;
    document.querySelector(".content").addEventListener("mousemove", resize);
  };
  document.onmouseup = function () {
    dragging ? clearJSEvents() : "";
  };

  document.querySelector("#input-label").onmousedown = function (e) {
    e.preventDefault();
    dragging = 1;
    y = e.screenY;
    document.querySelector(".content").addEventListener("mousemove", resizeY);
  };
}

function clearJSEvents() {
  dragging = 0;
  x = 0;
  y = 0;
  document.querySelector(".content").removeEventListener("mousemove", resize);
  document.querySelector(".content").removeEventListener("mousemove", resizeY);
}

function resize(e) {
  if (dragging) {
    var inputwidth =
      document.querySelector(".input").clientWidth + (e.screenX - x);
    var outputwidth =
      document.querySelector(".output").clientWidth - (e.screenX - x);
    if (outputwidth < 400 || inputwidth < 400) {
      return;
    }
    console.debug("inputwidth", inputwidth, "outputwidth", outputwidth);
    document
      .querySelector(".input")
      .style.setProperty("width", inputwidth + "px");
    document
      .querySelector(".output")
      .style.setProperty("width", outputwidth + "px");
    x = e.screenX;
  }
}
function resizeY(e) {
  if (dragging) {
    var codeheight =
      document.querySelector("#code").clientHeight + (e.screenY - y);
    var inputheight =
      document.querySelector("#input").clientHeight - (e.screenY - y);
    if (codeheight < 300 || inputheight < 80) {
      return;
    }
    console.debug("codeheight", codeheight, "inputheight", inputheight);
    document
      .querySelector("#code")
      .style.setProperty("height", codeheight + "px");
    document
      .querySelector("#input")
      .style.setProperty("height", inputheight + "px");
    y = e.screenY;
  }
}
 */
</script>

<style scoped>
</style>
