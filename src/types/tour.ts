import { OffsetPaginatedRequest } from "./apiReqResponse";
import { ProfileInfo } from "./profile";

export interface Tour {
  id?: string;
  orgName?: string;
  leaderInfo?: ProfileInfo;
  title?: string;
  comment?: string | null;
  summary?: string | null;
  text?: string | null;
  coverImgUrl?: string | null;
  statusCode?: TourStatusCode;
  startDate?: string;
  endDate?: string;
  days?: Day[] | null;
  studentTourEnrollments?: StudentTourEnrollment[] | null;
  createdAt?: string;
  updatedAt?: string;
}
export interface Day {
  id?: string;
  title?: string;
  comment?: string | null;
  summary?: string | null;
  text?: string | null;
  coverImgUrl?: string | null;
  statusCode?: TourStatusCode;
  activities?: Activity[] | null;
  createdAt?: string;
  updatedAt?: string;
}
export interface Activity {
  id?: string;
  title?: string;
  comment?: string | null;
  summary?: string | null;
  text?: string | null;
  location?: string | null;
  coverImgUrl?: string | null;
  statusCode?: TourStatusCode;
  startTime?: string;
  endTime?: string;
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
