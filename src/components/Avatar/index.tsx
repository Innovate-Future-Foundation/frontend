import { Avatar as CNAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface AvatarProps {
  avatarLink: string;
  avatarAlt: string;
  avatarPlaceholder: string;
  size?: number;
  outline?: boolean;
  className?: string;
}
const Avatar: React.FC<AvatarProps> = ({ avatarLink, avatarAlt, avatarPlaceholder, size = 10, outline = false, className = "" }) => {
  const avatarStyle = `w-${size} h-${size} ${outline && "outline outline-white"}`;
  return (
    <CNAvatar className={`${avatarStyle} ${className}`.trim()}>
      <AvatarImage src={avatarLink} alt={avatarAlt} />
      <AvatarFallback>{avatarPlaceholder}</AvatarFallback>
    </CNAvatar>
  );
};

export default Avatar;
