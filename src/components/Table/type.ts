import { MouseEventHandler } from "react";

export type TableProps = {
    headers: Array<string>,
    data: Array<any>,
    itemsPerPage: number,
    resetPagination?: number,
    showEditColumn?: boolean,
    keys: Array<string>,
    customActions?: CustomActions[],
    deleteRowFunction?: (id: number) => void
    desactivateRowFunction?: (id: number) => void
    doubleClickRowFunction?: (id: number) => void
    attachment?:boolean
}
interface CustomActions {
    children: React.ReactNode;
    onClick: (id: number) => void
}