import { abbreviateName } from "@/utils/formatters";
import { ChevronDown, LogOut, User } from "lucide-react";
import Avatar from "../Avatar";
import HoverCard from "../HoverCard";
import { Button } from "../ui/button";
import { useUserStore, useTourBuilderStore } from "@/store";
import { useLogout } from "@/hooks/auth/useLogout";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useAuth } from "@/hooks/useAuth";

interface AvatarType {
  name: string;
  avatarUrl: string;
}

const SignInAvatar: React.FC<AvatarType> = ({ name, avatarUrl }) => {
  const { resetUserStore } = useUserStore();
  const { resetTourStore } = useTourBuilderStore();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleSuccess = () => {
    logout();
    resetUserStore();
    resetTourStore();
    navigate("/");
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
      <HoverCard
        className="w-auto flex flex-col gap-2 p-2"
        content={
          <>
            <Button variant="ghost" className="text-sm font-medium rounded-sm" onClick={() => navigate("/dashboard/profile")}>
              <User />
              <span>My Profile</span>
            </Button>
            <Button variant="ghost" onClick={handleLogout} className="text-sm font-medium rounded-sm">
              <LogOut />
              <span>Log out</span>
            </Button>
          </>
        }
      >
        <button className="flex items-center gap-2">
          <Avatar avatarLink={avatarUrl} avatarAlt={"InnovateFuture"} size={8} avatarPlaceholder={abbreviateName(name)} />
          <div className="flex flex-col items-end gap-[2px] text-foreground">
            <p className="font-bold text-sm truncate max-w-40 leading-6">{name}</p>
          </div>
          <ChevronDown size={16} className="text-foreground" strokeWidth={3} />
        </button>
      </HoverCard>
    </div>
  );
};

export default SignInAvatar;
