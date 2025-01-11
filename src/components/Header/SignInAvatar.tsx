import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { abbreviateName } from "@/utils/formatters";

type avatarType = {
  roleName: string;
  name: string;
  email: string;
  avatarLink: string;
};
const SignInAvatar: React.FC<avatarType> = ({ roleName, name, email, avatarLink }) => {
  const avatarPlaceHolder = abbreviateName(name);
  const nameString = `${roleName}: ${name}`;
  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col items-end gap-1">
        <p className="text-primary font-bold text-sm leading-3">{nameString}</p>
        <p className="text-muted-foreground text-sm leading-3">{email}</p>
      </div>
      <div className="w-10 h-10">
        <Avatar className="w-full h-full">
          <AvatarImage src={avatarLink} />
          <AvatarFallback>{avatarPlaceHolder}</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default SignInAvatar;
