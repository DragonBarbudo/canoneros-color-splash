
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ColorPicker } from "@/components/ColorPicker";
import { BrushSizeSelector } from "@/components/BrushSizeSelector";
import { Download, RotateCcw } from "lucide-react";
import { toast } from "sonner";

interface PaintCanvasProps {
  imageUrl: string;
}

export const PaintCanvas = ({ imageUrl }: PaintCanvasProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const backgroundCanvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#553178");
  const [brushSize, setBrushSize] = useState(20);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const backgroundCanvas = backgroundCanvasRef.current;
    const image = imageRef.current;
    
    if (!canvas || !backgroundCanvas || !image) return;

    const ctx = canvas.getContext("2d");
    const bgCtx = backgroundCanvas.getContext("2d");
    if (!ctx || !bgCtx) return;

    image.onload = () => {
      // Set square canvas size
      const size = 600;
      canvas.width = size;
      canvas.height = size;
      backgroundCanvas.width = size;
      backgroundCanvas.height = size;
      
      // Clear both canvases
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bgCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
      
      // Set background to white for painting
      bgCtx.fillStyle = "#ffffff";
      bgCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
      
      // Draw the original image in square format
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    image.src = imageUrl;
  }, [imageUrl]);

  const getEventPos = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = backgroundCanvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    let clientX, clientY;
    
    if ('touches' in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else {
        clientX = e.changedTouches[0].clientX;
        clientY = e.changedTouches[0].clientY;
      }
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const pos = getEventPos(e);
    setIsDrawing(true);
    setLastX(pos.x);
    setLastY(pos.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing) return;
    
    const canvas = backgroundCanvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const pos = getEventPos(e);
    
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    
    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    
    setLastX(pos.x);
    setLastY(pos.y);
  };

  const stopDrawing = (e?: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e?.preventDefault();
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const backgroundCanvas = backgroundCanvasRef.current;
    const bgCtx = backgroundCanvas?.getContext("2d");
    
    if (!bgCtx || !backgroundCanvas) return;
    
    bgCtx.fillStyle = "#ffffff";
    bgCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
    toast.success("¡Lienzo limpio! ¡Empieza a pintar de nuevo! 🎨");
  };

  const exportImage = () => {
    const canvas = canvasRef.current;
    const backgroundCanvas = backgroundCanvasRef.current;
    if (!canvas || !backgroundCanvas) return;
    
    // Create a temporary canvas to combine both layers
    const exportCanvas = document.createElement("canvas");
    exportCanvas.width = canvas.width;
    exportCanvas.height = canvas.height;
    const exportCtx = exportCanvas.getContext("2d");
    
    if (!exportCtx) return;
    
    // Draw background layer first
    exportCtx.drawImage(backgroundCanvas, 0, 0);
    // Draw contour on top
    exportCtx.drawImage(canvas, 0, 0);
    
    // Convert to blob and download
    exportCanvas.toBlob((blob) => {
      if (!blob) return;
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.download = "mi-obra-maestra.png";
      link.href = url;
      link.click();
      
      // Clean up the URL object
      URL.revokeObjectURL(url);
      
      toast.success("¡Tu obra maestra ha sido descargada! 🌟");
    }, "image/png");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Canvas Area */}
      <div className="lg:col-span-3">
        <Card className="paint-card p-6">
          <div className="relative touch-none flex justify-center">
            {/* Background canvas for painting */}
            <canvas
              ref={backgroundCanvasRef}
              className="absolute top-0 left-0 max-w-full max-h-[600px] border-4 border-brand-cyan rounded-xl shadow-lg aspect-square"
            />
            {/* Foreground canvas for contour */}
            <canvas
              ref={canvasRef}
              className="relative max-w-full max-h-[600px] border-4 border-brand-cyan rounded-xl shadow-lg cursor-crosshair aspect-square"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
              onTouchStart={startDrawing}
              onTouchMove={draw}
              onTouchEnd={stopDrawing}
              onTouchCancel={stopDrawing}
            />
            <img
              ref={imageRef}
              className="hidden"
              alt="Fondo"
            />
          </div>
        </Card>
      </div>

      {/* Controls Panel */}
      <div className="space-y-6">
        <Card className="paint-card p-6">
          <h3 className="font-fredoka font-semibold text-brand-dark text-xl mb-4 text-center">
            Herramientas de Pintura 🎨
          </h3>
          
          <div className="space-y-6">
            <ColorPicker
              currentColor={currentColor}
              onColorChange={setCurrentColor}
            />
            
            <BrushSizeSelector
              brushSize={brushSize}
              onBrushSizeChange={setBrushSize}
            />
          </div>
        </Card>

        <Card className="paint-card p-6">
          <h3 className="font-fredoka font-semibold text-brand-dark text-xl mb-4 text-center">
            Acciones ✨
          </h3>
          
          <div className="space-y-3">
            <Button
              onClick={clearCanvas}
              variant="outline"
              className="w-full border-2 border-brand-cyan bg-brand-white text-brand-dark hover:bg-brand-cyan"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Limpiar Lienzo
            </Button>
            
            <Button
              onClick={exportImage}
              className="w-full paint-button"
            >
              <Download className="w-4 h-4 mr-2" />
              Guardar Obra Maestra
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
