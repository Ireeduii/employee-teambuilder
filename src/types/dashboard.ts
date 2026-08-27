// several typescript interface
// bagin gishudin ogogdlin butets

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string | null;
  department: string | null;
  phone: string | null;
  bio: string | null;
  github: string | null;
  location: string | null;
  skills: string[];
  status: "Active" | "On Leave" | "Busy";
  avatarUrl: string;
}

// statistic card-in ogogdlin butets

export interface StatMetric {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
}

// backend api-s butsah standart format
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
