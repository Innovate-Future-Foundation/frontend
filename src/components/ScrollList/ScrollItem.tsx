import { useState } from "react";
import { Trash2 } from "lucide-react";

import { abbreviateName } from "@/utils/formatters";
import Avatar from "../Avatar";
import { Button } from "../ui/button";
import { RemoveInviteeModal } from "../RemoveModal";

interface ScrollItemProps {
  name: string;
  email: string;
  avatarLink: string;
}

const ScrollItem = ({ name, email, avatarLink }: ScrollItemProps) => {
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between py-3 px-4 hover:bg-secondary-light">
        <div className="flex items-center gap-3">
          <Avatar avatarLink={avatarLink} avatarAlt={"InnovateFuture"} avatarPlaceholder={abbreviateName(name)} />
          <div className="flex flex-col gap-[1px]">
            <p className="font-semibold text-sm leading-none capitalize">{name}</p>
            <p className="text-sm text-primary-foreground50 leading-none">{email}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600" onClick={() => setIsRemoveModalOpen(true)}>
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <RemoveInviteeModal
        isOpen={isRemoveModalOpen}
        onClose={() => setIsRemoveModalOpen(false)}
        onConfirm={() => {
          console.log("Removing member:", name);
          setIsRemoveModalOpen(false);
        }}
        member={{ name, email, avatarLink }}
      />
    </>
  );
};

export default ScrollItem;
