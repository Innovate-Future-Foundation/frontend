import { useMatches } from "react-router-dom";

import { Breadcrumb as CNBreadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface BreadcrumbProps {
  className?: string;
  separatorProps?: React.ComponentProps<typeof BreadcrumbSeparator>;
  itemProps?: React.ComponentProps<typeof BreadcrumbItem>;
  linkProps?: React.ComponentProps<typeof BreadcrumbLink>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ className, itemProps = {}, linkProps = {}, separatorProps = {} }) => {
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
      <BreadcrumbList className={cn("capitalize", className)}>
        {breadcrumbs.map(breadcrumb => (
          <div className="flex" key={breadcrumb!.href}>
            <BreadcrumbSeparator {...separatorProps} className="mr-1" />
            <BreadcrumbItem {...itemProps}>
              <BreadcrumbLink {...linkProps} href={breadcrumb!.href}>
                {breadcrumb!.label}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </div>
        ))}
      </BreadcrumbList>
    </CNBreadcrumb>
  );
};
export default Breadcrumb;
