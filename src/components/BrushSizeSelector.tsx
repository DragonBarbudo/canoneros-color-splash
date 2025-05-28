
interface BrushSizeSelectorProps {
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
}

export const BrushSizeSelector = ({ brushSize, onBrushSizeChange }: BrushSizeSelectorProps) => {
  const sizes = [10, 20, 30];

  return (
    <div>
      <label className="block font-fredoka font-medium text-brand-white mb-3">
        Tamaño del Pincel
      </label>
      
      <div className="grid grid-cols-3 gap-2 mb-4">
        {sizes.map((size) => (
          <button
            key={size}
            className={`h-16 border-3 transition-all duration-200 hover:scale-105 flex items-center justify-center ${
              brushSize === size
                ? "border-brand-cyan bg-brand-purple scale-105"
                : "border-brand-cyan bg-brand-dark hover:border-brand-white"
            }`}
            onClick={() => onBrushSizeChange(size)}
          >
            <div
              className="bg-brand-white rounded-full"
              style={{
                width: `${Math.min(size, 24)}px`,
                height: `${Math.min(size, 24)}px`,
              }}
            />
          </button>
        ))}
      </div>
      
      <div className="mt-4">
        <label className="block font-fredoka font-medium text-brand-white mb-2">
          Tamaño Personalizado: {brushSize}px
        </label>
        <input
          type="range"
          min="1"
          max="50"
          value={brushSize}
          onChange={(e) => onBrushSizeChange(Number(e.target.value))}
          className="w-full h-2 bg-brand-cyan appearance-none cursor-pointer slider"
        />
      </div>
    </div>
  );
};
