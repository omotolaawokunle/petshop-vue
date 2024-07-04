/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'html2pdf.js' {
  import html2pdf from "html2pdf.js";
  export default html2pdf;
}