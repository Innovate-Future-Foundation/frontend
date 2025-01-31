import { useState } from "react";
import { Plus, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScrollItem from "./ScrollItem";

const data = [
  { name: "Ray Clarke", email: "ray.c@acme.com", avatarLink: "https://github.com/rayclarke.png" },
  { name: "Emma Watson", email: "emma.w@acme.com", avatarLink: "https://github.com/emmawatson.png" },
  { name: "John Smith", email: "john.s@acme.com", avatarLink: "https://github.com/johnsmith.png" },
  { name: "Sarah Chen", email: "sarah.c@acme.com", avatarLink: "https://github.com/sarahchen.png" },
  { name: "Michael Brown", email: "m.brown@acme.com", avatarLink: "https://github.com/michaelbrown.png" },
  { name: "Lisa Wang", email: "l.wang@acme.com", avatarLink: "https://github.com/lisawang.png" },
  { name: "David Miller", email: "david.m@acme.com", avatarLink: "https://github.com/davidmiller.png" },
  { name: "Anna Rodriguez", email: "a.rodriguez@acme.com", avatarLink: "https://github.com/annarodriguez.png" },
  { name: "Tom Wilson", email: "t.wilson@acme.com", avatarLink: "https://github.com/tomwilson.png" },
  { name: "Jessica Lee", email: "j.lee@acme.com", avatarLink: "https://github.com/jessicalee.png" },
  { name: "Kevin Zhang", email: "k.zhang@acme.com", avatarLink: "https://github.com/kevinzhang.png" },
  { name: "Maria Garcia", email: "m.garcia@acme.com", avatarLink: "https://github.com/mariagarcia.png" },
  { name: "Alex Johnson", email: "alex.j@acme.com", avatarLink: "https://github.com/alexjohnson.png" },
  { name: "Raymond zhu", email: "raymond.zhu@acme.com", avatarLink: "https://github.com/raymondzhu.png" },
  { name: "Qian duoduo", email: "qian.duoduo@acme.com", avatarLink: "https://github.com/qian.duoduo.png" }
];

interface ScrollListProps {
  title: string;
}

export const ScrollList: React.FC<ScrollListProps> = ({ title }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // the search function
  const filteredData = data.filter(
    item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="rounded-lg border bg-background">
      <div className="p-4 pl-6 border-b flex justify-between items-center">
        <h2 className="font-semibold capitalize text-lg text-primary-foreground30">{`${title} list`}</h2>
        <div className="flex items-center justify-end">
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{filteredData.length > 1 ? `${filteredData.length} ${title}s` : `${filteredData.length} ${title}`}</span>
            <div className="sm:flex gap-2">
              <div className="relative w-64 mb-2 sm:mb-0">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                <Input placeholder="Search by name or email" className="pl-8" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <Button className="active:scale-95 transition-transform duration-100 capitalize" onClick={() => console.log("Add member clicked")}>
                <Plus className="h-4 w-4 mr-2" />
                {`add ${title}`}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <ScrollArea className="h-96 w-full rounded-md">
        <div className="divide-y">
          {filteredData.map((item, index) => (
            <ScrollItem key={index} name={item.name} email={item.email} avatarLink={item.avatarLink} />
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};
