
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
    <div className="min-h-screen" id="themain">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {!selectedImage ? (
          <div className="animate-fade-in">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-poppins font-bold text-brand-white mb-4">
                Personaliza tu pasión
              </h2>
              <p className="text-xl text-brand-cyan font-comic">
                ¡Selecciona una imagen y píntala a tu gusto!
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
                className="border-2 border-brand-cyan bg-brand-dark text-brand-cyan hover:bg-brand-cyan hover:text-brand-dark"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Regresar
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
