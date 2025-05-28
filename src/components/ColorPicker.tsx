
interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker = ({ currentColor, onColorChange }: ColorPickerProps) => {
  const colors = [
    "#553178", // Brand purple
    "#FFFFFF", // Brand white
    "#101820", // Brand dark
    "#A4DAE7", // Brand cyan
    "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57",
    "#ff9ff3", "#54a0ff", "#5f27cd", "#00d2d3", "#ff9f43",
    "#ee5a24", "#009432", "#0652dd", "#9c88ff", "#ffc312",
    "#c44569", "#40739e", "#487eb0", "#8c7ae6", "#e1b12c"
  ];

  return (
    <div>
      <label className="block font-fredoka font-medium text-brand-dark mb-3">
        Elige Color 🌈
      </label>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-12 h-12 rounded-full border-4 transition-all duration-200 hover:scale-110 ${
              currentColor === color
                ? "border-brand-purple shadow-lg scale-110"
                : "border-brand-white shadow-md"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
          />
        ))}
      </div>
      
      <div className="mt-4">
        <label className="block font-fredoka font-medium text-brand-dark mb-2">
          Color Personalizado
        </label>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full h-12 border-4 border-brand-cyan rounded-xl cursor-pointer"
        />
      </div>
    </div>
  );
};
