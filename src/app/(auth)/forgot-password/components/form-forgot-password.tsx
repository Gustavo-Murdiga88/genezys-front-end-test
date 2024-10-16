"use client";

import { setCookie } from "cookies-next";
import { Loader2Icon, Send } from "lucide-react";
import { Link, useTransitionRouter } from "next-view-transitions";
import { type FormEvent, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUsers } from "@/store/users";

export function FormForgotPassword() {
	const router = useTransitionRouter();
	const [isPending, setTransition] = useTransition();

	const { findUserByEmail } = useUsers();

	function handleSubmit(eventForm: FormEvent<HTMLFormElement>) {
		eventForm.preventDefault();

		setTransition(async () => {
			const form = new FormData(eventForm.currentTarget);

			const email = form.get("email") as string;

			await new Promise((resolve) => {
				setTimeout(() => {
					resolve(null);
				}, 1500);
			});

			const user = findUserByEmail(email);
			if (!user) {
				toast.error("Email inválido");
				return;
			}

			toast.success(
				`Olá, ${user.name}, encontramos sua sua senha, clique no botão ao lado para prosseguir`,
				{
					action: {
						label: "Continuar",
						onClick: () => {
							setCookie("user", JSON.stringify(user), {
								path: "/",
								maxAge: 60 * 60 * 24 * 30, // 30 days,
							});
							router.push("/home");
						},
					},
				},
			);
		});
	}
	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center justify-center p-4"
		>
			<fieldset className="flex w-[min(100%,21.875rem)] flex-col gap-8 ">
				<h1>
					Não se preocupe, vamos te ajudar a recuperar sua senha, para que você
					possa continuar com a gente nesta jornada!
				</h1>
				<div>
					<Label>Email</Label>
					<Input type="email" name="email" placeholder="john.joe@example.com" />
				</div>
				<Button type="submit">
					Recuperar a senha
					{!isPending && <Send className="ml-4 size-4" />}
					{isPending && <Loader2Icon className="ml-2 size-4 animate-spin" />}
				</Button>
				<footer className="flex items-center">
					<strong className="text-sm font-semibold text-muted-foreground">
						Já possui um cadastro?
					</strong>
					<Button asChild variant="link" className="text-xs">
						<Link href="/signin" className="text-primary">
							Clique aqui!
						</Link>
					</Button>
				</footer>
			</fieldset>
		</form>
	);
}
