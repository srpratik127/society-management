export const sidebardata = [
    {
      id: 1,
      title: "Dashboard",
      icon: "/assets/i1.svg",
      link: "/",
    },
    {
      id: 2,
      title: "Resident Management",
      icon: "/assets/i2.svg",
      link: "/",
    },
    {
      id: 3,
      title: "Financial Management",
      icon: "/assets/i1.svg",
      link: "/",
      dropdown: [
        { id: 31, title: "Transactions", link: "/transactions" },
        { id: 32, title: "Reports", link: "/financial-reports" },
        { id: 33, title: "Reports", link: "/financial-qw" },
      ]
    },
    {
      id: 4,
      title: "Facility Management",
      icon: "/assets/i2.svg",
      link: "/",
      
    },
    {
      id: 5,
      title: "Complaint Tracking",
      icon: "/assets/i1.svg",
      link: "/",
      dropdown: [
        { id: 51, title: "Log Complaint", link: "/log-complaint" },
        { id: 52, title: "Track Complaints", link: "/track-complaints" },
      ]
    },
    {
      id: 6,
      title: "Security Management",
      icon: "/assets/i2.svg",
      link: "/",
      dropdown: [
        { id: 61, title: "Visitor Logs", link: "/visitor-logs" },
        { id: 62, title: "Access Control", link: "/access-control" },
      ]
    },
    {
      id: 7,
      title: "Security Guard",
      icon: "/assets/i1.svg",
      link: "/",
    },
    {
      id: 8,
      title: "Announcement",
      icon: "/assets/i2.svg",
      link: "/",
    }
  ];
  