import { useState, type CSSProperties, type ImgHTMLAttributes } from "react";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & {
  /** Base name under /public/images without extension, e.g. "svc1" → svc1.webp + svc1@2x.webp */
  name: string;
  width: number;
  height: number;
  /** Above-the-fold images (hero poster) load eagerly and skip the skeleton fade. */
  priority?: boolean;
  frameClassName?: string;
  frameStyle?: CSSProperties;
};

/**
 * Responsive WebP image with the neutral/100 skeleton + 1 px outline and a 300 ms fade-in
 * (handoff › board 20 "Loading"). Width/height are always set to protect CLS.
 */
export function SmartImage({ name, width, height, priority, alt = "", className = "", frameClassName = "", frameStyle, ...rest }: Props) {
  const [loaded, setLoaded] = useState(false);
  const src = `/images/${name}.webp`;
  return (
    <div className={`img-frame overflow-hidden ${frameClassName}`} style={frameStyle}>
      <img
        src={src}
        srcSet={`${src} 1x, /images/${name}@2x.webp 2x`}
        width={width}
        height={height}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding={priority ? "sync" : "async"}
        fetchPriority={priority ? "high" : undefined}
        onLoad={() => setLoaded(true)}
        data-loaded={loaded || priority ? "true" : "false"}
        className={`${priority ? "eager " : ""}h-full w-full object-cover ${className}`}
        {...rest}
      />
    </div>
  );
}
