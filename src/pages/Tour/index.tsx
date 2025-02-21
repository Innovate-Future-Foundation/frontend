import { Map } from "lucide-react";
import ContentLayout from "@/layouts/ContentLayout";
import DataTable from "@/components/DataTable";
import { ProfilePaginationFilter, ProfilePaginationOrderByType, Tour, TableBaseType } from "@/types";
import { useTableFilters } from "@/hooks/useTableFilters";
import { mapStringToType } from "@/constants/mapper";
import { toursColumns } from "./toursColumns";

const tableData: TableBaseType<Tour>[] = [
  {
    id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
    orgName: "Future Innovators Academy",
    leaderInfo: {
      id: "eddf1c4a-bae5-48fc-b5b1-9efcda508679",
      orgId: "9a8b6d2f-5c7d-44f6-89e5-6e7fd7c47f89",
      roleCode: "OrgTeacher",
      name: "John Doe",
      email: "johndoe@example.com"
    },
    title: "Science & Tech Tour",
    comment: "An exciting tour exploring STEM fields",
    startTime: "2024-06-25T14:30:00Z",
    endTime: "2024-06-30T18:00:00Z",
    statusCode: "Active",
    coverImgUrl:
      "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2024-06-25T14:30:00Z",
    updatedAt: "2024-06-25T14:30:00Z",
    days: [
      {
        id: "14c2b8e1-5a21-4596-a15a-0b07d9f40836",
        title: "Day 1: Orientation",
        activities: [
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12d5",
            title: "Team Building",
            location: "Opera House",
            statusCode: "Active"
          },
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12a3",
            title: "Team Building",
            location: "Adeliade",
            statusCode: "Active"
          }
        ]
      }
    ],
    studentTourEnrollments: [
      {
        profileId: "c4e9d8b5-72d3-4a1a-94de-0d13f8a2a12b",
        tourId: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
        enrollmentDate: "2024-06-10T09:15:00Z",
        statusCode: "Enrolled"
      }
    ]
  },
  {
    id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
    orgName: "Future Innovators Academy",
    leaderInfo: {
      id: "eddf1c4a-bae5-48fc-b5b1-9efcda508679",
      orgId: "9a8b6d2f-5c7d-44f6-89e5-6e7fd7c47f89",
      roleCode: "OrgTeacher",
      name: "John Doe",
      email: "johndoe@example.com"
    },
    title: "Science & Tech Tour",
    comment: "An exciting tour exploring STEM fields",
    startTime: "2024-06-25T14:30:00Z",
    endTime: "2024-06-30T18:00:00Z",
    statusCode: "Active",
    coverImgUrl:
      "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=3044&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2024-06-25T14:30:00Z",
    updatedAt: "2024-06-25T14:30:00Z",
    days: [
      {
        id: "14c2b8e1-5a21-4596-a15a-0b07d9f40836",
        title: "Day 1: Orientation",
        activities: [
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12d5",
            title: "Team Building",
            location: "Opera House",
            statusCode: "Active"
          },
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12a3",
            title: "Team Building",
            location: "Adeliade",
            statusCode: "Active"
          }
        ]
      }
    ],
    studentTourEnrollments: [
      {
        profileId: "c4e9d8b5-72d3-4a1a-94de-0d13f8a2a12b",
        tourId: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
        enrollmentDate: "2024-06-10T09:15:00Z",
        statusCode: "Enrolled"
      }
    ]
  },
  {
    id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
    orgName: "Future Innovators Academy",
    leaderInfo: {
      id: "eddf1c4a-bae5-48fc-b5b1-9efcda508679",
      orgId: "9a8b6d2f-5c7d-44f6-89e5-6e7fd7c47f89",
      roleCode: "OrgTeacher",
      name: "John Doe",
      email: "johndoe@example.com"
    },
    title: "Science & Tech Tour",
    comment: "An exciting tour exploring STEM fields",
    startTime: "2024-06-25T14:30:00Z",
    endTime: "2024-06-30T18:00:00Z",
    statusCode: "Active",
    coverImgUrl:
      "https://images.unsplash.com/photo-1595850344461-dcbec3a62f67?q=80&w=2439&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2024-06-25T14:30:00Z",
    updatedAt: "2024-06-25T14:30:00Z",
    days: [
      {
        id: "14c2b8e1-5a21-4596-a15a-0b07d9f40836",
        title: "Day 1: Orientation",
        activities: [
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12d5",
            title: "Team Building",
            location: "Opera House",
            statusCode: "Active"
          },
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12a3",
            title: "Team Building",
            location: "Adeliade",
            statusCode: "Active"
          }
        ]
      }
    ],
    studentTourEnrollments: [
      {
        profileId: "c4e9d8b5-72d3-4a1a-94de-0d13f8a2a12b",
        tourId: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
        enrollmentDate: "2024-06-10T09:15:00Z",
        statusCode: "Enrolled"
      }
    ]
  },
  {
    id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
    orgName: "Future Innovators Academy",
    leaderInfo: {
      id: "eddf1c4a-bae5-48fc-b5b1-9efcda508679",
      orgId: "9a8b6d2f-5c7d-44f6-89e5-6e7fd7c47f89",
      roleCode: "OrgTeacher",
      name: "John Doe",
      email: "johndoe@example.com"
    },
    title: "Science & Tech Tour",
    comment: "An exciting tour exploring STEM fields",
    startTime: "2024-06-25T14:30:00Z",
    endTime: "2024-06-30T18:00:00Z",
    statusCode: "Active",
    coverImgUrl:
      "https://plus.unsplash.com/premium_photo-1661919210043-fd847a58522d?q=80&w=3020&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2024-06-25T14:30:00Z",
    updatedAt: "2024-06-25T14:30:00Z",
    days: [
      {
        id: "14c2b8e1-5a21-4596-a15a-0b07d9f40836",
        title: "Day 1: Orientation",
        activities: [
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12d5",
            title: "Team Building",
            location: "Opera House",
            statusCode: "Active"
          },
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12a3",
            title: "Team Building",
            location: "Adeliade",
            statusCode: "Active"
          }
        ]
      }
    ],
    studentTourEnrollments: [
      {
        profileId: "c4e9d8b5-72d3-4a1a-94de-0d13f8a2a12b",
        tourId: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
        enrollmentDate: "2024-06-10T09:15:00Z",
        statusCode: "Enrolled"
      }
    ]
  },
  {
    id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
    orgName: "Future Innovators Academy",
    leaderInfo: {
      id: "eddf1c4a-bae5-48fc-b5b1-9efcda508679",
      orgId: "9a8b6d2f-5c7d-44f6-89e5-6e7fd7c47f89",
      roleCode: "OrgTeacher",
      name: "John Doe",
      email: "johndoe@example.com"
    },
    title: "Science & Tech Tour",
    comment: "An exciting tour exploring STEM fields",
    startTime: "2024-06-25T14:30:00Z",
    endTime: "2024-06-30T18:00:00Z",
    statusCode: "Active",
    coverImgUrl:
      "https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?q=80&w=2762&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2024-06-25T14:30:00Z",
    updatedAt: "2024-06-25T14:30:00Z",
    days: [
      {
        id: "14c2b8e1-5a21-4596-a15a-0b07d9f40836",
        title: "Day 1: Orientation",
        activities: [
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12d5",
            title: "Team Building",
            location: "Opera House",
            statusCode: "Active"
          },
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12a3",
            title: "Team Building",
            location: "Adeliade",
            statusCode: "Active"
          }
        ]
      }
    ],
    studentTourEnrollments: [
      {
        profileId: "c4e9d8b5-72d3-4a1a-94de-0d13f8a2a12b",
        tourId: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
        enrollmentDate: "2024-06-10T09:15:00Z",
        statusCode: "Enrolled"
      }
    ]
  },
  {
    id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
    orgName: "Future Innovators Academy",
    leaderInfo: {
      id: "eddf1c4a-bae5-48fc-b5b1-9efcda508679",
      orgId: "9a8b6d2f-5c7d-44f6-89e5-6e7fd7c47f89",
      roleCode: "OrgTeacher",
      name: "John Doe",
      email: "johndoe@example.com"
    },
    title: "Science & Tech Tour",
    comment: "An exciting tour exploring STEM fields",
    startTime: "2024-06-25T14:30:00Z",
    endTime: "2024-06-30T18:00:00Z",
    statusCode: "Active",
    coverImgUrl:
      "https://images.unsplash.com/photo-1545044846-351ba102b6d5?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2024-06-25T14:30:00Z",
    updatedAt: "2024-06-25T14:30:00Z",
    days: [
      {
        id: "14c2b8e1-5a21-4596-a15a-0b07d9f40836",
        title: "Day 1: Orientation",
        activities: [
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12d5",
            title: "Team Building",
            location: "Opera House",
            statusCode: "Active"
          },
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12a3",
            title: "Team Building",
            location: "Adeliade",
            statusCode: "Active"
          }
        ]
      }
    ],
    studentTourEnrollments: [
      {
        profileId: "c4e9d8b5-72d3-4a1a-94de-0d13f8a2a12b",
        tourId: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
        enrollmentDate: "2024-06-10T09:15:00Z",
        statusCode: "Enrolled"
      }
    ]
  },
  {
    id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
    orgName: "Future Innovators Academy",
    leaderInfo: {
      id: "eddf1c4a-bae5-48fc-b5b1-9efcda508679",
      orgId: "9a8b6d2f-5c7d-44f6-89e5-6e7fd7c47f89",
      roleCode: "OrgTeacher",
      name: "John Doe",
      email: "johndoe@example.com"
    },
    title: "Science & Tech Tour",
    comment: "An exciting tour exploring STEM fields",
    startTime: "2024-06-25T14:30:00Z",
    endTime: "2024-06-30T18:00:00Z",
    statusCode: "Active",
    coverImgUrl:
      "https://plus.unsplash.com/premium_photo-1733317293766-5606f74b765b?q=80&w=2874&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2024-06-25T14:30:00Z",
    updatedAt: "2024-06-25T14:30:00Z",
    days: [
      {
        id: "14c2b8e1-5a21-4596-a15a-0b07d9f40836",
        title: "Day 1: Orientation",
        activities: [
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12d5",
            title: "Team Building",
            location: "Opera House",
            statusCode: "Active"
          },
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12a3",
            title: "Team Building",
            location: "Adeliade",
            statusCode: "Active"
          }
        ]
      }
    ],
    studentTourEnrollments: [
      {
        profileId: "c4e9d8b5-72d3-4a1a-94de-0d13f8a2a12b",
        tourId: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
        enrollmentDate: "2024-06-10T09:15:00Z",
        statusCode: "Enrolled"
      }
    ]
  },
  {
    id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
    orgName: "Future Innovators Academy",
    leaderInfo: {
      id: "eddf1c4a-bae5-48fc-b5b1-9efcda508679",
      orgId: "9a8b6d2f-5c7d-44f6-89e5-6e7fd7c47f89",
      roleCode: "OrgTeacher",
      name: "John Doe",
      email: "johndoe@example.com"
    },
    title: "Science & Tech Tour",
    comment: "An exciting tour exploring STEM fields",
    startTime: "2024-06-25T14:30:00Z",
    endTime: "2024-06-30T18:00:00Z",
    statusCode: "Active",
    coverImgUrl:
      "https://images.unsplash.com/photo-1514395462725-fb4566210144?q=80&w=2971&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    createdAt: "2024-06-25T14:30:00Z",
    updatedAt: "2024-06-25T14:30:00Z",
    days: [
      {
        id: "14c2b8e1-5a21-4596-a15a-0b07d9f40836",
        title: "Day 1: Orientation",
        activities: [
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12d5",
            title: "Team Building",
            location: "Opera House",
            statusCode: "Active"
          },
          {
            id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12a3",
            title: "Team Building",
            location: "Adeliade",
            statusCode: "Active"
          }
        ]
      }
    ],
    studentTourEnrollments: [
      {
        profileId: "c4e9d8b5-72d3-4a1a-94de-0d13f8a2a12b",
        tourId: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac1",
        enrollmentDate: "2024-06-10T09:15:00Z",
        statusCode: "Enrolled"
      }
    ]
  }
];

const TourPage = () => {
  const {
    // searchKey,
    sorting,
    setSorting,
    columnFilters,
    setColumnFilters,
    pagination,
    setPagination,
    globalFilter,
    setGlobalFilter
    // offset,
    // filters,
    // sortings
  } = useTableFilters<ProfilePaginationFilter, ProfilePaginationOrderByType>({ filterMapper: mapStringToType });

  // const { contactsResponse, isLoadingContacts } = useContact({
  //   offset,
  //   limit: pagination.pageSize,
  //   filters,
  //   sortings,
  //   searchKey
  // });

  // const tableData: TableBaseType<Profile>[] = useMemo(() => {
  //   return Array.isArray(contactsResponse?.data) ? contactsResponse?.data : [];
  // }, [contactsResponse]);

  const handleCreateTour = () => {
    window.location.href = "/tours/ou762iu3gjhgjasgfcyas71";
  };

  return (
    <ContentLayout icon={Map} title={"tour list"} onButtonClick={handleCreateTour} buttonLabel={"Create Tour"}>
      <DataTable
        totalItems={9}
        limit={pagination.pageSize}
        columns={toursColumns}
        data={tableData}
        isLoading={false}
        searchPlaceholder="search by name, email or phone"
        columnFilters={columnFilters}
        setColumnFilters={setColumnFilters}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        sorting={sorting}
        setSorting={setSorting}
        pagination={pagination}
        setPagination={setPagination}
        locationListType="cards"
      />
    </ContentLayout>
  );
};

export default TourPage;
