
import { Card } from "@/components/ui/card";

interface ImageGalleryProps {
  onImageSelect: (imageUrl: string) => void;
}

export const ImageGallery = ({ onImageSelect }: ImageGalleryProps) => {
  const sampleImages = [
    {
      id: 1,
      url: "/lovable-uploads/08117404-475d-4733-9ba5-84f68d693769.png",
    },
    {
      id: 2,
      url: "/lovable-uploads/7c57ba4b-bf47-4eea-a340-28ed9ffbef90.png", 
    },
    {
      id: 3,
      url: "/lovable-uploads/be6cddec-b5e4-43cd-ac18-5f4d7af49755.png",
    },
    {
      id: 4,
      url: "/lovable-uploads/8eacdfbc-da62-434b-a4f9-a00e3705a52e.png",
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {sampleImages.map((image) => (
        <Card
          key={image.id}
          className="paint-card cursor-pointer transform hover:scale-105 transition-all duration-300 overflow-hidden"
          onClick={() => onImageSelect(image.url)}
        >
          <div className="aspect-square overflow-hidden">
            <img
              src={image.url}
              alt={`Imagen para colorear ${image.id}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
        </Card>
      ))}
    </div>
  );
};
