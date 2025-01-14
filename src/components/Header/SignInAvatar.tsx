import { ChevronDown } from "lucide-react";

import { abbreviateName, ellipticalString } from "@/utils/formatters";
import Avatar from "../Avatar";

interface SignInAvatarProps {
  name: string;
  email: string;
  avatarLink: string;
}

const SignInAvatar: React.FC<SignInAvatarProps> = ({ name, email, avatarLink }) => (
  <div className="flex gap-2 items-center">
    <div className="flex flex-col items-end gap-[2px]">
      <p className="text-secondary font-bold text-sm leading-3">{ellipticalString(name, 16)}</p>
      <p className="text-secondary text-[12px] leading-3">{ellipticalString(email, 24)}</p>
    </div>
    <Avatar avatarLink={avatarLink} avatarAlt={"InnovateFuture"} size={8} avatarPlaceholder={abbreviateName(name)} />
    <ChevronDown size={16} className="text-secondary" />
  </div>
);

export default SignInAvatar;
