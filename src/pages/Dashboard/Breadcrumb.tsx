import { Breadcrumb as CNBreadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const Breadcrumb = () => {
  return (
    <CNBreadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard">Organisations</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="/dashboard/organisation/:id">Details</BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </CNBreadcrumb>
  );
};
export default Breadcrumb;
