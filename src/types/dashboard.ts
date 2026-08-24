// several typescript interface
// bagin gishudin ogogdlin butets

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: string;
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
