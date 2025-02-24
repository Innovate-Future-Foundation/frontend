import { WalletCards } from "lucide-react";

import OrganisationDetailForm from "./OrganisationDetailForm";
import ContentLayout from "@/layouts/ContentLayout";
import { ScrollList } from "@/components/ScrollList";
import { usePermissions } from "@/hooks/usePermissions";
import { useParams } from "react-router-dom";
import { useOrganisationDetail } from "@/hooks/organisations/useOrganisationDetail";
import { Organisation } from "@/types";
import { useMemo } from "react";
import { BeatLoader } from "react-spinners";

const OrganisationDetailPage = () => {
  const { canEditOrganisationDetailForm, canViewManagerScrollList } = usePermissions();
  const { id } = useParams();
  console.log("organisationId", id);
  const { organisationDetailResponse, isLoadingOrganisationDetail } = useOrganisationDetail(id ?? "");
  console.log("organisationDetail", organisationDetailResponse);

  const orgProfileDetail: Organisation = useMemo(() => {
    return !Array.isArray(organisationDetailResponse?.data) && organisationDetailResponse?.data ? organisationDetailResponse.data : ({} as Organisation);
  }, [organisationDetailResponse]);

  if (isLoadingOrganisationDetail) {
    return (
      <div className="flex items-center justify-center">
        <BeatLoader className="text-primary" />
      </div>
    );
  }
  return (
    <ContentLayout icon={WalletCards} title={"organisation profile"}>
      <OrganisationDetailForm orgProfileDetail={orgProfileDetail} disabled={!canEditOrganisationDetailForm} />
      {canViewManagerScrollList && (
        <>
          <div className="h-4"></div>
          <ScrollList title="manager" />
        </>
      )}
    </ContentLayout>
  );
};

export default OrganisationDetailPage;
