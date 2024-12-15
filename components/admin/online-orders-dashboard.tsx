import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const OnlineOrdersDqashboard = () => {
  return (
    <div className="w-full h-full">
      <h1 className="text-lg font-bold mb-5">Online Orders</h1>
      <Table>
        {/* {orders?.length === 0 && (<TableCaption>No orders found.</TableCaption>)} */}
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Tel No</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Product Name</TableHead>
            <TableHead>Qty</TableHead>
            <TableHead className="text-right">Total Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="text-sm">
          <TableRow>
            <TableCell>Chamod Rashmika</TableCell>
            <TableCell>0772684933</TableCell>
            <TableCell>10.00am</TableCell>
            <TableCell>Dotted Bun</TableCell>
            <TableCell>2</TableCell>
            <TableCell className="text-right">Rs. 100.00</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default OnlineOrdersDqashboard;
