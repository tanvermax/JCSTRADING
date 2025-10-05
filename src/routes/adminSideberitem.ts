import AddProduct from "@/components/layout/AdminLayoute/AddProduct/AddProduct";
import Allproduct from "@/components/layout/AdminLayoute/Allproduct";
import type { ISidebarItem } from "@/types";

 export const adminSidebarItem:ISidebarItem[] = [
    {
      title: "Admin Dashboard",
      url: "#",
      items: [
        {
          title: "All Product",
          url: "/admin/users",
          component:Allproduct
        },
        {
          title: "Add Product",
          url: "/admin/add-product",
          component:AddProduct

        },
      ],
    },
    
  ]