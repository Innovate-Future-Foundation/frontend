import { abbreviateName, ellipticalString } from "@/utils/formatters";
import AppAvatar from "../AppAvatar";
import { ChevronDown } from "lucide-react";

type avatarType = {
  name: string;
  email: string;
  avatarLink: string;
};

const SignInAvatar: React.FC<avatarType> = ({ name, email, avatarLink }) => (
  <div className="flex gap-2 items-center">
    <div className="flex flex-col items-end gap-[2px]">
      <p className="text-secondary font-bold text-sm leading-3">{ellipticalString(name, 16)}</p>
      <p className="text-secondary text-[12px] leading-3">{ellipticalString(email, 24)}</p>
    </div>
    <AppAvatar avatarLink={avatarLink} avatarAlt={"InnovateFuture"} size={8} avaterPlaceholder={abbreviateName(name)} />
    <ChevronDown size={16} className="text-secondary" />
  </div>
);

export default SignInAvatar;
