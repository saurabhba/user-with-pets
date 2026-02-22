interface CardMediaProps {
  imgSrc: string;
  altText: string;
}

const CardMedia = ({ imgSrc, altText }: CardMediaProps) => {
  return (
    <div className="relative h-48 w-full">
      <img
        src={imgSrc}
        alt={altText}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  );
};

export default CardMedia;
