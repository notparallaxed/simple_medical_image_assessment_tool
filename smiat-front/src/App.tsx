import DicomViewer from "./components/dcmViewer";
import "./App.css";

function App() {
  const present_dcm = "wadouri:*";

  return (
    <div className="app-container">
      <h1>SMIAT</h1>

      <div onContextMenu={(e) => e.preventDefault()} className="viewer-wrapper">
        <DicomViewer imageId={present_dcm} />
      </div>

      <p>
        Arraste com o botão esquerdo para Conhttp://localhost:5173/traste e
        direito para Zoom
      </p>
    </div>
  );
}

export default App;
