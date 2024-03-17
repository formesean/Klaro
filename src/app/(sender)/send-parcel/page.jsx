"use client";
import { redirect, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react" 
// import {zodResolver} from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form";
// import{z} from "zod"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";






export default function SendParcel() {
  const { data: session } = useSession();
  // const router = useRouter(); 

  if (!session || session.user.role !== "sender") {
    return redirect("/");
  };



  const handleSubmit = () => {}; //this only runs when form is valid | for forms only. idk dli ni siya mo work for now so scratch 


  return (
    <>
    {/* <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>THIS IS THE SENDER PAGE</h1>

    </div>  */}
    
    <div className=" ">
        <Card className="m-12 ">

          <Card className="m-8"> {/*first section*/ }

            <CardHeader /*id="inline-block"*/>
              Recipient Information
            </CardHeader>

            <div className="flex  py-4 mx-3 max-md:flex-col ">
              <div className="w-screen mx-3 max-md:w-full max-md:pe-3">
                <Label htmlFor="recipientName">
                  name:
                </Label>
                <Input type="text" />
              </div>

              <div className="mx-3  w-screen max-md:w-full max-md:pe-3">
                <Label htmlFor="recipientEmail">
                  email:
                </Label>
                <Input type="text" />
              </div>

              <div className="mx-3  w-screen max-md:w-full max-md:pe-3">
                <Label htmlFor="recipientAddress">
                  address:
                </Label>
                <Input type="text"/>
              </div>
            </div>
          </Card>

          <Card className="m-8"> {/*second section*/ }

            <CardHeader>
              Parcel Contents
            </CardHeader>
      
            <div className="flex justify-between py-4 mx-3 max-md:flex-col">
              <div className="mx-3  w-screen max-md:w-full max-md:pe-3">
                <Label htmlFor="item">
                item:
                </Label>
                <Input type="text"/>
              </div>
              
              <div className="mx-3  w-screen max-md:w-full max-md:pe-3">
                <Label htmlFor="quantity">
                  quantity:
                </Label>
                <Input type="number"/>
              </div>

              <div className="mx-3  w-screen max-md:w-full max-md:pe-3">
                <Label htmlFor="price">
                  price:
                </Label>
                <Input type="number"/>
              </div>

              {/* <div className="w-15 max-sm:w-40 max-w-md pt-6 max-md:mx-3"> 
                <Button type="submit" value="Submit" className="">
                  Add Item
                </Button>
              </div> */}
            </div>

            <div className="flex justify-end mr-6 mb-3 max-md:mr-3"> 
                <Button type="submit" value="Submit" className="">
                  Add Item
                </Button>
            </div>

            <div className="mx-3">
              <Table className>
                {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                <TableHeader>

                  <TableRow>
                    <TableHead>
                      Item
                    </TableHead>

                    <TableHead>
                      quantity
                    </TableHead>

                    <TableHead className="text-right">
                      price
                    </TableHead>
                  </TableRow>

                </TableHeader>

                <TableBody>
                  <TableRow>
                    <TableCell>data1</TableCell>
                    <TableCell>data2</TableCell>
                    <TableCell className="text-right">data3</TableCell>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => (null)}
                        >
                          Edit content
                        </DropdownMenuItem>

                        <DropdownMenuItem
                          onClick={() => (null)}
                        >
                          Delete content
                        </DropdownMenuItem>
                        
                        
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </Card>

          <div className="flex justify-end mr-8 mb-3 "> 
                <Button type="submit" value="Submit">
                  Process Order
                </Button>
            </div>
        </Card>
    </div>
    </>
  );
}

//BUHATA NI UGMA EEEYYY
//USING FORM COMPONENT. COMMENTED OUT CAUSE ERROR OCCURS. 
//const onSubmit = () => {}; //this only runs when form is valid | for forms only. idk dli ni siya mo work for now so scratch 

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),

  //   defaultValues:{
  //   senderEmail: ""
  //   }
  
  // });

// const formSchema = z.object({
//   //Recipient Information: name, email, address
//   senderName: z.string(),
//   senderEmail: z.string().email(),
//   address: z.string()
// })

// <Form {... form}>
//         <form onSubmit={form.handleSubmit(onSubmit)}>
//           <FormField control={form.control}
//           name="senderEmail"
//           render={({field}) =>{
//             return <FormItem>
//             <FormLabel>
//               Email Address
//             </FormLabel>
            
//             <FormControl> 
//               <input 
//                 placeholder="Email Address"
//                 type="email"
//                 {...field}
//               />
//             </FormControl>
//             </FormItem>
//           }}
           

          
//         />
//         </form>
//       </Form>