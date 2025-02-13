import Avatar from "@/components/Avatar";

interface props {
  avatarLink: string;
  avatarAlt: string;
  avatarPlaceholder: string;
  name: string;
  email: string;
}

const ParentsDetail: React.FC<props> = ({ avatarLink, avatarAlt, avatarPlaceholder, name, email }) => {
  return (
    <div className="flex flex-row gap-2 h-full items-center">
      <Avatar size={10} avatarLink={avatarLink} avatarAlt={avatarAlt} avatarPlaceholder={avatarPlaceholder} />
      <div className="flex flex-col gap-[1px]">
        <h3 className="font-semibold text-sm">{name}</h3>
        <h4 className="text-xs text-gray-600">{email}</h4>
      </div>
    </div>
  );
};

export default ParentsDetail;
