import type { UserWithPet } from "../../types/type";

interface CardHeaderProps {
  user: UserWithPet;
}

const CardHeader = ({ user }: CardHeaderProps) => {
  return (
    <div className="flex items-center gap-3 p-3">
      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-green-500 text-white font-bold border">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div>
        <h2 className="text-white">{user.name}</h2>
        <p className="text-sm text-gray-300">
          {user.email} • {user.country}
        </p>
        {user.dob && (
          <p className="text-sm text-gray-300">
            Age {user.dob.age} • {user.phone}
          </p>
        )}
      </div>
    </div>
  );
};

export default CardHeader;
