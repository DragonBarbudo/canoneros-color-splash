
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
    <div className="min-h-screen bg-brand-white">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!selectedImage ? (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-fredoka font-bold text-brand-purple mb-4">
                ¡Elige tu Aventura! 🎨
              </h2>
              <p className="text-xl text-brand-dark font-comic">
                Selecciona una imagen increíble para empezar a pintar
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
                className="border-2 border-brand-purple bg-brand-white text-brand-purple hover:bg-brand-cyan"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a la Galería
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
