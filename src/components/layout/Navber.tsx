import Logo from "@/assets/icons/logo"
// import NotificationMenu from "@/components/navbar-components/notification-menu"
import UserMenu from "@/components/navbar-components/user-menu"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ModeToggle } from "./ModeToggler"

import { authApi, useLogoutMutation, useUserInfoQuery } from "@/redux/features/auth/auth.api"
import { useAppDispatch } from "@/redux/hook"
import { Link, useLocation } from "react-router"
import { Input } from "../ui/input"
import { ArrowDown, Heart, ShoppingCartIcon } from "lucide-react"

// Navigation links array to be used in both desktop and mobile menus
// const navigationLinks = [
//   { href: "/", label: "Home" },
//   { href: "/about", label: "About" },
//   // { href: "/", label: "Pricing" },
//   // { href: "#", label: "About" },
// ]
import {
  Home,
  ShoppingBag,
  Tag,
  Store,
  Facebook,
  MapPin,
  Users,
  HelpCircle,
} from "lucide-react";

// Add a new 'icon' property to each object in the array
const navigationLinks = [
  { href: "/", label: "Home", active: true, icon: Home },
  { href: "/shop", label: "Shop", icon: ShoppingBag },
  { href: "/offers", label: "Offers", icon: Tag },
  { href: "/brands", label: "Brands", icon: Store },
  { href: "/admin/add-product", label: "Facebook", icon: Facebook },
  { href: "/ordertrack", label: "Order Tracking", icon: MapPin },
  { href: "/about", label: "About Us", icon: Users },
  { href: "/help", label: "Help", icon: HelpCircle },
];


export default function Navber() {
  const { data } = useUserInfoQuery(undefined);
  const [logout] = useLogoutMutation();
  const dispatch = useAppDispatch();
   const location = useLocation();

  console.log(data?.data?.email);

  const handlelogout = async () => {
    await logout(undefined);
    dispatch(authApi.util.resetApiState());

  }
  // if (location.pathname.includes("admin") || location.pathname.includes("user")) {
  //   return null;
    
  // }
  return (
    <header className=" container mx-auto  px-4 md:px-6">
      <div className="flex h-16 items-center justify-between gap-4">
        {/* Left side */}
        <div className="flex items-center gap-2">
          {/* Mobile menu trigger */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                className="group size-8 md:hidden"
                variant="ghost"
                size="icon"
              >
                <svg
                  className="pointer-events-none"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 12L20 12"
                    className="origin-center -translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-x-0 group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[315deg]"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.8)] group-aria-expanded:rotate-45"
                  />
                  <path
                    d="M4 12H20"
                    className="origin-center translate-y-[7px] transition-all duration-300 ease-[cubic-bezier(.5,.85,.25,1.1)] group-aria-expanded:translate-y-0 group-aria-expanded:rotate-[135deg]"
                  />
                </svg>
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start" className="w-36 p-1 md:hidden">
              <NavigationMenu className="max-w-none *:w-full">
                <NavigationMenuList className="flex-col items-start gap-0 md:gap-2">
                  {navigationLinks.map((link, index) => (
                    <NavigationMenuItem key={index} className="w-full ">
                      <NavigationMenuLink asChild href={link.href} className="py-1.5 ">
                        <Link to={link.href}>{link.label}</Link>

                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </PopoverContent>
          </Popover>
          {/* Main nav */}
          <div className="flex items-center gap-6">
            <a href="#" className="text-primary   hover:text-primary/90">
              <Logo />
            </a>
         
          </div>
        </div>
        <div className="w-2xl max-w-md hidden md:block">
          <Input type="text" placeholder="Search..." />
        </div>
        {/* Right side */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Heart className="hidden md:block" />
            <ShoppingCartIcon className="text-[#FF781A]" />
            <ModeToggle />
            {/* Info menu */}
            {
              data?.data?.email && (<>
                <UserMenu />
                <Button asChild className="text-sm">
                  <Link onClick={handlelogout} to="/">Logout</Link>
                </Button></>)

            }
            {
              !data?.data?.email && <Button asChild className="text-sm">
                <Link to="/login">Login</Link>
              </Button>
            }
            {/* <InfoMenu /> */}
            {/* Notification */}
            {/* <NotificationMenu /> */}
          </div>
          {/* User menu */}


        </div>
      </div>
      <div>
        <div className=" container mx-auto  py-2 max-md:hidden flex justify-around" >
          {/* Navigation menu */}
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navigationLinks.map((link, index) => {
                // Determine if the link is active by comparing the current pathname
                const isActive = location.pathname === link.href;

                return (
                  <NavigationMenuItem key={index}>
                    <NavigationMenuLink
                      // Pass the dynamic isActive state here
                      active={isActive}
                      asChild
                      className={`text-muted-foreground hover:text-primary py-1.5 font-medium data-[active]:text-primary`}
                    >
                      <Link to={link.href}>
                        <span className="flex gap-3 text-base items-center">
                          {link.icon && <link.icon size={16} />}
                          {link.label}
                        </span>
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                   );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <Button>Category <ArrowDown/> </Button>
        </div>
      </div>
    </header>
  )
}
