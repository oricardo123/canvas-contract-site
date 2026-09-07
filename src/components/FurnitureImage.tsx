import { useState, type CSSProperties, type ImgHTMLAttributes } from "react";
import "./FurnitureImage.css";

interface FurnitureImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "width" | "height"> {
  src: string;
  width?: number;
  height?: number;
  preserveSourceSize?: boolean;
  sourceInset?: number;
  fit?: "contain" | "cover";
}

export function FurnitureImage({
  src,
  width = 400,
  height = 330,
  preserveSourceSize = false,
  sourceInset,
  fit = "contain",
  className,
  loading = "lazy",
  onLoad,
  style,
  ...props
}: FurnitureImageProps) {
  const [loadedSize, setLoadedSize] = useState<{ src: string; width: number; height: number }>();
  const size = loadedSize?.src === src ? loadedSize : { width, height };
  const alreadyFrameless = /\/(?:lounge-chairs|ecm-01-large)\.jpg(?:[?#]|$)/i.test(src);
  // Small original previews stay at their native size, so their one-pixel
  // outline needs no extra resampling allowance. The JPEGs remain untouched.
  const inset = sourceInset ?? (alreadyFrameless ? 0 : preserveSourceSize ? 1 : 2);

  return (
    <img
      {...props}
      className={["furniture-image", fit === "cover" ? "furniture-image--cover" : "", className].filter(Boolean).join(" ")}
      src={src}
      width={size.width}
      height={size.height}
      loading={loading}
      onLoad={(event) => {
        const { naturalWidth, naturalHeight } = event.currentTarget;
        if (naturalWidth && naturalHeight) {
          setLoadedSize({ src, width: naturalWidth, height: naturalHeight });
        }
        onLoad?.(event);
      }}
      style={{
        ...style,
        "--furniture-image-ratio": size.width / size.height,
        "--furniture-image-cover-x": size.width / Math.max(1, size.width - 2 * inset),
        "--furniture-image-cover-y": size.height / Math.max(1, size.height - 2 * inset),
        "--furniture-image-max-width": preserveSourceSize ? `${size.width}px` : "100cqw",
        "--furniture-image-max-height": preserveSourceSize ? `${size.height}px` : "100cqh",
        clipPath: inset ? `inset(${100 * inset / size.height}% ${100 * inset / size.width}%)` : undefined,
      } as CSSProperties}
    />
  );
}
