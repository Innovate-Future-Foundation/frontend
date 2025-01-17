import { Trash2 } from "lucide-react";

import { abbreviateName } from "@/utils/formatters";
import Avatar from "../Avatar";
import { Button } from "../ui/button";

interface ScrollItemProps {
  name: string;
  email: string;
  avatarLink: string;
}

const ScrollItem = ({ name, email, avatarLink }: ScrollItemProps) => (
  <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50">
    <div className="flex items-center gap-3">
      <Avatar avatarLink={avatarLink} avatarAlt={"InnovateFuture"} avatarPlaceholder={abbreviateName(name)} />
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{email}</p>
      </div>
    </div>
    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-600">
      <Trash2 className="h-4 w-4" />
    </Button>
  </div>
);

export default ScrollItem;
