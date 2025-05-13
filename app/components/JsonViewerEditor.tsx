import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-github";

interface JsonViewerEditorProps {
  initialValue?: object;
}

const JsonViewerEditor: React.FC<JsonViewerEditorProps> = ({
  initialValue,
}) => {
  const [jsonContent, setJsonContent] = useState(
    JSON.stringify(initialValue || {}, null, 2)
  );

  const handleChange = (value: string) => {
    setJsonContent(value);
  };

  const handleBeautify = () => {
    try {
      const parsed = JSON.parse(jsonContent);
      setJsonContent(JSON.stringify(parsed, null, 2));
    } catch (err) {
      alert("Invalid JSON format");
    }
  };

  return (
    <div className="editor-wrapper" style={{ padding: 16 }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">JSON Viewer / Editor</h2>
        <button
          onClick={handleBeautify}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow-md hover:bg-blue-700 transition-colors cursor-pointer"
        >
          Beautify JSON
        </button>
      </div>

      <AceEditor
        mode="json"
        theme="github"
        name="json-editor"
        width="100%"
        height="500px"
        fontSize={14}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        value={jsonContent}
        onChange={handleChange}
        setOptions={{
          useWorker: false,
          showLineNumbers: true,
          tabSize: 2,
        }}
      />
    </div>
  );
};

export default JsonViewerEditor;
