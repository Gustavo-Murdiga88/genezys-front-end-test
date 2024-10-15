import { UserPlus } from "lucide-react";
import { Link } from "next-view-transitions";

import { Button } from "@/components/ui/button";

import { Header } from "../components/header";
import { TableUsers } from "./components/table-users";

export default function Register() {
	return (
		<>
			<Header
				title="Usuários"
				subtitle="Aqui você poderá ver o usuários cadastrados na sua organização."
			/>
			<div>
				<div className="mb-5 flex flex-wrap items-center justify-between">
					<h2 className="text-pretty p-4 text-muted-foreground">
						Resumo de usuários que sua organização possui
					</h2>
					<Button asChild className="ml-auto w-full text-xs md:w-max" size="sm">
						<Link href="/register">
							Cadastrar novos usuários
							<UserPlus className="ml-4 size-4" />
						</Link>
					</Button>
				</div>

				<TableUsers />
			</div>
		</>
	);
}
