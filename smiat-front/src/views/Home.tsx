import { useSearchParams } from "react-router-dom";
import DicomViewer from "../components/dcmViewer";
import MouseButtonIcon from "../components/icons/MouseButtom";
import "./Home.css";

function Home() {
  // searchParams works like an object; setSearchParams lets you change the URL
  const [searchParams] = useSearchParams();

  // Extract the specific variable 'dcmid'
  const dcmid = searchParams.get("dcmid");

  const present_dcm = "wadouri:http://localhost:5173/dicoms/" + dcmid;

  return (
    <div className="min-h-screen flex flex-col">
      <header className="flex items-center justify-between px-6 py-6.5 border-b border-gray-200">
        <div className="flex items-center gap-4">
          <span className="text-base font-bold">SMIAT - Viewer</span>
          <span className="text-gray-300">／</span>
          <span className="text-sm text-gray-500 font-mono">{dcmid}</span>
        </div>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center gap-8 pb-2">
        <div
          onContextMenu={(e) => e.preventDefault()}
          className="viewer-wrapper"
        >
          <DicomViewer imageId={present_dcm} />
        </div>

        <div className="flex gap-6 flex-wrap justify-center">
          <div className="flex items-center gap-2">
            <kbd className="w-10 h-10 rounded-md bg-gray-900 border border-gray-700 text-xs flex items-center justify-center">
              <MouseButtonIcon side="left" />
            </kbd>
            <span className="text-sm text-gray-500">Window / Level</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="w-10 h-10 rounded-md bg-gray-900 border border-gray-700 text-xs flex items-center justify-center">
              <MouseButtonIcon side="right" />
            </kbd>
            <span className="text-sm text-gray-500">Zoom</span>
          </div>
          <div className="flex items-center gap-2">
            <kbd className="w-10 h-10 rounded-md bg-gray-900 border border-gray-700 text-xs flex items-center justify-center">
              <MouseButtonIcon side="middle" />
            </kbd>
            <span className="text-sm text-gray-500">Pan</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
