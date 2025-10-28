// Dummy services for kiosk demo

export type Service = {
  id: string;
  name: string;
  branchId: string;
};

export const dummyServices: Service[] = [
  { id: "1", name: "Customer Support", branchId: "123" },
  { id: "2", name: "Account Opening", branchId: "123" },
  { id: "3", name: "Loan Inquiry", branchId: "123" },
  { id: "4", name: "Card Services", branchId: "123" },
];
