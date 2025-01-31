import { ColumnDef } from "@tanstack/react-table";

import DataTable, { LocationListType } from "@/components/DataTable";
import { Profile } from "@/types";
import { ProfileWithChildren } from "@/types";
import ContentLayout, { ContentLayoutProps } from "@/layouts/ContentLayout";

// const profileData: ProfileWithChildren[] = [
//   {
//     profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
//     org: {
//       orgId: "7c9e6679-7425-40de-944b-e07fc1f90aea",
//       orgName: "Umbrella Corporation",
//       logoUrl: "https://github.com/shadcn.png",
//       websiteUrl: "https://www.umbrella.com",
//       address: null,
//       email: "info@umbrella.com",
//       subscription: "premium",
//       status: "verified",
//       createdAt: "2023-12-07T08:45:00Z",
//       updatedAt: "2023-12-06T22:23:00Z"
//     },
//     role: "parent",
//     invitedBy: {
//       name: "Alice Johnson",
//       email: "alice.johnson@example.com",
//       phone: null,
//       avatarLink: null,
//       status: "active"
//     },
//     // children: [
//     //   {
//     //     profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
//     //     org: {
//     //       orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae9",
//     //       orgName: "Initech",
//     //       logoUrl: "https://github.com/shadcn.png",
//     //       websiteUrl: "https://www.initech.com",
//     //       address: null,
//     //       email: "support@initech.com",
//     //       subscription: "Free",
//     //       status: "suspended",
//     //       createdAt: "2023-12-08T10:15:30Z",
//     //       updatedAt: "2023-12-06T22:22:00Z"
//     //     },
//     //     role: "student",
//     //     invitedBy: {
//     //       name: "Alice Johnson",
//     //       email: "alice.johnson@example.com",
//     //       phone: null,
//     //       avatarLink: null,
//     //       status: "active"
//     //     },
//     //     name: "Eve Adams",
//     //     email: "EveAdams@gmail.com",
//     //     phone: null,
//     //     avatarLink: null,
//     //     status: "suspended",
//     //     createdAt: "2025-01-02T09:30:00Z",
//     //     updatedAt: "2025-01-14T11:45:00Z"
//     //   }
//     // ],
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     phone: "123-456-7890",
//     avatarLink: "https://github.com/shadcn.png",
//     status: "active",
//     createdAt: "2025-01-10T10:00:00Z",
//     updatedAt: "2025-01-15T14:30:00Z"
//   },
//   {
//     profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
//     org: {
//       orgId: "7c9e6679-7425-40de-944b-e07fc1f90aea",
//       orgName: "Umbrella Corporation",
//       logoUrl: "https://github.com/shadcn.png",
//       websiteUrl: "https://www.umbrella.com",
//       address: null,
//       email: "info@umbrella.com",
//       subscription: "premium",
//       status: "verified",
//       createdAt: "2023-12-07T08:45:00Z",
//       updatedAt: "2023-12-06T22:23:00Z"
//     },
//     role: "parent",
//     invitedBy: {
//       name: "Alice Johnson",
//       email: "alice.johnson@example.com",
//       phone: null,
//       avatarLink: null,
//       status: "active"
//     },
//     // children: [
//     //   {
//     //     profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
//     //     org: {
//     //       orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae9",
//     //       orgName: "Initech",
//     //       logoUrl: "https://github.com/shadcn.png",
//     //       websiteUrl: "https://www.initech.com",
//     //       address: null,
//     //       email: "support@initech.com",
//     //       subscription: "Free",
//     //       status: "suspended",
//     //       createdAt: "2023-12-08T10:15:30Z",
//     //       updatedAt: "2023-12-06T22:22:00Z"
//     //     },
//     //     role: "student",
//     //     invitedBy: {
//     //       name: "Alice Johnson",
//     //       email: "alice.johnson@example.com",
//     //       phone: null,
//     //       avatarLink: null,
//     //       status: "active"
//     //     },
//     //     name: "Eve Adams",
//     //     email: "EveAdams@gmail.com",
//     //     phone: null,
//     //     avatarLink: null,
//     //     status: "suspended",
//     //     createdAt: "2025-01-02T09:30:00Z",
//     //     updatedAt: "2025-01-14T11:45:00Z"
//     //   }
//     // ],
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     phone: "123-456-7890",
//     avatarLink: "https://github.com/shadcn.png",
//     status: "active",
//     createdAt: "2025-01-10T10:00:00Z",
//     updatedAt: "2025-01-15T14:30:00Z"
//   },
//   {
//     profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
//     org: {
//       orgId: "7c9e6679-7425-40de-944b-e07fc1f90aea",
//       orgName: "Umbrella Corporation",
//       logoUrl: "https://github.com/shadcn.png",
//       websiteUrl: "https://www.umbrella.com",
//       address: null,
//       email: "info@umbrella.com",
//       subscription: "premium",
//       status: "verified",
//       createdAt: "2023-12-07T08:45:00Z",
//       updatedAt: "2023-12-06T22:23:00Z"
//     },
//     role: "parent",
//     invitedBy: {
//       name: "Alice Johnson",
//       email: "alice.johnson@example.com",
//       phone: null,
//       avatarLink: null,
//       status: "active"
//     },
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     phone: "123-456-7890",
//     avatarLink: "https://github.com/shadcn.png",
//     status: "active",
//     createdAt: "2025-01-10T10:00:00Z",
//     updatedAt: "2025-01-15T14:30:00Z"
//   },
//   {
//     profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
//     org: {
//       orgId: "7c9e6679-7425-40de-944b-e07fc1f90aea",
//       orgName: "Umbrella Corporation",
//       logoUrl: "https://github.com/shadcn.png",
//       websiteUrl: "https://www.umbrella.com",
//       address: null,
//       email: "info@umbrella.com",
//       subscription: "premium",
//       status: "verified",
//       createdAt: "2023-12-07T08:45:00Z",
//       updatedAt: "2023-12-06T22:23:00Z"
//     },
//     role: "parent",
//     invitedBy: {
//       name: "Alice Johnson",
//       email: "alice.johnson@example.com",
//       phone: null,
//       avatarLink: null,
//       status: "active"
//     },
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     phone: "123-456-7890",
//     avatarLink: "https://github.com/shadcn.png",
//     status: "active",
//     createdAt: "2025-01-10T10:00:00Z",
//     updatedAt: "2025-01-15T14:30:00Z"
//   },
//   {
//     profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
//     org: {
//       orgId: "7c9e6679-7425-40de-944b-e07fc1f90aea",
//       orgName: "Umbrella Corporation",
//       logoUrl: "https://github.com/shadcn.png",
//       websiteUrl: "https://www.umbrella.com",
//       address: null,
//       email: "info@umbrella.com",
//       subscription: "premium",
//       status: "verified",
//       createdAt: "2023-12-07T08:45:00Z",
//       updatedAt: "2023-12-06T22:23:00Z"
//     },
//     role: "parent",
//     invitedBy: {
//       name: "Alice Johnson",
//       email: "alice.johnson@example.com",
//       phone: null,
//       avatarLink: null,
//       status: "active"
//     },
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     phone: "123-456-7890",
//     avatarLink: "https://github.com/shadcn.png",
//     status: "active",
//     createdAt: "2025-01-10T10:00:00Z",
//     updatedAt: "2025-01-15T14:30:00Z"
//   },
//   {
//     profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
//     org: {
//       orgId: "7c9e6679-7425-40de-944b-e07fc1f90aea",
//       orgName: "Umbrella Corporation",
//       logoUrl: "https://github.com/shadcn.png",
//       websiteUrl: "https://www.umbrella.com",
//       address: null,
//       email: "info@umbrella.com",
//       subscription: "premium",
//       status: "verified",
//       createdAt: "2023-12-07T08:45:00Z",
//       updatedAt: "2023-12-06T22:23:00Z"
//     },
//     role: "parent",
//     invitedBy: {
//       name: "Alice Johnson",
//       email: "alice.johnson@example.com",
//       phone: null,
//       avatarLink: null,
//       status: "active"
//     },
//     name: "Alice Johnson",
//     email: "alice.johnson@example.com",
//     phone: "123-456-7890",
//     avatarLink: "https://github.com/shadcn.png",
//     status: "active",
//     createdAt: "2025-01-10T10:00:00Z",
//     updatedAt: "2025-01-15T14:30:00Z"
//   }
// ];
interface ProfilePageProps extends ContentLayoutProps {
  columns: ColumnDef<Profile>[];
  data: ProfileWithChildren[];
  searchPlaceholder: string;
  locationListType?: LocationListType;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ columns, data, searchPlaceholder, locationListType, ...props }) => {
  return (
    <ContentLayout {...props}>
      <DataTable columns={columns} data={data} locationListType={locationListType} searchPlaceholder={searchPlaceholder} />
    </ContentLayout>
  );
};

export default ProfilePage;
