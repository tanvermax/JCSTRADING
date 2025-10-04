import { useAllproductQuery } from "@/redux/features/product/product.api"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
export default function Allproduct() {

  const {data}= useAllproductQuery(undefined);
// console.log("data")
  console.log(data)
  return (
    <div>
       <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Slug</TableHead>
          <TableHead className="text-right">price</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.map((invoice:{title:string,_id:string,description:string,slug:string,price:string}) => (
          <TableRow key={invoice._id}>
            <TableCell className="font-medium">{invoice.title}</TableCell>
            <TableCell>{invoice.description}</TableCell>
            <TableCell>{invoice.slug}</TableCell>
            <TableCell className="text-right">{invoice.price}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    </div>
  )
}