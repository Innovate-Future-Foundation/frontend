import { authApis } from "@/services/apiServices/authApis";
import { inviteType } from "@/types";
import { useEffect, useState } from "react";

const DashboardPage: React.FC = () => {
  const url = window.location.href;
  const arr = url.split("code=");
  const code = arr.length === 2 ? arr[1] : "";

  // State to track form data
  const [formData, setFormData] = useState<inviteType>({
    email: "",
    fullName: "",
    roleId: "",
    orgId: ""
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInvite = async () => {
    try {
      //todo: role screen
      // let invitedBy;
      // let supervisedBy;
      // if(role === ){
      // }
      //todo: hard code
      const profileId = "4d69456b-9b86-43b9-b8f7-09a88062eb6b";

      const inviteForm = {
        email: formData.email,
        fullName: formData.fullName,
        roleId: formData.roleId,
        orgId: formData.orgId,
        invitedBy: profileId,
        supervisedBy: null
      };
      console.log("inviteForm", inviteForm);
      const response = await authApis.inviteReq(inviteForm);
      console.log("Invite Response:", response.data);
      alert("sent invitation successfully!");
    } catch (err) {
      console.error("Error sending invite:", err);
      alert(err);
    }
  };

  useEffect(() => {
    if (code) {
      const getToken = async () => {
        try {
          const queryParams = new URLSearchParams({ code: code });
          await authApis.getTokenReq(queryParams);
          //todo: call get user + profile=>default profile id=> invitedBy+form data
          //todo: save user+profile info to state
          //todo: save role to state
        } catch (err) {
          console.error(err);
        }
      };
      getToken();
    }
  }, [code]);

  return (
    <div>
      <h1>Dashboard Page</h1>
      <div className="flex flex-col gap-3 w-72 mx-auto mb-10">
        <label htmlFor="email">
          Email:
          <input className="border" type="email" name="email" value={formData.email} onChange={handleInputChange} />
        </label>

        <label htmlFor="fullName">
          Full Name:
          <input className="border" type="text" name="fullName" value={formData.fullName} onChange={handleInputChange} />
        </label>

        <label>Select a role:</label>
        <label htmlFor="role-admin">
          Organisation Admin
          <input className="border" type="radio" name="roleId" id="role-admin" value="d3788298-39b4-4a40-9985-bfa6a830acd9" onChange={handleInputChange} />
        </label>

        <label htmlFor="role-teacher">
          Organisation Teacher
          <input className="border" type="radio" name="roleId" id="role-teacher" value="3b69fda3-555a-4658-a6ab-31e1f327ef79" onChange={handleInputChange} />
        </label>

        <label htmlFor="role-parent">
          Parent
          <input className="border" type="radio" name="roleId" id="role-parent" value="32ef6536-3cb1-4846-bd32-cd34b489fd43" onChange={handleInputChange} />
        </label>

        <label htmlFor="role-student">
          Student
          <input className="border" type="radio" name="roleId" id="role-student" value="28c99a2a-e593-4353-8dc2-cb83fc1ebfea" onChange={handleInputChange} />
        </label>

        <OrganisationDropdown selectedOrganisationId={formData.orgId} setSelectedOrganisationId={id => setFormData(prev => ({ ...prev, orgId: id }))} />

        <button className="border border-black px-4" onClick={handleInvite}>
          Invite
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;

interface Organisation {
  orgId: string;
  name: string;
}

interface OrganisationDropdownProps {
  selectedOrganisationId: string;
  setSelectedOrganisationId: (id: string) => void;
}

const OrganisationDropdown: React.FC<OrganisationDropdownProps> = ({ selectedOrganisationId, setSelectedOrganisationId }) => {
  const organisations: Organisation[] = [
    { orgId: "d96e643e-a7aa-42b0-a8cd-1cdd8610e857", name: "Organisation A" },
    { orgId: "0aecbf37-ead3-470c-ad8b-790d7eea3b0a", name: "Organisation B" }
  ];

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedOrganisationId(event.target.value);
  };

  return (
    <div>
      <label htmlFor="profileOrganisation">Profile Organisation:</label>
      <select id="profileOrganisation" name="organisationId" className="border" value={selectedOrganisationId} onChange={handleSelectChange}>
        <option value="" disabled>
          Select an organisation
        </option>
        {organisations.map(org => (
          <option key={org.orgId} value={org.orgId}>
            {org.name}
          </option>
        ))}
      </select>
      {selectedOrganisationId && <p>Selected Organisation ID: {selectedOrganisationId}</p>}
    </div>
  );
};
