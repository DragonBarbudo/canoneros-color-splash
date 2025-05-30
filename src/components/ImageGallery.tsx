
import { Card } from "@/components/ui/card";
import image1 from "@/assets/paint/08117404-475d-4733-9ba5-84f68d693769.png";
import image2 from "@/assets/paint/7c57ba4b-bf47-4eea-a340-28ed9ffbef90.png";
import image3 from "@/assets/paint/8eacdfbc-da62-434b-a4f9-a00e3705a52e.png";
import image4 from "@/assets/paint/be6cddec-b5e4-43cd-ac18-5f4d7af49755.png";

interface ImageGalleryProps {
  onImageSelect: (imageUrl: string) => void;
}

export const ImageGallery = ({ onImageSelect }: ImageGalleryProps) => {
  const images = [
    {
      id: 1,
      url: image1,
    },
    {
      id: 2,
      url: image2,
    },
    {
      id: 3,
      url: image3,
    },
    {
      id: 4,
      url: image4,
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
      {images.map((image) => (
        <Card
          key={image.id}
          className="bg-white/25 border-none shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:border-brand-purple"
          onClick={() => onImageSelect(image.url)}
        >
          <div className="p-4">
            <div className="aspect-square bg-white overflow-hidden">
              <img
                src={image.url}
                alt={`Imagen para colorear ${image.id}`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
