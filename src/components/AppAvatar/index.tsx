import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type avatarType = {
  avatarLink: string;
  avatarAlt: string;
  avaterPlaceholder: string;
  size?: number;
  outline?: boolean;
  className?: string;
};
const AppAvatar: React.FC<avatarType> = ({ avatarLink, avatarAlt, avaterPlaceholder, size = 10, outline = false, className = "" }) => {
  const avatarStyle = `w-${size} h-${size} ${outline && "outline outline-white"}`;
  return (
    <Avatar className={`${avatarStyle} ${className}`.trim()}>
      <AvatarImage src={avatarLink} alt={avatarAlt} />
      <AvatarFallback>{avaterPlaceholder}</AvatarFallback>
    </Avatar>
  );
};

export default AppAvatar;
