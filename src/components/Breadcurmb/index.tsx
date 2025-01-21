import { useMatches } from "react-router-dom";

import { Breadcrumb as CNBreadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

const Breadcrumb = () => {
  const matches = useMatches();
  const breadcrumbs = matches
    .map(match => {
      const handle = match.handle as { breadcrumb?: string } | undefined;
      const breadcrumb = handle?.breadcrumb;
      return breadcrumb ? { label: breadcrumb, href: match.pathname } : null;
    })
    .filter(Boolean);
  return (
    <CNBreadcrumb>
      <BreadcrumbList className="capitalize">
        {breadcrumbs.map(breadcrumb => (
          <div className="flex" key={breadcrumb!.href}>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={breadcrumb!.href}>{breadcrumb!.label}</BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </CNBreadcrumb>
  );
};
export default Breadcrumb;
