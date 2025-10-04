import Booking from "@/pages/User/Booking";
import type { ISidebarItem } from "@/types";

 export const userSidebarItem:ISidebarItem[] = [
    {
      title: "User Dashboard",
      url: "#",
      items: [
        {
          title: "Bookins",
          url: "/user/booking",
          component:Booking
        },
        
      ],
    },
    
  ]