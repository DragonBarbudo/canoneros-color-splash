
import { brush } from "lucide-react";

export const Header = () => {
  return (
    <header className="paint-gradient shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center space-x-4">
          <div className="animate-bounce-gentle">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <brush className="w-6 h-6 text-paint-purple-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-fredoka font-bold text-white drop-shadow-lg">
            Cañoneros Paint
          </h1>
          <div className="animate-bounce-gentle" style={{ animationDelay: '0.5s' }}>
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg">
              <brush className="w-6 h-6 text-paint-cyan-600" />
            </div>
          </div>
        </div>
        <p className="text-center text-white/90 font-comic text-lg mt-2">
          Create beautiful masterpieces! 🌟
        </p>
      </div>
    </header>
  );
};
