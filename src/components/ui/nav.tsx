"use client";

import { LogOut, Menu } from "lucide-react";
import { usePathname } from "next/navigation";
import { Link } from "next-view-transitions";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { Button } from "./button";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "./sheet";

export function Navigation({ children }: { children: ReactNode }) {
	return (
		<nav>
			<Sheet>
				<SheetTrigger asChild>
					<Button size="icon" variant="outline">
						<Menu className="size-4'" />
					</Button>
				</SheetTrigger>
				<SheetContent side="left" className="flex flex-col gap-0">
					<SheetHeader>
						<SheetTitle className="mt-5 border-b pb-2">
							Sistema Genezys!
						</SheetTitle>
					</SheetHeader>
					<ul className="mt-4 flex flex-col items-stretch gap-3">{children}</ul>
					<SheetFooter className="flex-1 flex-col items-end justify-end">
						<div className="w-full border-t pt-2">
							<Button asChild variant="ghost" className="w-full justify-start">
								<Link
									href="/singout"
									className="flex items-center justify-between"
								>
									Sair do sistema
									<LogOut className="ml-4 size-4" />
								</Link>
							</Button>
						</div>
					</SheetFooter>
				</SheetContent>
			</Sheet>
		</nav>
	);
}

Navigation.displayName = "Navigation";

export function NavigationLink({
	children,
	href,
	className,
}: {
	children: ReactNode;
	href: string;
	className?: string;
}) {
	const path = usePathname();

	const isActive = path === href;

	return (
		<li className="w-full border-b pb-2">
			<Button
				asChild
				variant="ghost"
				className={cn(
					isActive && "bg-primary text-secondary",
					"w-full justify-between",
					className,
				)}
			>
				<Link href={href}>{children}</Link>
			</Button>
		</li>
	);
}

NavigationLink.displayName = "NavigationLink";
