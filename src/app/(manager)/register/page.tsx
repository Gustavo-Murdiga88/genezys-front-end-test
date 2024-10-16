import type { Metadata } from "next";

import { Header } from "../components/header";
import { FormUser } from "./components/form-user";

export const metadata: Metadata = {
	title: "Cadastros",
};
export default function Register() {
	return (
		<>
			<Header
				title="Cadastrar Usuário"
				subtitle="A seguir você poderá cadastrar usuários para ter acesso à sua
				organização."
			/>
			<div>
				<FormUser />
			</div>
		</>
	);
}
