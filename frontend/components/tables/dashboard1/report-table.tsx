import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ReportTable({ data }: any) {
  return (
    <>
      <Table className="border">
        {/* <TableCaption>A list of your recent data.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className=" text-center font-bold"> </TableHead>
            <TableHead colSpan={2} className="font-bold text-center">
              NL
            </TableHead>
            <TableHead colSpan={2} className="font-bold text-center">
              BE
            </TableHead>
            <TableHead colSpan={2} className="font-bold text-center">
              DE
            </TableHead>
            <TableHead colSpan={2} className="font-bold text-center">
              Sum
            </TableHead>
            <TableHead colSpan={2} className="font-bold text-center">
              All
            </TableHead>
          </TableRow>
          <TableRow>
            <TableHead className="font-bold text-center">Year</TableHead>
            <TableHead className="font-bold text-center">B</TableHead>
            <TableHead className="font-bold text-center">ΔB</TableHead>
            <TableHead className="font-bold text-center">B</TableHead>
            <TableHead className="font-bold text-center">ΔB</TableHead>
            <TableHead className="font-bold text-center">B</TableHead>
            <TableHead className="font-bold text-center">ΔB</TableHead>
            <TableHead className="font-bold text-center">B</TableHead>
            <TableHead className="font-bold text-center">ΔB</TableHead>
            <TableHead className="font-bold text-center">B</TableHead>
            <TableHead className="font-bold text-center">ΔB</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row: any) => (
            <TableRow key={row.invoice}>
              <TableCell className="text-right">{row.invoice}</TableCell>
              <TableCell className="text-right">{row.invoice}</TableCell>
              <TableCell className="text-right">{row.totalAmount}</TableCell>
              <TableCell className="text-right">{row.totalAmount}</TableCell>
              <TableCell className="text-right">{row.totalAmount}</TableCell>
              <TableCell className="text-right">{row.totalAmount}</TableCell>
              <TableCell className="text-right">{row.totalAmount}</TableCell>
              <TableCell className="text-right">{row.totalAmount}</TableCell>
              <TableCell className="text-right">{row.totalAmount}</TableCell>
              <TableCell className="text-right">{row.totalAmount}</TableCell>
              <TableCell className="text-right">{row.totalAmount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell className="text-center" colSpan={2}>
              Total
            </TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}

export default ReportTable;
