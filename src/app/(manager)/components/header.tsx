import { UserPlus, Users } from "lucide-react";

import { Navigation, NavigationLink } from "@/components/ui/nav";

export function Header({
	title,
	subtitle,
}: {
	title: string;
	subtitle?: string;
}) {
	return (
		<header className="flex items-center justify-between gap-4 border-b px-4 pb-2">
			<div>
				<h1 className="text-lg font-semibold text-primary">{title}</h1>
				{subtitle && (
					<p className="text-pretty text-xs text-muted-foreground">
						{subtitle}
					</p>
				)}
			</div>
			<Navigation>
				<NavigationLink href="/register">
					Cadastrar novo usuário
					<UserPlus className="size-4" />
				</NavigationLink>
				<NavigationLink href="/home">
					Usuários
					<Users className="size-4" />
				</NavigationLink>
			</Navigation>
		</header>
	);
}
