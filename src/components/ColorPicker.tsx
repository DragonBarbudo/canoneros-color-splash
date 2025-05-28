
interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker = ({ currentColor, onColorChange }: ColorPickerProps) => {
  const colors = [
    "#F70000", // Red
    "#0068BF", // Blue  
    "#FFF100", // Yellow
    "#7FFF00", // Green
    "#FF8C00", // Orange
    "#8B00FF", // Purple
    "#000000", // Black
    "#FFFFFF", // White
  ];

  return (
    <div>
      <label className="block font-fredoka font-medium text-brand-white mb-3">
        Elige Color
      </label>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-12 h-12 border-4 transition-all duration-200 hover:scale-110 ${
              currentColor === color
                ? "border-brand-cyan shadow-lg scale-110"
                : "border-brand-white shadow-md"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
          />
        ))}
      </div>
      
      <div className="mt-4">
        <label className="block font-fredoka font-medium text-brand-white mb-2">
          Color Personalizado
        </label>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full h-12 border-4 border-brand-cyan cursor-pointer"
        />
      </div>
    </div>
  );
};
