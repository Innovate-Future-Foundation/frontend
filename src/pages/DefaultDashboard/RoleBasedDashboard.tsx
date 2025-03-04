import React from "react";
import { Users, Briefcase, Map, AlertTriangle, Calendar, MapPin, ClipboardList, Clock, CheckCircle, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

const PlatformAdminDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard icon={<Users size={20} />} bgColor="bg-secondary" textColor="text-secondary-foreground" title="Total Users" value="12,394" />
        <DashboardCard icon={<Briefcase size={20} />} bgColor="bg-secondary-green" textColor="text-secondary-foregroundGreen" title="Total Orgs" value="128" />
        <DashboardCard icon={<Map size={20} />} bgColor="bg-secondary-yellow" textColor="text-secondary-foregroundYellow" title="Total Tours" value="324" />
        <DashboardCard
          icon={<AlertTriangle size={20} />}
          bgColor="bg-secondary-red"
          textColor="text-secondary-foregroundRed"
          title="Ongoing Tours"
          value="18"
        />
      </div>
      <DashboardSection title="New Organisations Over Time" placeholder="Chart Placeholder" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashboardList title="Recent Platform Events" items={["ABC School joined (Jan 26)", "Tour #52 created by XYZ Org", "GHI Org suspended"]} />
        <DashboardList title="Pending Actions" items={["DEF Org requires approval", "12 user confirmations pending", "2 subscription renewals pending"]} />
      </div>
    </div>
  );
};
const OrgAdminManagerDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <DashboardCard icon={<Users size={20} />} bgColor="bg-secondary" textColor="text-secondary-foreground" title="Total Users" value="55" />
        <DashboardCard icon={<Map size={20} />} bgColor="bg-secondary-green" textColor="text-secondary-foregroundGreen" title="Total Tours" value="10" />
        <DashboardCard icon={<Clock size={20} />} bgColor="bg-secondary-yellow" textColor="text-secondary-foregroundYellow" title="Ongoing Tours" value="2" />
        <DashboardCard icon={<CreditCard size={20} />} bgColor="bg-secondary-red" textColor="text-secondary-foregroundRed" title="Subscription" value="Free" />
      </div>
      <DashboardList
        underline={true}
        title="Upcoming Tours"
        items={["Sydney 7-day AI Explore - March 20, 2025", "Adelaide 10-day Wine Farm - March 16, 2025", "Gold Coast 3-day Relaxing - April 20, 2025"]}
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="p-6 bg-background rounded-lg shadow-soft transition-shadow">
          <h2 className="text-lg font-semibold mb-4 text-primary-foreground30">Pending Tour Approvals</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-primary-foreground30/80 border-b">
                <th className="py-2">Title</th>
                <th className="py-2">Duration</th>
                <th className="py-2">Requested</th>
                <th className="py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b ">
                <td className="py-2">City of Melbourne 3-day Explore</td>
                <td className="py-2">03/25-03/27</td>
                <td className="py-2">Jonh Yang</td>
                <td className="py-2">
                  <Button variant={"link"} className="p-0 underline text-xs">
                    More Details
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <DashboardList
          title="Recent Activities"
          items={["Tour #10 created on Jan 28 by Admin Kate", "Invited 5 teachers on Jan 29", "2 new managers joined on Feb 01"]}
        />
      </div>
    </div>
  );
};

const OrgTeacherDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard icon={<Calendar size={20} />} bgColor="bg-secondary" textColor="text-secondary-foreground" title="My Upcoming Tours" value="3" />
        <DashboardCard icon={<MapPin size={20} />} bgColor="bg-secondary-green" textColor="text-secondary-foregroundGreen" title="My Ongoing Tours" value="1" />
        <DashboardCard icon={<Users size={20} />} bgColor="bg-secondary-lavender" textColor="text-secondary-foregroundLavender" title="My Clients" value="25" />
      </div>
      <DashboardSection title="My Tour Calendar" placeholder="Calendar Placeholder" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DashboardList title="My Clients" items={["Jane Parent (2 kids enrolled)", "Mark Student (Solo enrollment)", "Lisa Parent (1 kid, special needs)"]} />
        <DashboardList
          title="Recent Activities"
          items={["Mark Student joined Tour #8 (Jan 29)", "Lisa Student dropped Tour #7 (Jan 30)", "Parent John invited to orientation (Feb 01)"]}
        />
      </div>
    </div>
  );
};

const ParentDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard icon={<Users size={20} />} bgColor="bg-secondary" textColor="text-secondary-foreground" title="Enrolled Children" value="2" />
        <DashboardCard icon={<Calendar size={20} />} bgColor="bg-secondary-green" textColor="text-secondary-foregroundGreen" title="Upcoming Tours" value="3" />
        <DashboardCard
          icon={<ClipboardList size={20} />}
          bgColor="bg-secondary-lavender"
          textColor="text-secondary-foregroundLavender"
          title="Active Tours"
          value="1"
        />
      </div>
      <DashboardList title="Children’s Progress" items={["Alice (Grade 5) - 2 tours active, 1 completed", "Bob (Grade 7) - 1 tour active, 2 upcoming"]} />
      <DashboardSection title="Tour Enrollment Status" placeholder="Table Placeholder" />
      <DashboardList
        title="Notifications / Messages"
        items={["Teacher John: 'Please submit emergency contact form.'", "Tour #14 schedule updated - new start date: Mar 05"]}
      />
    </div>
  );
};

const StudentDashboard: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 py-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard icon={<Clock size={20} />} bgColor="bg-secondary" textColor="text-secondary-foreground" title="My Ongoing Tours" value="2" />
        <DashboardCard
          icon={<Calendar size={20} />}
          bgColor="bg-secondary-green"
          textColor="text-secondary-foregroundGreen"
          title="My Upcoming Tours"
          value="4"
        />
        <DashboardCard
          icon={<CheckCircle size={20} />}
          bgColor="bg-secondary-lavender"
          textColor="text-secondary-foregroundLavender"
          title="Completed Tours"
          value="5"
        />
      </div>
      <DashboardSection title="My Tour Schedule" placeholder="Schedule Placeholder" />
      <DashboardList title="Announcements / Tasks" items={["Complete your emergency contact form", "Check updated schedule for Tour #9"]} />
      <DashboardList title="Quick Access" items={["Tour #7 Details", "Tour #9 Details"]} />
    </div>
  );
};

const DashboardCard: React.FC<{ icon: JSX.Element; bgColor: string; textColor: string; title: string; value: string | number }> = ({
  icon,
  bgColor,
  textColor,
  title,
  value
}) => (
  <div className="p-4 rounded-lg bg-background border transition-shadow">
    <div className="flex items-center gap-3">
      <div className={`p-3 rounded-xl ${bgColor} ${textColor} shadow-inner-soft`}>{icon}</div>
      <div>
        <p className="text-sm text-primary-foreground30/80">{title}</p>
        <p className="text-xl font-semibold text-primary-foreground30">{value}</p>
      </div>
    </div>
  </div>
);

const DashboardSection: React.FC<{ title: string; placeholder: string }> = ({ title, placeholder }) => (
  <div className="p-6 bg-background rounded-lg mb-6 transition-shadow shadow-soft">
    <h2 className="text-lg font-semibold mb-4 text-primary-foreground30">{title}</h2>
    <div className="h-64 flex items-center justify-center text-primary-foreground30 bg-background rounded-xl">{placeholder}</div>
  </div>
);

const DashboardList: React.FC<{ title: string; items: string[]; underline?: boolean }> = ({ title, items, underline }) => (
  <div className="p-6 bg-background rounded-lg shadow-soft transition-shadow">
    <h2 className="text-lg font-semibold mb-4 text-primary-foreground30">{title}</h2>
    <ul className={clsx(`space-y-2 text-sm ${underline && "underline text-primary"}`)}>
      {items.map((item, index) => (
        <li key={index}>• {item}</li>
      ))}
    </ul>
  </div>
);

export { PlatformAdminDashboard, OrgAdminManagerDashboard, OrgTeacherDashboard, ParentDashboard, StudentDashboard };
