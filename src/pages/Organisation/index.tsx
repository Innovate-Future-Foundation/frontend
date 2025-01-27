import DataTable from "@/components/DataTable";
import { orgColumns } from "./orgColumns";
import ContentLayout from "@/layouts/ContentLayout";
import { Building2 } from "lucide-react";
import { useEffect, useState } from "react";
import { platformAdminMockApis } from "@/mocks/platformAdminMockApis";
import { OrganisationWithChildren } from "@/types";

const OrganisationPage = () => {
  const [data, setData] = useState<OrganisationWithChildren[]>([]);

  //TODO: will link real api later
  useEffect(() => {
    (async () => {
      const response = await platformAdminMockApis.getOrganisations({ offset: 0, sorting: [], filtering: [] });
      console.log("organisationsList", response.data);

      if (Array.isArray(response.data)) {
        setData(response.data);
      }
    })();
  }, []);

  return (
    <ContentLayout icon={Building2} title={"organisation list"}>
      <DataTable columns={orgColumns} data={data} searchPlaceholder="search by name and email" />
    </ContentLayout>
  );
};

export default OrganisationPage;
