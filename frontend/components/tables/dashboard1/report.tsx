"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { User } from "@/constants/data";

import { ReportFilter } from "./report-filter";
import ReportTable from "./report-table";
interface ProductsClientProps {
  data: User[];
}
export const statuses = [
  {
    value: "all-settlements",
    label: "All settlements",
  },
  {
    value: "base",
    label: "Base",
  },
  {
    value: "mw",
    label: "MW",
  },
  {
    value: "book-year",
    label: "Book year",
  },
];
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];
export const Report: React.FC<ProductsClientProps> = ({
  downloadPermissoin,
}) => {
  return (
    <>
      <div className="flex items-start justify-between">
        <Heading title="Report" />
      </div>
      <Separator />
      <ReportFilter
        title="Status"
        options={statuses}
        downloadPermissoin={downloadPermissoin}
      />
      <h1 className="font-bold">Yearly</h1>
      <ReportTable data={invoices} />
    </>
  );
};
