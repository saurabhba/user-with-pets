interface CardProps {
  children: React.ReactNode;
}
const Card = ({ children }: CardProps) => {
  return (
    <div className="rounded-2xl bg-green-800  shadow-2xl flex flex-col overflow-hidden border border-gray-400">
      {children}
    </div>
  );
};

export default Card;
