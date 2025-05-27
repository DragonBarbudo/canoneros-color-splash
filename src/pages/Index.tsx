
import { useState } from "react";
import { ImageGallery } from "@/components/ImageGallery";
import { PaintCanvas } from "@/components/PaintCanvas";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleImageSelect = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const handleBackToGallery = () => {
    setSelectedImage(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-paint-purple-50 via-white to-paint-cyan-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!selectedImage ? (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-fredoka font-bold text-paint-purple-700 mb-4">
                Choose Your Adventure! 🎨
              </h2>
              <p className="text-xl text-paint-purple-600 font-comic">
                Pick an amazing picture to start painting
              </p>
            </div>
            <ImageGallery onImageSelect={handleImageSelect} />
          </div>
        ) : (
          <div className="animate-fade-in">
            <div className="mb-6">
              <Button
                onClick={handleBackToGallery}
                variant="outline"
                className="paint-button border-2 border-paint-purple-300 bg-white/80 text-paint-purple-700 hover:bg-paint-purple-50"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Gallery
              </Button>
            </div>
            <PaintCanvas imageUrl={selectedImage} />
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
