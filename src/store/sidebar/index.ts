import { apiDomain } from "@/store/api";

export const $isOpenSidebar = apiDomain.store<boolean>(false)
export const setIsOpenSidebar = apiDomain.event<boolean>()

$isOpenSidebar.on(setIsOpenSidebar, (_, value) => value);