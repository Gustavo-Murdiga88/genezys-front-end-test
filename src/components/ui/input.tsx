import { Eye, EyeOff } from "lucide-react";
import * as React from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";

export interface IInputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, IInputProps>(
	({ className, type, ...props }, ref) => (
		<input
			type={type}
			className={cn(
				"flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
				className,
			)}
			ref={ref}
			{...props}
		/>
	),
);
Input.displayName = "Input";

type IInputPasswordProps = React.ComponentProps<"input"> & {
	ref?: React.ComponentRef<"input">;
};
function InputPassword({
	ref,
	className,
	type = "password",
	...props
}: IInputPasswordProps) {
	const [show, setShow] = React.useState(false);

	return (
		<div
			className={cn(
				"flex h-9 rounded-md border border-input px-3 py-1 has-[input:focus-visible]:ring-1 has-[input:focus-visible]:ring-ring disabled:opacity-50",
				className,
			)}
		>
			<input
				type={show ? "text" : type}
				className="mr-2 flex w-full bg-transparent text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
				ref={ref}
				{...props}
			/>
			<Button
				type="button"
				size="icon"
				className="h-auto p-0"
				variant="ghost"
				onClick={() => setShow(!show)}
			>
				{show && <Eye className="size-4" />}
				{!show && <EyeOff className="size-4" />}
			</Button>
		</div>
	);
}

export { Input, InputPassword };
