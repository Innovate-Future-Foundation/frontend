import { abbreviateName, ellipticalString } from "@/utils/formatters";
import { ChevronDown, LogOut, User } from "lucide-react";
import ProfileDialog from "@/components/Header/ProfileDialog";
import Avatar from "../Avatar";
import HoverCard from "../HoverCard";
import { Button } from "../ui/button";

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
    <HoverCard
      className="w-auto flex flex-col gap-2 p-2"
      content={
        <>
          <ProfileDialog>
            <Button variant="ghost">
              <User />
              <span>My Profile</span>
            </Button>
          </ProfileDialog>
          <Button variant="ghost">
            <LogOut />
            <span>Log out</span>
          </Button>
        </>
      }
    >
      <button className="flex items-center gap-2">
        <Avatar avatarLink={avatarLink} avatarAlt={"InnovateFuture"} size={8} avatarPlaceholder={abbreviateName(name)} />
        <ChevronDown size={16} className="text-secondary" />
      </button>
    </HoverCard>
  </div>
);

export default SignInAvatar;
