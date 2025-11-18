import { App } from "@/types/app";

export const initialApps: App[] = [
  {
    id: "1",
    name: "Restaurant POS",
    description: "Streamline restaurant operations with ease.",
    category: "POS",
    icon: "fa-cash-register",
    featured: true,
    badge: "Popular",
    overview: "Our Restaurant POS system is designed to simplify operations for restaurants of all sizes. From order taking to payment processing and reporting, everything is streamlined for maximum efficiency.",
    features: [
      "Table Management - Easily manage table assignments and status",
      "Order Tracking - Track orders from kitchen to table in real-time",
      "Payment Processing - Accept multiple payment methods securely",
      "Inventory Management - Track ingredient usage and stock levels",
      "Reporting & Analytics - Gain insights into sales and performance",
      "Staff Management - Manage staff permissions and performance"
    ]
  },
  {
    id: "2",
    name: "Hotel Booking",
    description: "Manage hotel reservations and guest services.",
    category: "Booking",
    icon: "fa-calendar-check",
    featured: true,
    badge: "New",
    overview: "Complete hotel management system for bookings, guest services, and operations.",
    features: [
      "Room Management",
      "Guest Check-in/out",
      "Reservation System",
      "Billing & Invoicing",
      "Guest History",
      "Housekeeping Management"
    ]
  },
  {
    id: "3",
    name: "Channel Manager",
    description: "Sync availability across multiple booking platforms.",
    category: "Hospitality",
    icon: "fa-chart-line",
    featured: true,
    overview: "Manage your property listings across all major booking platforms from one dashboard.",
    features: [
      "Multi-channel Sync",
      "Rate Management",
      "Availability Control",
      "Booking Calendar",
      "Performance Analytics",
      "Automated Updates"
    ]
  },
  {
    id: "4",
    name: "Retail POS",
    description: "Complete point of sale for retail stores.",
    category: "Retail",
    icon: "fa-store",
    featured: true,
    overview: "Modern POS system designed specifically for retail environments.",
    features: [
      "Quick Checkout",
      "Inventory Tracking",
      "Customer Management",
      "Sales Reports",
      "Multi-store Support",
      "Barcode Scanning"
    ]
  },
  {
    id: "5",
    name: "Service Booking",
    description: "Book appointments for service-based businesses.",
    category: "Booking",
    icon: "fa-concierge-bell",
    overview: "Appointment scheduling made simple for service businesses.",
    features: [
      "Online Booking",
      "Calendar Management",
      "Customer Reminders",
      "Service Packages",
      "Staff Scheduling",
      "Payment Integration"
    ]
  },
  {
    id: "6",
    name: "Inventory Manager",
    description: "Track and manage product inventory in real-time.",
    category: "Retail",
    icon: "fa-tasks",
    overview: "Comprehensive inventory management solution for businesses of all sizes.",
    features: [
      "Stock Tracking",
      "Low Stock Alerts",
      "Supplier Management",
      "Purchase Orders",
      "Barcode Support",
      "Multi-location Tracking"
    ]
  },
  {
    id: "7",
    name: "Tablet POS",
    description: "Mobile point of sale for tableside ordering.",
    category: "POS",
    icon: "fa-tablet-alt",
    overview: "Take orders and process payments right at the table with our mobile POS.",
    features: [
      "Tableside Ordering",
      "Mobile Payments",
      "Order Management",
      "Kitchen Integration",
      "Split Bills",
      "Tip Management"
    ]
  },
  {
    id: "8",
    name: "Staff Manager",
    description: "Schedule and manage staff efficiently.",
    category: "Tools",
    icon: "fa-users",
    overview: "Complete staff management and scheduling solution.",
    features: [
      "Shift Scheduling",
      "Time Tracking",
      "Performance Reviews",
      "Payroll Integration",
      "Leave Management",
      "Team Communication"
    ]
  }
];
