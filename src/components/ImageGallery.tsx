
import { Card } from "@/components/ui/card";

interface ImageGalleryProps {
  onImageSelect: (imageUrl: string) => void;
}

export const ImageGallery = ({ onImageSelect }: ImageGalleryProps) => {
  const sampleImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1472396961693-142e6e269027?w=400&h=300&fit=crop",
      title: "Beautiful Deer",
      description: "Two cute deer in nature"
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=300&fit=crop",
      title: "Cute Cat",
      description: "Orange and white tabby cat"
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1?w=400&h=300&fit=crop",
      title: "Grey Kitten",
      description: "Adorable grey tabby kitten"
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1441057206919-63d19fac2369?w=400&h=300&fit=crop",
      title: "Penguins",
      description: "Two penguins on a rock"
    },
    {
      id: 5,
      url: "/lovable-uploads/3953c8d0-b798-4048-b29c-c44bed5b614d.png",
      title: "Pikachu",
      description: "Cute Pikachu to color"
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
              alt={image.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </div>
          <div className="p-4 text-center">
            <h3 className="font-fredoka font-semibold text-paint-purple-700 text-lg mb-1">
              {image.title}
            </h3>
            <p className="text-paint-purple-500 text-sm">
              {image.description}
            </p>
          </div>
        </Card>
      ))}
    </div>
  );
};
