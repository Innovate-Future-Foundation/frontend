import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Avatar from "../Avatar";
import { abbreviateName } from "@/utils/formatters";

interface RemoveInviteeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  member: {
    name: string;
    email: string;
    avatarLink?: string;
  };
}

export const RemoveInviteeModal = ({ isOpen, onClose, onConfirm, member }: RemoveInviteeModalProps) => {
  const handleRemove = () => {
    // TODO: Integrate with backend API to remove member
    console.log("Remove member:", member);
    onConfirm();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[280px] rounded-xl p-8">
        <div className="text-left space-y-6">
          <DialogHeader className="space-y-2">
            <DialogTitle className="text-xl font-semibold text-left">Remove account</DialogTitle>
            <DialogDescription className="text-gray-500 text-sm text-left">
              The account and its associated API access tokens will be permanently removed.
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center gap-3">
            <Avatar avatarLink={member.avatarLink || ""} avatarAlt={"InnovateFuture"} avatarPlaceholder={abbreviateName(member.name)} />
            <div>
              <p className="font-medium text-base">{member.name}</p>
              <p className="text-sm text-gray-500">{member.email}</p>
            </div>
          </div>

          <div className="flex justify-between">
            <Button variant="outline" onClick={onClose} className="px-6">
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemove} className="px-6">
              Remove
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
