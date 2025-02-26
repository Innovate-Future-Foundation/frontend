import { abbreviateName } from "@/utils/formatters";
import { ChevronDown, LogOut, User } from "lucide-react";
import ProfileDialog from "@/components/Header/ProfileDialog";
import Avatar from "../Avatar";
import HoverCard from "../HoverCard";
import { Button } from "../ui/button";
import { ProfileInfo } from "@/types";
import { useAuthStore, useTourBuilderStore } from "@/store";
import { useLogout } from "@/hooks/auth/useLogout";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

interface AvatarType {
  name: string;
  email: string;
  avatarUrl: string;
  profile: ProfileInfo;
}

const SignInAvatar: React.FC<AvatarType> = ({ name, email, avatarUrl, profile }) => {
  const { resetAuthStore } = useAuthStore();
  const { resetTourStore } = useTourBuilderStore();
  const navigate = useNavigate();

  const handleSuccess = () => {
    navigate("/");
    resetAuthStore();
    resetTourStore();
  };

  const mutation = useLogout({ handleSuccess });

  const handleLogout = () => {
    mutation.mutate();
  };

  if (mutation.isPending) {
    return <ClipLoader />;
  }
  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col items-end gap-[2px]">
        <p className="text-secondary font-bold text-sm leading-3 truncate max-w-20">{name}</p>
        <p className="text-secondary text-[12px] leading-3 truncate max-w-40">{email}</p>
      </div>
      <HoverCard
        className="w-auto flex flex-col gap-2 p-2"
        content={
          <>
            <ProfileDialog profile={profile}>
              <Button variant="ghost">
                <User />
                <span>My Profile</span>
              </Button>
            </ProfileDialog>
            <Button variant="ghost" onClick={handleLogout}>
              <LogOut />
              <span>Log out</span>
            </Button>
          </>
        }
      >
        <button className="flex items-center gap-2">
          <Avatar avatarLink={avatarUrl} avatarAlt={"InnovateFuture"} size={8} avatarPlaceholder={abbreviateName(name)} />
          <ChevronDown size={16} className="text-secondary" />
        </button>
      </HoverCard>
    </div>
  );
};

export default SignInAvatar;
