export type TableProps = {
    headers: Array<string>,
    data: Array<any>,
    itemsPerPage: number,
    resetPagination?: number,
    showEditColumn?: boolean,
    keys: Array<string>,
    deleteRowFunction?: (id: number) => void
    desactivateRowFunction?: (id: number) => void
    doubleClickRowFunction?: (id: number) => void
}