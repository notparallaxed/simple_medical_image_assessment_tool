import React, { useEffect, useRef } from "react";
import * as cornerstone from "@cornerstonejs/core";
import {
  init as cornerstoneToolsInit,
  ToolGroupManager,
  WindowLevelTool,
  ZoomTool,
  PanTool,
  Enums as csToolsEnums,
  addTool,
} from "@cornerstonejs/tools";
import cornerstoneDICOMImageLoader from "@cornerstonejs/dicom-image-loader";

interface Props {
  imageId: string;
}

const DicomViewer: React.FC<Props> = ({ imageId }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const init = async () => {
      // Inicializa o engine
      await cornerstone.init();
      await cornerstoneToolsInit();

      await cornerstoneDICOMImageLoader.init({ maxWebWorkers: 1 });

      const renderingEngineId = "my_engine";
      const viewportId = "stack_viewport";
      const renderingEngine = new cornerstone.RenderingEngine(
        renderingEngineId,
      );

      const viewportInput = {
        viewportId,
        element: containerRef.current!,
        type: cornerstone.Enums.ViewportType.STACK,
      };

      renderingEngine.enableElement(viewportInput);

      const viewport = renderingEngine.getViewport(
        viewportId,
      ) as cornerstone.Types.IStackViewport;

      const image = await cornerstone.imageLoader.loadAndCacheImage(imageId);

      await viewport.setStack([imageId]);
      viewport.render();

      // Configura as ferramentas
      addTool(WindowLevelTool);
      addTool(ZoomTool);
      addTool(PanTool);

      const toolGroupId = "dcmViewerTools";
      const toolGroup = ToolGroupManager.createToolGroup(toolGroupId)!;

      toolGroup.addTool(WindowLevelTool.toolName);
      toolGroup.addTool(ZoomTool.toolName);
      toolGroup.addTool(PanTool.toolName);

      toolGroup.addViewport(viewportId, renderingEngineId);

      // Ativa Contraste (Esquerdo) e Zoom (Direito)
      toolGroup.setToolActive(WindowLevelTool.toolName, {
        bindings: [{ mouseButton: csToolsEnums.MouseBindings.Primary }],
      });
      toolGroup.setToolActive(ZoomTool.toolName, {
        bindings: [{ mouseButton: csToolsEnums.MouseBindings.Secondary }],
      });
      toolGroup.setToolActive(PanTool.toolName, {
        bindings: [{ mouseButton: csToolsEnums.MouseBindings.Auxiliary }],
      });

      // const windowWidth = (image.windowWidth as number) ?? 400;
      // const windowCenter = (image.windowCenter as number) ?? 40;

      // viewport.setProperties({
      //   voiRange: {
      //     lower: windowCenter - windowWidth / 2,
      //     upper: windowCenter + windowWidth / 2,
      //   },
      //   VOILUTFunction: cornerstone.Enums.VOILUTFunctionType.LINEAR,
      // });

      viewport.resetCamera();
      viewport.render();
    };

    init();

    return () => {
      cornerstone.getRenderingEngine("my_engine")?.destroy();
    };
  }, [imageId]);

  return (
    <div
      ref={containerRef}
      style={{
        width: "1000px",
        height: "1000px",
        border: "1px solid #333",
        background: "#000",
      }}
    />
  );
};

export default DicomViewer;
