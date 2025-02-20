import { TBoard, TColumn } from "./TwoColumns/shared/data";
import { Board } from "./TwoColumns/shared/board";
import { Tour } from "@/types";
// import { Tour } from "@/types";
// import TourDetailForm from "./TourDetailForm";
const destinationTours: Tour[] = [
  {
    id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac4",
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
    startDate: "2024-06-25T14:30:00Z",
    endDate: "2024-06-30T18:00:00Z",
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
    id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac8",
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
    startDate: "2024-06-25T14:30:00Z",
    endDate: "2024-06-30T18:00:00Z",
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
  }
];

const sourceTours: Tour[] = [
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
    startDate: "2024-06-25T14:30:00Z",
    endDate: "2024-06-27T18:00:00Z",
    dateRange: {
      from: new Date("2025-02-25T14:30:00Z"),
      to: new Date("2025-02-27T18:00:00Z")
    },
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
    id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac2",
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
    startDate: "2024-06-25T14:30:00Z",
    endDate: "2024-06-30T18:00:00Z",
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
  }
];

function getInitialData(): TBoard {
  // Doing this so we get consistent ids on server and client
  // const getCards = (() => {
  //   let count: number = 0;

  //   return function getCards({ amount }: { amount: number }): TCard[] {
  //     return Array.from({ length: amount }, (): TCard => {
  //       const id = count++;
  //       return {
  //         id: `card:${id}`,
  //         description: `Card ${id}`
  //       };
  //     });
  //   };
  // })();

  const columns: TColumn[] = [
    { id: "column:a", title: "Column A", type: "destination", cards: destinationTours },
    { id: "column:b", title: "Column B", type: "source", cards: sourceTours }
  ];

  return {
    columns
  };
}

const Schedule = () => {
  return <Board initial={getInitialData()} />;
};

export default Schedule;
