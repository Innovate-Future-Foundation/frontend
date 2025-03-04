import { OffsetPaginatedRequest } from "./apiReqResponse";
import { ProfileInfo } from "./profile";

export interface TourForm {
  title?: string;
  comment?: string | null;
  summary?: string | null;
  text?: string | null;
  coverImgUrl?: string | null;
  location?: string | null;
  startTime?: string;
  endTime?: string;
}
export interface Tour extends TourForm {
  id?: string;
  orgName?: string;
  leaderInfo?: ProfileInfo;
  statusCode?: TourStatusCode;
  days?: Day[] | null;
  studentTourEnrollments?: StudentTourEnrollment[] | null;
  createdAt?: string;
  updatedAt?: string;
}
export interface Day extends TourForm {
  id?: string;
  statusCode?: TourStatusCode;
  activities?: Activity[] | null;
  createdAt?: string;
  updatedAt?: string;
}
export interface Activity extends TourForm {
  id?: string;
  statusCode?: TourStatusCode;
  teachersAssigned?: ProfileInfo[] | null;
  createdAt?: string;
  updatedAt?: string;
}
export interface StudentTourEnrollment {
  profileId?: string;
  tourId?: string;
  enrollmentDate?: string;
  withdrawalDate?: string | null;
  statusCode?: EnrollmentStatusCode;
  createdAt?: string;
  updatedAt?: string;
}

export type EnrollmentStatusCode = "UndefinedEnrollment" | "Enrolled" | "Dropped" | "Completed";
export type TourStatusCode = "UndefinedTour" | "Draft" | "Published" | "Active" | "Updated" | "Completed" | "Canceled";
export interface TourPaginatedRequest extends OffsetPaginatedRequest {
  filters?: TourPaginationFilter;
  sortings?: TourPaginationOrderByType[];
}
export interface TourPaginationFilter {
  tourStatusCode?: TourStatusCode;
}

export type TourPaginationOrderByType = "title" | "createdAt" | "updatedAt" | "startDate" | "endDate";

export interface TourPaginationOrderBy {
  orderBy: TourPaginationOrderByType;
  isAscending: boolean;
}
