import { LucideIcon, Plus } from "lucide-react";

import DataTable from "@/components/DataTable";
import { TitleWithIcon } from "@/components/TitleWithIcon";
import { Button } from "@/components/ui/button";
import { Profile } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

const profileData: Profile[] = [
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "organisation admin",
    invitedBy: {
      name: "Mary Johnson",
      email: "alice.Green@example.com",
      phone: null,
      avatarLink: "https://github.com/shadcn.png",
      status: "active"
    },
    name: "Marry Johnson",
    email: "alice.Green@example.com",
    phone: "123-456-7890",
    avatarLink: "https://github.com/shadcn.png",
    status: "active",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-15T14:30:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "student",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "987-654-3210",
    avatarLink: "https://example.com/avatars/bob.jpg",
    status: "suspended",
    createdAt: "2025-01-01T08:45:00Z",
    updatedAt: "2025-01-12T09:00:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "organisation admin",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: null,
    avatarLink: "https://example.com/avatars/charlie.jpg",
    status: "active",
    createdAt: "2025-01-05T11:15:00Z",
    updatedAt: "2025-01-10T16:25:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "organisation admin",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Alice Johnson",
    email: "dana.white@example.com",
    phone: "555-555-5555",
    avatarLink: "https://example.com/avatars/dana.jpg",
    status: "active",
    createdAt: "2025-01-08T12:00:00Z",
    updatedAt: "2025-01-18T14:00:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "student",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Alice Adams",
    email: "EveAdams@gmail.com",
    phone: null,
    avatarLink: null,
    status: "suspended",
    createdAt: "2025-01-02T09:30:00Z",
    updatedAt: "2025-01-14T11:45:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "student",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "123-456-7890",
    avatarLink: "https://example.com/avatars/alice.jpg",
    status: "active",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-15T14:30:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "organisation teacher",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "987-654-3210",
    avatarLink: "https://example.com/avatars/bob.jpg",
    status: "suspended",
    createdAt: "2025-01-01T08:45:00Z",
    updatedAt: "2025-01-12T09:00:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "organisation teacher",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: null,
    avatarLink: "https://example.com/avatars/charlie.jpg",
    status: "active",
    createdAt: "2025-01-05T11:15:00Z",
    updatedAt: "2025-01-10T16:25:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "student",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Dana White",
    email: "dana.white@example.com",
    phone: "555-555-5555",
    avatarLink: "https://example.com/avatars/dana.jpg",
    status: "active",
    createdAt: "2025-01-08T12:00:00Z",
    updatedAt: "2025-01-18T14:00:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "student",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Eve Adams",
    email: "EveAdams@gmail.com",
    phone: null,
    avatarLink: null,
    status: "suspended",
    createdAt: "2025-01-02T09:30:00Z",
    updatedAt: "2025-01-14T11:45:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "parent",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "123-456-7890",
    avatarLink: "https://example.com/avatars/alice.jpg",
    status: "active",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-15T14:30:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "parent",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "987-654-3210",
    avatarLink: "https://example.com/avatars/bob.jpg",
    status: "suspended",
    createdAt: "2025-01-01T08:45:00Z",
    updatedAt: "2025-01-12T09:00:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "organisation teacher",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: null,
    avatarLink: "https://example.com/avatars/charlie.jpg",
    status: "active",
    createdAt: "2025-01-05T11:15:00Z",
    updatedAt: "2025-01-10T16:25:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "parent",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Alice Johnson",
    email: "dana.white@example.com",
    phone: "555-555-5555",
    avatarLink: "https://example.com/avatars/dana.jpg",
    status: "active",
    createdAt: "2025-01-08T12:00:00Z",
    updatedAt: "2025-01-18T14:00:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "organisation teacher",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Eve Adams",
    email: "alice.johnson@example.com",
    phone: null,
    avatarLink: null,
    status: "suspended",
    createdAt: "2025-01-02T09:30:00Z",
    updatedAt: "2025-01-14T11:45:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "organisation teacher",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "123-456-7890",
    avatarLink: "https://example.com/avatars/alice.jpg",
    status: "active",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-15T14:30:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "student",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "987-654-3210",
    avatarLink: "https://example.com/avatars/bob.jpg",
    status: "suspended",
    createdAt: "2025-01-01T08:45:00Z",
    updatedAt: "2025-01-12T09:00:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "parent",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: null,
    avatarLink: "https://example.com/avatars/charlie.jpg",
    status: "active",
    createdAt: "2025-01-05T11:15:00Z",
    updatedAt: "2025-01-10T16:25:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "organisation teacher",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Alice Johnson",
    email: "dana.white@example.com",
    phone: "555-555-5555",
    avatarLink: "https://example.com/avatars/dana.jpg",
    status: "active",
    createdAt: "2025-01-08T12:00:00Z",
    updatedAt: "2025-01-18T14:00:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "organisation teacher",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Eve Adams",
    email: "alice.johnson@example.com",
    phone: null,
    avatarLink: null,
    status: "suspended",
    createdAt: "2025-01-02T09:30:00Z",
    updatedAt: "2025-01-14T11:45:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "parent",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Alice Johnson",
    email: "alice.johnson@example.com",
    phone: "123-456-7890",
    avatarLink: "https://example.com/avatars/alice.jpg",
    status: "active",
    createdAt: "2025-01-10T10:00:00Z",
    updatedAt: "2025-01-15T14:30:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "organisation teacher",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Bob Smith",
    email: "bob.smith@example.com",
    phone: "987-654-3210",
    avatarLink: "https://example.com/avatars/bob.jpg",
    status: "suspended",
    createdAt: "2025-01-01T08:45:00Z",
    updatedAt: "2025-01-12T09:00:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "parent",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: null,
    avatarLink: "https://example.com/avatars/charlie.jpg",
    status: "active",
    createdAt: "2025-01-05T11:15:00Z",
    updatedAt: "2025-01-10T16:25:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "organisation teacher",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Alice Johnson",
    email: "dana.white@example.com",
    phone: "555-555-5555",
    avatarLink: "https://example.com/avatars/dana.jpg",
    status: "active",
    createdAt: "2025-01-08T12:00:00Z",
    updatedAt: "2025-01-18T14:00:00Z"
  },
  {
    profileId: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
    org: {
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
    role: "organisation teacher",
    invitedBy: {
      name: "Alice Johnson",
      email: "alice.johnson@example.com",
      phone: null,
      avatarLink: null,
      status: "active"
    },
    name: "Eve Adams",
    email: "alice.johnson@example.com",
    phone: null,
    avatarLink: null,
    status: "suspended",
    createdAt: "2025-01-02T09:30:00Z",
    updatedAt: "2025-01-14T11:45:00Z"
  }
];

interface ProfilePageProps {
  icon: LucideIcon;
  title: string;
  inviteLabel: string;
  columns: ColumnDef<Profile>[];
  data?: Profile[];
  searchPlaceholder: string;
  onInviteClick?: () => void;
}

const ProfilePage: React.FC<ProfilePageProps> = ({
  icon: Icon,
  title,
  inviteLabel,
  columns,
  data = profileData,
  searchPlaceholder,
  onInviteClick = () => {}
}) => {
  return (
    <div className="w-full flex flex-col justify-center">
      <div className="flex justify-between items-center">
        <TitleWithIcon icon={Icon} title={title} />
        <Button className="capitalize active:scale-95 transition-transform duration-100" onClick={onInviteClick}>
          <Plus className="h-4 w-4 mr-2" />
          {inviteLabel}
        </Button>
      </div>
      <DataTable columns={columns} data={data} searchPlaceholder={searchPlaceholder} />
    </div>
  );
};

export default ProfilePage;
