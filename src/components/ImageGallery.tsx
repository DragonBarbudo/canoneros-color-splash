
import { Card } from "@/components/ui/card";

interface ImageGalleryProps {
  onImageSelect: (imageUrl: string) => void;
}

export const ImageGallery = ({ onImageSelect }: ImageGalleryProps) => {
  const images = [
    {
      id: 1,
      url: "/lovable-uploads/08117404-475d-4733-9ba5-84f68d693769.png",
      title: "Aventura 1"
    },
    {
      id: 2,
      url: "/lovable-uploads/3953c8d0-b798-4048-b29c-c44bed5b614d.png",
      title: "Aventura 2"
    },
    {
      id: 3,
      url: "/lovable-uploads/7c57ba4b-bf47-4eea-a340-28ed9ffbef90.png",
      title: "Aventura 3"
    },
    {
      id: 4,
      url: "/lovable-uploads/8eacdfbc-da62-434b-a4f9-a00e3705a52e.png",
      title: "Aventura 4"
    },
    {
      id: 5,
      url: "/lovable-uploads/be6cddec-b5e4-43cd-ac18-5f4d7af49755.png",
      title: "Aventura 5"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
      {images.map((image) => (
        <Card
          key={image.id}
          className="bg-brand-dark border-4 border-brand-cyan shadow-lg cursor-pointer transform transition-all duration-300 hover:scale-105 hover:border-brand-purple"
          onClick={() => onImageSelect(image.url)}
        >
          <div className="p-4">
            <div className="aspect-square bg-brand-purple border-2 border-brand-cyan mb-4 overflow-hidden">
              <img
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-fredoka font-bold text-xl text-brand-white text-center">
              {image.title}
            </h3>
          </div>
        </Card>
      ))}
    </div>
  );
};
