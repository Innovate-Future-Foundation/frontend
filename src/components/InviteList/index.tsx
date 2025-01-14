import { TitleWithIcon } from "../TitleWithIcon/GuestListTitle";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Users, Plus, Search, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

// temporary Avatar placeholder component
const TempAvatar = ({ className }: { className?: string }) => <div className={cn("w-8 h-8 rounded-full bg-gray-200", className)} />;

interface InviteeItemProps {
  name: string;
  email: string;
}

const InviteeItem = ({ name, email }: InviteeItemProps) => (
  <div className="flex items-center justify-between py-3 px-4 hover:bg-gray-50">
    <div className="flex items-center gap-3">
      <TempAvatar />
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

const data = [
  { name: "Ray Clarke", email: "ray.c@acme.com" },
  { name: "Emma Watson", email: "emma.w@acme.com" },
  { name: "John Smith", email: "john.s@acme.com" },
  { name: "Sarah Chen", email: "sarah.c@acme.com" },
  { name: "Michael Brown", email: "m.brown@acme.com" },
  { name: "Lisa Wang", email: "l.wang@acme.com" },
  { name: "David Miller", email: "david.m@acme.com" },
  { name: "Anna Rodriguez", email: "a.rodriguez@acme.com" },
  { name: "Tom Wilson", email: "t.wilson@acme.com" },
  { name: "Jessica Lee", email: "j.lee@acme.com" },
  { name: "Kevin Zhang", email: "k.zhang@acme.com" },
  { name: "Maria Garcia", email: "m.garcia@acme.com" },
  { name: "Alex Johnson", email: "alex.j@acme.com" },
  { name: "Raymond zhu", email: "raymond.zhu@acme.com" },
  { name: "Qian duoduo", email: "qian.duoduo@acme.com" }
];

export const InviteeList = () => {
  const [searchQuery, setSearchQuery] = useState("");

  // the search function
  const filteredData = data.filter(
    item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-lg border bg-white">
      <div className="p-4 border-b">
        <div className="flex items-center justify-between">
          <TitleWithIcon title="Members" icon={Users} />
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{filteredData.length} members</span>
            <div className="relative w-64">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input placeholder="Search" className="pl-8" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <Button className="active:scale-95 transition-transform duration-100" onClick={() => console.log("Add member clicked")}>
              <Plus className="h-4 w-4 mr-2" />
              Add member
            </Button>
          </div>
        </div>
      </div>
      <ScrollArea className="h-96 w-full rounded-md border">
        <div className="divide-y">
          {filteredData.map((item, index) => (
            <InviteeItem key={index} name={item.name} email={item.email} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
