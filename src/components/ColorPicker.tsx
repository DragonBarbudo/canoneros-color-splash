
interface ColorPickerProps {
  currentColor: string;
  onColorChange: (color: string) => void;
}

export const ColorPicker = ({ currentColor, onColorChange }: ColorPickerProps) => {
  const colors = [
    "#ff6b6b", "#4ecdc4", "#45b7d1", "#96ceb4", "#feca57",
    "#ff9ff3", "#54a0ff", "#5f27cd", "#00d2d3", "#ff9f43",
    "#ee5a24", "#009432", "#0652dd", "#9c88ff", "#ffc312",
    "#c44569", "#40739e", "#487eb0", "#8c7ae6", "#e1b12c"
  ];

  return (
    <div>
      <label className="block font-fredoka font-medium text-paint-purple-700 mb-3">
        Choose Color 🌈
      </label>
      <div className="grid grid-cols-4 gap-2 mb-4">
        {colors.map((color) => (
          <button
            key={color}
            className={`w-12 h-12 rounded-full border-4 transition-all duration-200 hover:scale-110 ${
              currentColor === color
                ? "border-paint-purple-500 shadow-lg scale-110"
                : "border-white shadow-md"
            }`}
            style={{ backgroundColor: color }}
            onClick={() => onColorChange(color)}
          />
        ))}
      </div>
      
      <div className="mt-4">
        <label className="block font-fredoka font-medium text-paint-purple-700 mb-2">
          Custom Color
        </label>
        <input
          type="color"
          value={currentColor}
          onChange={(e) => onColorChange(e.target.value)}
          className="w-full h-12 border-4 border-paint-purple-200 rounded-xl cursor-pointer"
        />
      </div>
    </div>
  );
};
