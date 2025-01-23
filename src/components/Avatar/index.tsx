import { Avatar as CNAvatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface AvatarProps {
  avatarLink: string;
  avatarAlt: string;
  avatarPlaceholder: string;
  size?: number;
  outline?: boolean;
  className?: string;
  imageProps?: React.ComponentProps<typeof AvatarImage>;
  fallbackProps?: React.ComponentProps<typeof AvatarFallback>;
}
const Avatar: React.FC<AvatarProps> = ({
  avatarLink,
  avatarAlt,
  avatarPlaceholder,
  size = 10,
  outline = false,
  className,
  imageProps = {},
  fallbackProps = {},
  ...props
}) => {
  const avatarStyle = `w-${size} h-${size} ${outline && "outline outline-white"}`;
  return (
    <CNAvatar className={cn(avatarStyle, className)} {...props}>
      <AvatarImage src={avatarLink} alt={avatarAlt} {...imageProps} />
      <AvatarFallback {...fallbackProps}>{avatarPlaceholder}</AvatarFallback>
    </CNAvatar>
  );
};

export default Avatar;
