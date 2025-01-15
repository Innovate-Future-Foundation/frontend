import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import React from "react";
import { useLocation } from "react-router-dom";

const AppBreadcrumb = () => {
  const location = useLocation();

  // Split the pathname into segments
  const pathSegments = location.pathname.split("/").filter(Boolean);

  // Generate breadcrumb items dynamically
  const breadcrumbItems = pathSegments.map((segment, index) => {
    const isLast = index === pathSegments.length - 1;
    const path = `/${pathSegments.slice(2, index + 1).join("/")}`;

    return (
      <React.Fragment key={path}>
        <BreadcrumbItem>
          {isLast ? <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage> : <BreadcrumbLink href={path}>{capitalize(segment)}</BreadcrumbLink>}
        </BreadcrumbItem>
        {!isLast && <BreadcrumbSeparator />}
      </React.Fragment>
    );
  });

  return (
    <Breadcrumb className="fixed top-[48px] z-10 pl-12 bg-white h-12 w-full flex items-center">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/"></BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        {breadcrumbItems}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

// Utility to capitalize words
const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);

export default AppBreadcrumb;
