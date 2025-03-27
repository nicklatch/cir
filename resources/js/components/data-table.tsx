import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "./ui/table";
import { Button } from "./ui/button";
import { ReactNode, useState } from "react";
import { Input } from "./ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "./ui/dropdown-menu";
import { ChevronDown } from "lucide-react";

export type ColumnMeta = { id: string; name: string };

interface DataTableProps<TData, TValue> {
    columns: Array<ColumnDef<TData, TValue>>
    data: Array<TData>
    headerRowChildren?: ReactNode
    resultsPerPage?: number
}

export function DataTable<TData, TValue>({
    columns,
    data,
    headerRowChildren,
    resultsPerPage

}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnSearchFilter, setColumnSearchFilter] = useState<string>("first_name");
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: resultsPerPage ?? 15 });

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onPaginationChange: setPagination,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    });

    return (
        <div>
            <div className="flex flex-start p-2 md:flex-row flex-col md:gap-2">
                <div className="flex gap-2">
                    <div className="flex border rounded-md">
                        <Select
                            onValueChange={(val) => setColumnSearchFilter(val)}
                        >
                            <SelectTrigger className="w-[140px] p-2 text-nowrap capitalize border-none">
                                <SelectValue placeholder="Select a Column" />
                            </SelectTrigger>
                            <SelectContent className="w-[140px]">
                                {table
                                    .getAllColumns()
                                    .filter((c) => c.getCanFilter())
                                    .map((col) => {
                                        return (<SelectItem key={col.id} value={col.id} className="text-nowrap capitalize">
                                            {col.id.toString().replace("_", " ")}
                                        </SelectItem>
                                        )
                                    })}
                            </SelectContent>
                        </Select>
                        <Input
                            placeholder={columnSearchFilter
                                .replace(/^./, (c) => c.toUpperCase())
                                .replace(/_(.)/, (_, c) => ` ${c.toUpperCase()}`)}
                            value={(table.getColumn(columnSearchFilter)?.getFilterValue() as string) ?? ""}
                            onChange={(e) =>
                                table.getColumn(columnSearchFilter)?.setFilterValue(e.target.value)
                            }
                            className="max-w-[250px] border-none"
                            disabled={columnSearchFilter == ""}
                            aria-label="Search"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto h-full">
                                Visible Columns<ChevronDown />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) => column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id.toString().replace("_", " ")}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                {headerRowChildren}
            </div>
            <div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex justify-between items-baseline pb-4">
                <div className="flex items-center justify-start space-x-2 pl-2 pt-4">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
                <div className="flex-1 text-sm text-center text-muted-foreground">
                    {table.getFilteredSelectedRowModel().rows.length} of{" "}
                    {table.getFilteredRowModel().rows.length} row(s) selected.
                </div>
            </div>
        </div >
    )
}
