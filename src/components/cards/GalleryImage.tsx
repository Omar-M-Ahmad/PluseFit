interface GalleryImageProps {
  image: string
  label: string
  className?: string
}

export function GalleryImage({ image, label, className }: GalleryImageProps) {
  return (
    <div className={`group relative overflow-hidden rounded-pf-md cursor-pointer ${className}`}>
      <img
        src={image}
        alt={label}
        className="w-full h-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
      <div className="absolute bottom-0 left-0 p-5">
        <span className="text-sm font-medium text-white">{label}</span>
      </div>
    </div>
  )
}
