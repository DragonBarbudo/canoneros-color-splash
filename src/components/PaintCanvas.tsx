
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
  const imageRef = useRef<HTMLImageElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#ff6b6b");
  const [brushSize, setBrushSize] = useState(20);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    
    if (!canvas || !image) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    image.onload = () => {
      // Set canvas size to match image
      canvas.width = 800;
      canvas.height = 600;
      
      // Clear canvas and draw image
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };

    image.src = imageUrl;
  }, [imageUrl]);

  const getMousePos = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const pos = getMousePos(e);
    setIsDrawing(true);
    setLastX(pos.x);
    setLastY(pos.y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    const pos = getMousePos(e);
    
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

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const image = imageRef.current;
    const ctx = canvas?.getContext("2d");
    
    if (!ctx || !canvas || !image) return;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    toast.success("Canvas cleared! Start painting again! 🎨");
  };

  const exportImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const base64Data = canvas.toDataURL("image/png");
    
    // Create download link
    const link = document.createElement("a");
    link.download = "my-masterpiece.png";
    link.href = base64Data;
    link.click();
    
    console.log("Base64 exported:", base64Data);
    toast.success("Your masterpiece has been saved! 🌟");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Canvas Area */}
      <div className="lg:col-span-3">
        <Card className="paint-card p-6">
          <div className="relative">
            <canvas
              ref={canvasRef}
              className="max-w-full h-auto border-4 border-paint-purple-200 rounded-xl shadow-lg cursor-crosshair"
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseLeave={stopDrawing}
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
