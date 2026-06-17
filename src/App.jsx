import { useState } from "react";
import Controls from "./components/Controls";
import SheetPreview from "./components/SheetPreview";
import ZoomControls from "./components/ZoomControls";
import PrintButton from "./components/PrintButton";
import { validate } from "./utils/validate";

const initialState = {
  sheetType: "Carta",
  areaW: 10,
  areaH: 15,
};

export default function App() {
  const [state, setState] = useState(initialState);
  const [zoom, setZoom] = useState(1);

  function handleChange(partial) {
    if (partial.sheetType) setZoom(1);
    setState((prev) => ({ ...prev, ...partial }));
  }

  function handlePrint() {
    const svg = document.querySelector("#sheet-preview svg");
    if (!svg) return;

    const iframe = document.createElement("iframe");
    iframe.style.cssText =
      "position:fixed;top:0;left:0;width:0;height:0;border:0;visibility:hidden;";
    document.body.appendChild(iframe);

    iframe.contentDocument.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          @page { size: ${state.sheetType} portrait; margin: 0; }
          * { box-sizing: border-box; margin: 0; padding: 0; }
          html, body { width: 100%; height: 100%; overflow: hidden; }
          svg { display: block; width: 100%; height: 100%; }
        </style>
      </head>
      <body>${svg.outerHTML}</body>
    </html>
  `);
    iframe.contentDocument.close();

    iframe.onload = () => {
      iframe.contentWindow.focus();
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
    };
  }

  const error = validate(state.sheetType, state.areaW, state.areaH);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <div className="relative w-[70%] flex items-center justify-center p-8">
        <SheetPreview
          sheetType={state.sheetType}
          areaW={state.areaW}
          areaH={state.areaH}
          error={error}
          zoom={zoom}
        />
        <ZoomControls zoom={zoom} onZoom={setZoom} onReset={() => setZoom(1)} />
      </div>

      <div className="w-[30%] h-full border-l border-gray-200 bg-white p-6 overflow-y-auto flex flex-col">
        <h1 className="text-lg font-medium text-gray-800 mb-6">
          ArUco Sheet Generator
        </h1>
        <Controls state={state} onChange={handleChange} />
        <div className="mt-auto pt-4 border-t border-gray-200">
          <PrintButton onPrint={handlePrint} />
        </div>
      </div>
    </div>
  );
}
