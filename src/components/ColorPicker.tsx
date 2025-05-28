
interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker = ({ currentColor, onColorChange }: ColorPickerProps) => {
  const colors = [
    "#d33092", 
    "#502764", 
    "#06b6d4", 
    "#5cd868", 
    "#1819b0", 
    "#fd171d", 
    "#101820", 
    "#FFFFFF", 
  ];

  return (
    <div>
      <label className="block font-poppins font-medium text-brand-white mb-3">
        Elige Color
      </label>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-12 h-12 border-4 transition-all duration-200 hover:scale-110 rounded-lg ${
              currentColor === color
                ? "border-white/25 shadow-lg scale-110"
                : "border-brand-white shadow-md"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
          />
        ))}
      </div>
      
      <div className="mt-4">
        <label className="block font-poppins font-medium text-brand-white mb-2">
          Color Personalizado
        </label>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full h-12 border-4 border-white/25 cursor-pointer  rounded-lg"
        />
      </div>
    </div>
  );
};
