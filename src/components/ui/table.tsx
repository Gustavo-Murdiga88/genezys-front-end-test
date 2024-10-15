import { type ComponentProps, type ReactNode } from "react";

import { cn } from "@/lib/utils";

type IITableProps = ComponentProps<"table"> & {
	children?: ReactNode;
	ref?: HTMLTableElement;
};

export function Table({ className, children, ref, ...props }: IITableProps) {
	return (
		<table
			{...props}
			ref={ref}
			className={cn(
				"w-full text-center text-sm font-semibold border-separate border-spacing-0 border rounded-sm",
				className,
			)}
		>
			{children}
		</table>
	);
}
Table.displayName = "Table";

type IITableRowProps = ComponentProps<"tr"> & {
	children?: ReactNode;
	ref?: HTMLTableRowElement;
};
export function TableRow({
	className,
	children,
	ref,
	...props
}: IITableRowProps) {
	return (
		<tr
			{...props}
			ref={ref}
			className={cn("[&+&>td]:border-t [&:hover>td]:bg-muted", className)}
		>
			{children}
		</tr>
	);
}
TableRow.displayName = "TableRow";

type IITableCellProps = ComponentProps<"td"> & {
	children?: ReactNode;
	ref?: HTMLTableCellElement;
};
export function TableCell({
	className,
	children,
	ref,
	...props
}: IITableCellProps) {
	return (
		<td {...props} ref={ref} className={cn("p-4", className)}>
			{children}
		</td>
	);
}
TableCell.displayName = "TableCell";

type IITableHeaderProps = ComponentProps<"thead"> & {
	children?: ReactNode;
	ref?: HTMLTableCellElement;
};
export function TableHeader({
	className,
	children,
	ref,
	...props
}: IITableHeaderProps) {
	return (
		<thead {...props} ref={ref} className={cn(className)}>
			{children}
		</thead>
	);
}

TableHeader.displayName = "TableHeader";

type IITableHeaderCellProps = ComponentProps<"th"> & {
	children?: ReactNode;
	ref?: HTMLTableCellElement;
};
export function TableHeaderCell({
	className,
	children,
	ref,
	...props
}: IITableHeaderCellProps) {
	return (
		<th {...props} ref={ref} className={cn("p-4 border-b", className)}>
			{children}
		</th>
	);
}
TableHeaderCell.displayName = "TableHeaderCell";

type IITableBodyProps = ComponentProps<"tbody"> & {
	children?: ReactNode;
	ref?: HTMLTableCellElement;
};
export function TableBody({
	className,
	children,
	ref,
	...props
}: IITableBodyProps) {
	return (
		<tbody {...props} ref={ref} className={cn(className)}>
			{children}
		</tbody>
	);
}

TableBody.displayName = "TableBody";

type IITableFooterProps = ComponentProps<"tfoot"> & {
	children?: ReactNode;
	ref?: HTMLTableCellElement;
};
export function TableFooter({
	className,
	children,
	ref,
	...props
}: IITableFooterProps) {
	return (
		<tfoot {...props} ref={ref} className={cn(className)}>
			{children}
		</tfoot>
	);
}

TableFooter.displayName = "TableFooter";
