import React, { useEffect, useRef } from 'react';
import dynamic from "next/dynamic";
import 'suneditor/dist/css/suneditor.min.css';
import SunEditor from 'suneditor-react/dist/components/SunEditor';
// import SunEditor from 'suneditor-react/dist/components/SunEditor';
// const SunEditor = dynamic(() => import("suneditor-react"), {
//   ssr: false,
// });


const QuillEditor = ({ value, onChange }) => {


  const editorOptions = {
    buttonList: [
      ['undo', 'redo'],
      ['bold', 'underline', 'italic', 'strike', 'subscript', 'superscript'],
      ['fontColor', 'hiliteColor'],
      ['indent', 'outdent'],
      ['align', 'list'],
      ['link'],
    ],
  };

  return <SunEditor onChange={(cont)=>{console.log(cont);}} setOptions={editorOptions} />



  
};

export default QuillEditor;
