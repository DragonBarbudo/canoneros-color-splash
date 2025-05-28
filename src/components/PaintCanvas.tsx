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
  const [currentColor, setCurrentColor] = useState("#ff6b6b");
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
      // Set canvas size to match image
      canvas.width = 800;
      canvas.height = 600;
      backgroundCanvas.width = 800;
      backgroundCanvas.height = 600;
      
      // Clear both canvases
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      bgCtx.clearRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
      
      // Set background to white for painting
      bgCtx.fillStyle = "#ffffff";
      bgCtx.fillRect(0, 0, backgroundCanvas.width, backgroundCanvas.height);
      
      // Draw the contour image normally first
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      
      // Get image data to modify colors while preserving transparency
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      // Convert black/dark pixels to dark purple while preserving transparency
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const a = data[i + 3];
        
        // Only modify visible pixels (alpha > 0)
        if (a > 0) {
          // Convert to dark purple (#6d28d9)
          data[i] = 109;     // R
          data[i + 1] = 40;  // G
          data[i + 2] = 217; // B
          // Keep original alpha
        }
      }
      
      // Put the modified image data back
      ctx.putImageData(imageData, 0, 0);
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
    toast.success("Canvas cleared! Start painting again! 🎨");
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
      link.download = "my-masterpiece.png";
      link.href = url;
      link.click();
      
      // Clean up the URL object
      URL.revokeObjectURL(url);
      
      toast.success("Your masterpiece has been downloaded! 🌟");
    }, "image/png");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Canvas Area */}
      <div className="lg:col-span-3">
        <Card className="paint-card p-6">
          <div className="relative touch-none">
            {/* Background canvas for painting */}
            <canvas
              ref={backgroundCanvasRef}
              className="absolute top-0 left-0 max-w-full h-auto border-4 border-paint-purple-200 rounded-xl shadow-lg"
            />
            {/* Foreground canvas for contour */}
            <canvas
              ref={canvasRef}
              className="relative max-w-full h-auto border-4 border-paint-purple-200 rounded-xl shadow-lg cursor-crosshair"
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
              alt="Background"
            />
          </div>
        </Card>
      </div>

      {/* Controls Panel */}
      <div className="space-y-6">
        <Card className="paint-card p-6">
          <h3 className="font-fredoka font-semibold text-paint-purple-700 text-xl mb-4 text-center">
            Paint Tools 🎨
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
          <h3 className="font-fredoka font-semibold text-paint-purple-700 text-xl mb-4 text-center">
            Actions ✨
          </h3>
          
          <div className="space-y-3">
            <Button
              onClick={clearCanvas}
              variant="outline"
              className="w-full paint-button border-2 border-paint-cyan-300 bg-white/80 text-paint-cyan-700 hover:bg-paint-cyan-50"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Clear Canvas
            </Button>
            
            <Button
              onClick={exportImage}
              className="w-full paint-button"
            >
              <Download className="w-4 h-4 mr-2" />
              Save Masterpiece
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
