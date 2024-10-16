"use client";

import { setCookie } from "cookies-next";
import { Loader2Icon, LogIn } from "lucide-react";
import { Link, useTransitionRouter } from "next-view-transitions";
import { type FormEvent, useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input, InputPassword } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUsers } from "@/store/users";

export default function Signin() {
	const router = useTransitionRouter();
	const { findUserByEmail } = useUsers();

	const [isPending, setTransition] = useTransition();

	function goToHome() {
		router.push("/home");
	}

	function handleSubmit(eventForm: FormEvent<HTMLFormElement>) {
		eventForm.preventDefault();

		setTransition(async () => {
			const form = new FormData(eventForm.currentTarget);

			const email = form.get("email") as string;
			const password = form.get("password") as string;

			const user = findUserByEmail(email);
			if (!user) {
				toast.error("Email ou senha inválidos");
				return;
			}

			if (user?.password !== password) {
				toast.error("Email ou senha inválidos");
				return;
			}

			setCookie("user", JSON.stringify(user), {
				maxAge: 60 * 60 * 24 * 30, // 30 days
				path: "/",
			});
			toast.success(`Olá, ${user.name}, seja bem vindo ao sistema da Genezys!`);

			await new Promise((resolve) => {
				setTimeout(() => {
					goToHome();
					resolve(null);
				}, 1500);
			});
		});
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col items-center justify-center p-4"
		>
			<fieldset className="flex w-[min(100%,21.875rem)] flex-col gap-4">
				<h1>
					Ei! Que bom que voltou! Faça o login para desfrutar do melhor que a
					Genezys pode propor!
				</h1>
				<div>
					<Label>Email</Label>
					<Input type="email" name="email" placeholder="john_joe@example.com" />
				</div>
				<div>
					<Label>Senha</Label>
					<InputPassword
						type="password"
						name="password"
						placeholder="Digite sua senha"
					/>
				</div>
				<Button type="submit" className="mt-6">
					Entrar
					{!isPending && <LogIn className="ml-4 size-4" />}
					{isPending && <Loader2Icon className="ml-4 size-4 animate-spin" />}
				</Button>
				<footer className="flex items-center">
					<strong className="text-sm font-semibold text-muted-foreground">
						Esqueceu sua senha?
					</strong>
					<Button asChild variant="link" className="text-xs">
						<Link href="/forgot-password" className="text-primary">
							Clique aqui
						</Link>
					</Button>
				</footer>
			</fieldset>
		</form>
	);
}
