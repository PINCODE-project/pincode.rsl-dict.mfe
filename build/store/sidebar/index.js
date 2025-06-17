import { apiDomain } from "@/store/api";
export const $isOpenSidebar = apiDomain.store(false);
export const setIsOpenSidebar = apiDomain.event();
$isOpenSidebar.on(setIsOpenSidebar, (_, value) => value);
