import Avatar from "@/components/Avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ProfileInfo } from "@/types";
import { abbreviateName } from "@/utils/formatters";
import clsx from "clsx";
import { CheckCheck, Mail, Smartphone } from "lucide-react";
import React from "react";

interface ContactCard {
  profile: ProfileInfo;
}
const ContactCard: React.FC<ContactCard> = ({ profile }) => {
  return (
    <Card className="overflow-hidden max-w-72 ">
      <div className={clsx(`flex flex-col ${profile.isActive ? "bg-secondary text-primary-foreground30" : "bg-accent text-primary-foreground60"}`)}>
        <div className="flex items-center gap-2 p-3 pb-0 justify-between">
          <div className="flex items-center gap-2">
            <Avatar avatarLink={profile.avatarUrl ?? ""} avatarAlt="@InnovateFuture" avatarPlaceholder={abbreviateName(profile.name ?? "")} size={8} />
            <div className="capitalize text-sm truncate max-w-40 font-semibold">{profile.name}</div>
          </div>

          {!profile.isActive ? (
            <Badge variant={"outline"} className="text-primary-foreground60">
              suspended
            </Badge>
          ) : (
            ""
          )}
        </div>
        <Separator className="mt-2 bg-background h-1" />
        <div className="p-3 flex flex-col gap-4 bg-card">
          <div className={clsx(`flex gap-2 items-center ${!profile.isActive ? "text-primary-foreground60" : "text-primary-foreground30"}`)}>
            <Mail size={16} />
            <div className="text-sm lowercase truncate max-w-100 flex items-center gap-2">
              {profile.email}
              {profile.isConfirmed ? (
                <CheckCheck size={16} className={clsx(`${profile.isActive ? "text-secondary-foregroundGreen" : "text-primary-foreground60"}`)} />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className={clsx(`flex gap-2 items-center ${!profile.isActive ? "text-primary-foreground60" : "text-primary-foreground30"}`)}>
            <Smartphone size={16} />
            <div className="text-sm lowercase truncate max-w-40">{profile.phone}</div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ContactCard;
