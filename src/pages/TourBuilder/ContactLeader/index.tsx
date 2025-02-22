import TourBuilderLayout from "@/layouts/TourBuilderLayout";
import { ProfileInfo, Tour } from "@/types";
import { useTourBuilderNavigation } from "@/hooks/useTourBuilderNavigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ContactCard from "./ContactCard";
import AddEmailForm from "../AddEmailForm";
// import { useEffect, useMemo } from "react";

const tourDetail: Tour = {
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
  endTime: "2024-06-27T18:00:00Z",
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
};

const leaderData: ProfileInfo = {
  id: "7c9e6679-7425-40de-944b-e07fc1f90ae7",
  roleCode: "OrgTeacher",
  name: "Alice Johnson",
  email: "alice.johnson@example.com",
  phone: "123-456-7890",
  avatarUrl: "https://github.com/shadcn.png",
  isActive: true,
  isConfirmed: true
};

const addEmailFormSchema = z.object({
  email: z.string().min(1, "Email is required").email({
    message: "Invalid email format."
  })
});

const ContactLeader = () => {
  const leaderEmailForm = useForm<z.infer<typeof addEmailFormSchema>>({
    resolver: zodResolver(addEmailFormSchema),
    mode: "onChange",
    defaultValues: {
      email: tourDetail.leaderInfo?.email ?? ""
    }
  });
  const { handleGoToNextStep, handleGoToPrevStep } = useTourBuilderNavigation();

  const handleSubmit = leaderEmailForm.handleSubmit(data => {
    console.log("Submitted Data:", data);
    // mutation.mutate({ id: tourDetail.id!, bodyData: { ...data } });

    // handle goto next nav item
    handleGoToNextStep();
  });

  const handleBack = () => {
    handleGoToPrevStep();
  };

  // const email = useMemo(()=>{
  //   leaderEmailForm.watch("email");
  // },[leaderEmailForm]);

  // useEffect(() => {
  //   if(!leaderEmailForm.getFieldState("email").isValidating){

  //   }
  // }, [email]);

  return (
    <TourBuilderLayout title={"Contact Leader"} subTitle={"Please pick a teacher as the leader of the tour."} handleBack={handleBack} handleNext={handleSubmit}>
      <div className="p-6 pt-0">
        <AddEmailForm form={leaderEmailForm} />
        <ContactCard profile={leaderData} />
      </div>
    </TourBuilderLayout>
  );
};

export default ContactLeader;
