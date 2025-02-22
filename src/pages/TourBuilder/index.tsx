import { Card } from "@/components/ui/card";
import { StepBack } from "lucide-react";
import { ProgresBar } from "./ProgressBar";
import clsx from "clsx";
import { Outlet, useParams } from "react-router-dom";
import { useTourBuilderNavigation } from "@/hooks/useTourBuilderNavigation";
import { navMenu } from "./navMenu";
import { useEffect } from "react";
import { useTourBuilderStore } from "@/store";
import { Tour } from "@/types";
import { ClipLoader } from "react-spinners";

const tourDetailData: Tour = {
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
  startTime: "2025-03-25T14:30:00Z",
  endTime: "2025-03-27T18:00:00Z",
  text: `
    <h2>
      Hi there,
    </h2>
    <p>
      this is a basic <em>basic</em> example of <strong>Tiptap</strong>. Sure, there are all kind of basic text styles you’d probably expect from a text editor. But wait until you see the lists:
    </p>
    <ul>
      <li>
        That’s a bullet list with one …
      </li>
      <li>
        … or two list items.
      </li>
    </ul>
    <p>
      Isn’t that great? And all of that is editable. But wait, there’s more. Let’s try a code block:
    </p>
<pre><code class="language-css">body {
  display: none;
}</code></pre>
    <p>
      I know, I know, this is impressive. It’s only the tip of the iceberg though. Give it a try and click a little bit around. Don’t forget to check the other examples too.
    </p>
    <blockquote>
      Wow, that’s amazing. Good work, boy! 👏
      <br />
      — Mom
    </blockquote>
  `,
  statusCode: "Active",
  coverImgUrl:
    "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  createdAt: "2024-06-25T14:30:00Z",
  updatedAt: "2024-06-25T14:30:00Z",
  days: [
    {
      id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac4",
      title: "Science & Tech Tour",
      comment: "An exciting tour exploring STEM fields",
      statusCode: "Active",
      coverImgUrl:
        "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: "2024-06-25T14:30:00Z",
      updatedAt: "2024-06-25T14:30:00Z",
      activities: [
        {
          id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12d5",
          title: "Team Building",
          location: "Opera House",
          statusCode: "Active",
          startTime: "",
          endTime: "",
          teachersAssigned: [
            {
              id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac5",
              name: "Chelsea",
              email: "chelsea@example.com",
              phone: "987628756786",
              avatarUrl:
                "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              isActive: true,
              isConfirmed: true
            },
            {
              id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac6",
              name: "Chelsea",
              email: "chelsea@example.com",
              phone: "987628756786",
              avatarUrl:
                "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              isActive: true,
              isConfirmed: true
            }
          ]
        },
        {
          id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12a3",
          title: "Team Building",
          location: "Adeliade",
          statusCode: "Active"
        }
      ]
    },
    {
      id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac4",
      title: "Science & Tech Tour",
      comment: "An exciting tour exploring STEM fields",
      statusCode: "Active",
      coverImgUrl:
        "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: "2024-06-25T14:30:00Z",
      updatedAt: "2024-06-25T14:30:00Z",
      activities: [
        {
          id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12d5",
          title: "Team Building",
          location: "Opera House",
          statusCode: "Active",
          startTime: "",
          endTime: "",
          teachersAssigned: [
            {
              id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac5",
              name: "Chelsea",
              email: "chelsea@example.com",
              phone: "987628756786",
              avatarUrl:
                "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              isActive: true,
              isConfirmed: true
            },
            {
              id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac6",
              name: "Chelsea",
              email: "chelsea@example.com",
              phone: "987628756786",
              avatarUrl:
                "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              isActive: true,
              isConfirmed: true
            }
          ]
        },
        {
          id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12a3",
          title: "Team Building",
          location: "Adeliade",
          statusCode: "Active"
        }
      ]
    },
    {
      id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac4",
      title: "Science & Tech Tour",
      comment: "An exciting tour exploring STEM fields",
      statusCode: "Active",
      coverImgUrl:
        "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      createdAt: "2024-06-25T14:30:00Z",
      updatedAt: "2024-06-25T14:30:00Z",
      activities: [
        {
          id: "9f8c5a76-24a7-4b9b-becf-63cbf98a12d5",
          title: "Team Building",
          location: "Opera House",
          statusCode: "Active",
          startTime: "",
          endTime: "",
          teachersAssigned: [
            {
              id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac5",
              name: "Chelsea",
              email: "chelsea@example.com",
              phone: "987628756786",
              avatarUrl:
                "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              isActive: true,
              isConfirmed: true
            },
            {
              id: "a3e4b1d6-9c4a-4b73-982b-0fce77e88ac6",
              name: "Chelsea",
              email: "chelsea@example.com",
              phone: "987628756786",
              avatarUrl:
                "https://images.unsplash.com/photo-1528072164453-f4e8ef0d475a?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              isActive: true,
              isConfirmed: true
            }
          ]
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
};
export interface MenuContent {
  index: number;
  visitedFlags: boolean;
}
const TourBuilderPage = () => {
  const { currentStep, visitedFlags, handleSetCurrentStep, handleBackTourList, setTourId } = useTourBuilderNavigation();
  const { tourDetails, setTourDetails, setScheduleDays, setContactLeaderProfile } = useTourBuilderStore();
  const { id } = useParams();

  useEffect(() => {
    setTourId(id);
    setTourDetails(tourDetailData);
    setContactLeaderProfile(tourDetailData.leaderInfo);
    setScheduleDays(tourDetailData.days ?? []);
    //todo:set enrolled students
  }, [id]);

  if (!tourDetails) {
    return <ClipLoader />;
  }
  return (
    <div className="bg-muted h-screen p-6 flex flex-col gap-4 overflow-y-hidden">
      <div className="flex h-12 items-center relative justify-center">
        <Card className="absolute left-0 z-10 w-12 h-12 border-none flex items-center justify-center cursor-pointer">
          <StepBack className="text-muted-foreground/80 hover:text-secondary-foreground" size={20} onClick={handleBackTourList} />
        </Card>
        <Card className="w-96 h-12 border-none flex items-center p-2 px-4">
          <ProgresBar />
        </Card>
      </div>
      <div className="flex gap-4 ">
        <Card className="relative flex flex-col gap-1 cursor-pointer border-none w-64 p-1 text-md text-foreground/80 font-medium h-fit">
          <div className="absolute right-4 bg-primary-light top-4 w-[2px] justify-center items-center flex flex-col gap-8">
            {navMenu?.length > 0 &&
              Array.from({ length: navMenu.length }, (_, index) => index).map(index => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${currentStep === index ? "bg-primary-foreground30" : visitedFlags[index] ? "bg-primary" : "bg-muted"}`}
                ></div>
              ))}
          </div>
          {navMenu.map((menuItem, index) => (
            <div
              key={menuItem.label}
              onClick={() => handleSetCurrentStep(index)}
              className={clsx(
                `flex gap-2 items-center hover:bg-primary/10 p-2 rounded-lg z-10 ${currentStep === index && "bg-primary/10"} ${!visitedFlags[index] && "text-primary-foreground60"}`
              )}
            >
              <menuItem.icon size={18} />
              <p>{menuItem.label}</p>
            </div>
          ))}
        </Card>
        <Outlet />
      </div>
    </div>
  );
};

export default TourBuilderPage;
