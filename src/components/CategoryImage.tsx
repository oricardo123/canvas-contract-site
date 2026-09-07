import { FurnitureImage } from "./FurnitureImage";

interface CategoryImageProps {
  src: string;
  alt: string;
  loading?: "eager" | "lazy";
}

export function CategoryImage({ src, alt, loading = "lazy" }: CategoryImageProps) {
  return (
    <FurnitureImage
      className="category-image"
      src={src}
      alt={alt}
      loading={loading}
    />
  );
}
