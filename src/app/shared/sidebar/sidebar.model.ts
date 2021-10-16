interface Mytype {
  name: string;
  link: string;
  icon: string;
}
export class Sidebar {
  name: string;
  pages: string;
  link: string;
  icon: string;
  children: Mytype[];
}

export const SIDEBAR_MENU_ITEMS = [
  {
    name: "Cash Management",
    pages: "pages1",
    link: "cash-management",
    icon: "icon-cashmanagement icon",
    children: [
      {
        name: "Cash Up",
        link: "/ROS/cash-management/cash-up",
        icon: "icon-cashup icon",
      },
      {
        name: "Deposit",
        link: "/ROS/cash-management/deposit",
        icon: "icon-deposit icon",
      },
      {
        name: "Reconciliation",
        link: "/ROS/cash-management/reconciliation",
        icon: "icon-reconciliation icon",
      },
      {
        name: "Reports",
        link: "/ROS/cash-management/report",
        icon: "icon-report icon",
      },
    ],
  },
  {
    name: "Employees",
    pages: "pages2",
    link: "",
    icon: "icon-employee icon",
    children: [
      {
        name: "Employees",
        link: "/ROS/emp-management/employees",
        icon: "icon-team icon",
      },
      {
        name: "Shift Calendar",
        link: "/ROS/emp-management/shift-calendar",
        icon: "icon-payroll icon",
      },
      {
        name: "Attendance",
        link: "/ROS/emp-management/attendance",
        icon: "icon-rota icon",
      },
      {
        name: "Requests",
        link: "/ROS/emp-management/requests",
        icon: "icon-requests icon",
      },
      {
        name: "Leaves",
        link: "/ROS/emp-management/leaves",
        icon: "icon-leaves icon",
      },
      {
        name: "Payroll",
        link: "/ROS/emp-management/payroll",
        icon: "icon-report icon",
      },
      {
        name: "Profile",
        link: "/ROS/emp-management/profile",
        icon: "icon-profile icon",
      },
    ],
  },
  {
    name: "Inventory",
    pages: "pages3",
    link: "",
    icon: "icon-stock icon",
    children: [
      {
        name: "Products",
        link: "/products",
        icon: "icon-products icon",
      },
      {
        name: "Suppliers",
        link: "/suppliers",
        icon: "icon-suppliers icon",
      },
      {
        name: "Purchase Order",
        link: "/purchaseorder",
        icon: "icon-purchase icon",
      },
      {
        name: "Invoices",
        link: "/invoices",
        icon: "icon-invoices icon",
      },
      {
        name: "Reports",
        link: "/report",
        icon: "icon-reports icon",
      },
    ],
  },
];
