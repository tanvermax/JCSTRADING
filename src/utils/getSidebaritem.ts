import { userSidebarItem } from './../routes/userSIdebarItem';
import { role } from "@/constants/role";
import { adminSidebarItem } from "@/routes/adminSideberitem";
import type { TRole } from "@/types";

export const getSidebarItems = (userRole: TRole) => {

    switch (userRole) {
        case role.superAdmin:
        console.log(userRole);

            return [...adminSidebarItem]

        case role.admin:
            return [...adminSidebarItem]
            case role.user:
                return [...userSidebarItem]
        default:
            return [];
    }
}