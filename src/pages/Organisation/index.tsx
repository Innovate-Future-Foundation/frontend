import DataTable from "@/components/DataTable";
import { orgColumns } from "./orgColumns";
import { Organisation } from "@/types";
import ContentLayout from "@/layouts/ContentLayout";
import { Building2 } from "lucide-react";

const data: Organisation[] = [
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    orgName: "Acme Corporation",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.acmecorp.com",
    address: null,
    email: "info@acmecorp.com",
    subscription: "Premium",
    status: "pending",
    createdAt: "2023-12-10T12:34:56Z",
    updatedAt: "2023-12-06T22:20:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae8",
    orgName: "Globex Corporation",
    logoUrl: null,
    websiteUrl: "https://www.globex.com",
    address: null,
    email: "contact@globex.com",
    subscription: "Basic",
    status: "deactivated",
    createdAt: "2023-12-09T15:00:00Z",
    updatedAt: "2023-12-06T22:21:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae9",
    orgName: "Initech",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.initech.com",
    address: null,
    email: "support@initech.com",
    subscription: "Free",
    status: "suspended",
    createdAt: "2023-12-08T10:15:30Z",
    updatedAt: "2023-12-06T22:22:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae9",
    orgName: "Initech",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.initech.com",
    address: null,
    email: "support@initech.com",
    subscription: "Free",
    status: "suspended",
    createdAt: "2023-12-08T10:15:30Z",
    updatedAt: "2023-12-06T22:22:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90aeb",
    orgName: "Hooli",
    logoUrl: null,
    websiteUrl: "https://www.hooli.com",
    address: null,
    email: "contact@hooli.com",
    subscription: "Basic",
    status: "pending",
    createdAt: "2023-12-06T22:30:00Z",
    updatedAt: "2023-12-06T22:24:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90aea",
    orgName: "Umbrella Corporation",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.umbrella.com",
    address: null,
    email: "info@umbrella.com",
    subscription: "Premium",
    status: "verified",
    createdAt: "2023-12-07T08:45:00Z",
    updatedAt: "2023-12-06T22:23:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90aeb",
    orgName: "Hooli",
    logoUrl: null,
    websiteUrl: "https://www.hooli.com",
    address: null,
    email: "contact@hooli.com",
    subscription: "Basic",
    status: "pending",
    createdAt: "2023-12-06T22:30:00Z",
    updatedAt: "2023-12-06T22:24:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    orgName: "Acme Corporation",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.acmecorp.com",
    address: null,
    email: "info@acmecorp.com",
    subscription: "Premium",
    status: "pending",
    createdAt: "2023-12-10T12:34:56Z",
    updatedAt: "2023-12-06T22:20:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae9",
    orgName: "Initech",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.initech.com",
    address: null,
    email: "support@initech.com",
    subscription: "Free",
    status: "suspended",
    createdAt: "2023-12-08T10:15:30Z",
    updatedAt: "2023-12-06T22:22:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90aeb",
    orgName: "Hooli",
    logoUrl: null,
    websiteUrl: "https://www.hooli.com",
    address: null,
    email: "contact@hooli.com",
    subscription: "Basic",
    status: "pending",
    createdAt: "2023-12-06T22:30:00Z",
    updatedAt: "2023-12-06T22:24:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90aea",
    orgName: "Umbrella Corporation",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.umbrella.com",
    address: null,
    email: "info@umbrella.com",
    subscription: "Premium",
    status: "verified",
    createdAt: "2023-12-07T08:45:00Z",
    updatedAt: "2023-12-06T22:23:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90aeb",
    orgName: "Hooli",
    logoUrl: null,
    websiteUrl: "https://www.hooli.com",
    address: null,
    email: "contact@hooli.com",
    subscription: "Basic",
    status: "pending",
    createdAt: "2023-12-06T22:30:00Z",
    updatedAt: "2023-12-06T22:24:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae8",
    orgName: "Globex Corporation",
    logoUrl: null,
    websiteUrl: "https://www.globex.com",
    address: null,
    email: "contact@globex.com",
    subscription: "Basic",
    status: "deactivated",
    createdAt: "2023-12-09T15:00:00Z",
    updatedAt: "2023-12-06T22:21:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae9",
    orgName: "Initech",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.initech.com",
    address: null,
    email: "support@initech.com",
    subscription: "Free",
    status: "suspended",
    createdAt: "2023-12-08T10:15:30Z",
    updatedAt: "2023-12-06T22:22:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90aeb",
    orgName: "Hooli",
    logoUrl: null,
    websiteUrl: "https://www.hooli.com",
    address: null,
    email: "contact@hooli.com",
    subscription: "Basic",
    status: "pending",
    createdAt: "2023-12-06T22:30:00Z",
    updatedAt: "2023-12-06T22:24:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    orgName: "Acme Corporation",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.acmecorp.com",
    address: null,
    email: "info@acmecorp.com",
    subscription: "Premium",
    status: "pending",
    createdAt: "2023-12-10T12:34:56Z",
    updatedAt: "2023-12-06T22:20:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90aea",
    orgName: "Umbrella Corporation",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.umbrella.com",
    address: null,
    email: "info@umbrella.com",
    subscription: "Premium",
    status: "verified",
    createdAt: "2023-12-07T08:45:00Z",
    updatedAt: "2023-12-06T22:23:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    orgName: "Acme Corporation",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.acmecorp.com",
    address: null,
    email: "info@acmecorp.com",
    subscription: "Premium",
    status: "pending",
    createdAt: "2023-12-10T12:34:56Z",
    updatedAt: "2023-12-06T22:20:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90ae8",
    orgName: "Globex Corporation",
    logoUrl: null,
    websiteUrl: "https://www.globex.com",
    address: null,
    email: "contact@globex.com",
    subscription: "Basic",
    status: "deactivated",
    createdAt: "2023-12-09T15:00:00Z",
    updatedAt: "2023-12-06T22:21:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90aea",
    orgName: "Umbrella Corporation",
    logoUrl: "https://github.com/shadcn.png",
    websiteUrl: "https://www.umbrella.com",
    address: null,
    email: "info@umbrella.com",
    subscription: "Premium",
    status: "verified",
    createdAt: "2023-12-07T08:45:00Z",
    updatedAt: "2023-12-06T22:23:00Z"
  },
  {
    orgId: "7c9e6679-7425-40de-944b-e07fc1f90aeb",
    orgName: "Hooli",
    logoUrl: null,
    websiteUrl: "https://www.hooli.com",
    address: null,
    email: "contact@hooli.com",
    subscription: "Basic",
    status: "pending",
    createdAt: "2023-12-06T22:30:00Z",
    updatedAt: "2023-12-06T22:24:00Z"
  }
];

const OrganisationPage = () => {
  return (
    <ContentLayout icon={Building2} title={"organisation list"}>
      <DataTable columns={orgColumns} data={data} searchPlaceholder="search by name and email" />
    </ContentLayout>
  );
};

export default OrganisationPage;
