import { abbreviateName } from "@/utils/formatters";
import AppAvatar from "../AppAvatar";

type avatarType = {
  roleName: string;
  name: string;
  email: string;
  avatarLink: string;
};
const SignInAvatar: React.FC<avatarType> = ({ roleName, name, email, avatarLink }) => {
  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col items-end gap-1">
        <p className="text-primary font-bold text-sm leading-3">{`${roleName}: ${name}`}</p>
        <p className="text-muted-foreground text-sm leading-3">{email}</p>
      </div>
      <AppAvatar avatarLink={avatarLink} avatarAlt={"InnovateFuture"} avaterPlaceholder={abbreviateName(name)} />
    </div>
  );
};

export default SignInAvatar;
