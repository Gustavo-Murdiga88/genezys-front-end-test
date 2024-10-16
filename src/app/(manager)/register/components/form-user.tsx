"use client";

import { CornerDownLeft, User2 } from "lucide-react";
import { Link } from "next-view-transitions";
import { type FormEvent, useRef } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input, InputPassword } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAddressByCep } from "@/http/get-address-by-cep";
import { useUsers } from "@/store/users";

interface IFormProps {
	cep: string;
	confirmPassword: string;
	email: string;
	name: string;
	neighborhood: string;
	password: string;
	street: string;
	town: string;
	uf: string;
	number: string;
}

export function FormUser() {
	const { createUser } = useUsers();

	const form = useRef<HTMLFormElement>(null);

	async function getAddress(cep: string) {
		const response = await getAddressByCep(cep);

		if (!response.success) {
			toast.info("CEP não encontrado, por favor verifique o CEP informado");
			return;
		}

		if (form.current && typeof document !== "undefined") {
			const { bairro, cep, uf, localidade, logradouro } = response.data;
			const city = document.getElementById("town") as HTMLInputElement;
			const cepInput = document.getElementById("cep") as HTMLInputElement;
			const street = document.getElementById("street") as HTMLInputElement;
			const neighborhood = document.getElementById(
				"neighborhood",
			) as HTMLInputElement;
			const ufInput = document.getElementById("uf") as HTMLInputElement;

			city.value = localidade;
			cepInput.value = cep;
			street.value = logradouro;
			neighborhood.value = bairro;
			ufInput.value = uf;
		}
	}

	function handleSubmit(eventForm: FormEvent<HTMLFormElement>) {
		eventForm.preventDefault();
		const formEvent = new FormData(eventForm.currentTarget);

		if (!form.current) {
			return;
		}

		let success = true;

		for (const input of form.current) {
			const inputIsInvalid =
				"value" in input &&
				!input.value &&
				!["submit", "button"].includes(input.getAttribute("type") || "");

			if (inputIsInvalid) {
				(input as HTMLInputElement).dataset.invalid = "true";
				success = false;
				break;
			}

			(input as HTMLInputElement).dataset.invalid = "false";
		}

		if (!success) {
			toast.info("Por favor, preencha todos os campos corretamente");
			return;
		}

		const data = Object.fromEntries(
			formEvent.entries(),
		) as unknown as IFormProps;

		const password = document.getElementById("password") as HTMLInputElement;
		const confirmPassword = document.getElementById(
			"confirmPassword",
		) as HTMLInputElement;

		if (data.password !== data.confirmPassword) {
			toast.error("As senhas informadas não conferem");
			password.dataset.invalid = "true";
			confirmPassword.dataset.invalid = "true";
			return;
		}

		if (data.password === data.confirmPassword) {
			password.dataset.invalid = "false";
			confirmPassword.dataset.invalid = "false";
		}

		createUser({
			address: data.street,
			cep: data.cep,
			city: data.town,
			email: data.email,
			id: new Date().getTime().toString(),
			name: data.name,
			neighborhood: data.neighborhood,
			state: data.uf,
			password: data.password,
			number: data.number,
		});

		toast.success("Usuário criado com sucesso");
		eventForm.currentTarget.reset();
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="grid grid-cols-12 gap-5"
			ref={form}
		>
			<div className="col-span-12 md:col-span-6 [&:has(input[data-invalid='true'])_label]:text-red-500">
				<Label htmlFor="name">Nome</Label>
				<Input
					data-invalid={false}
					className="data-[invalid=true]:border-red-500"
					id="name"
					name="name"
					placeholder="John Doe"
					autoCapitalize="words"
				/>
			</div>

			<div className="col-span-12 md:col-span-6 [&:has(input[data-invalid='true'])_label]:text-red-500">
				<Label htmlFor="email">Email</Label>
				<Input
					data-invalid={false}
					className="data-[invalid=true]:border-red-500"
					id="email"
					name="email"
					type="email"
					placeholder="john.joe@example.com"
				/>
			</div>

			<div className="col-span-12 md:col-span-6 [&:has(input[data-invalid='true'])_label]:text-red-500">
				<Label htmlFor="password">Senha</Label>
				<InputPassword
					data-invalid={false}
					className="has-[input[data-invalid='true']]:border-red-500"
					id="password"
					minLength={8}
					maxLength={8}
					name="password"
					placeholder="********"
				/>
			</div>

			<div className="col-span-12 md:col-span-6 [&:has(input[data-invalid='true'])_label]:text-red-500">
				<Label htmlFor="confirmPassword">Confirmar senha</Label>
				<InputPassword
					data-invalid={false}
					className="has-[input[data-invalid='true']]:border-red-500"
					id="confirmPassword"
					name="confirmPassword"
					minLength={8}
					maxLength={8}
					placeholder="********"
				/>
			</div>

			<fieldset className="col-span-12 mt-4 grid grid-cols-12 gap-4">
				<legend className="mb-4 w-full border-b pb-2">
					Cadastro de endereço
				</legend>

				<div className="col-span-12 md:col-span-6 [&:has(input[data-invalid='true'])_label]:text-red-500">
					<Label htmlFor="cep">CEP</Label>
					<Input
						data-invalid={false}
						className="data-[invalid=true]:border-red-500"
						id="cep"
						name="cep"
						minLength={8}
						maxLength={9}
						placeholder="99999-999"
						onChange={(event) => {
							const currentValue = event.currentTarget.value.replaceAll(
								/\D/g,
								"",
							);

							if (currentValue.length === 8) {
								getAddress(currentValue);
							}
						}}
					/>
				</div>

				<div className="col-span-12 md:col-span-6 [&:has(input[data-invalid='true'])_label]:text-red-500">
					<Label htmlFor="street">Rua</Label>
					<Input
						data-invalid={false}
						className="data-[invalid=true]:border-red-500"
						id="street"
						name="street"
						readOnly
						placeholder="Rua das flores"
					/>
				</div>

				<div className="col-span-12 md:col-span-6 [&:has(input[data-invalid='true'])_label]:text-red-500">
					<Label htmlFor="neighborhood">Número</Label>
					<Input
						data-invalid={false}
						className="data-[invalid=true]:border-red-500"
						id="number"
						name="number"
						placeholder="A-190"
					/>
				</div>

				<div className="col-span-12 md:col-span-6 [&:has(input[data-invalid='true'])_label]:text-red-500">
					<Label htmlFor="neighborhood">Bairro</Label>
					<Input
						data-invalid={false}
						className="data-[invalid=true]:border-red-500"
						id="neighborhood"
						name="neighborhood"
						placeholder="Jardim das flores"
					/>
				</div>

				<div className="col-span-12 md:col-span-6 [&:has(input[data-invalid='true'])_label]:text-red-500">
					<Label htmlFor="town">Cidade</Label>
					<Input
						data-invalid={false}
						className="data-[invalid=true]:border-red-500"
						id="town"
						name="town"
						readOnly
						placeholder="Florianópolis"
					/>
				</div>
				<div className="col-span-12 md:col-span-6 [&:has(input[data-invalid='true'])_label]:text-red-500">
					<Label htmlFor="uf">UF</Label>
					<Input
						className="data-[invalid=true]:border-red-500"
						id="uf"
						name="uf"
						max={2}
						readOnly
						placeholder="SC"
					/>
				</div>
			</fieldset>

			<footer className="col-span-12 mt-4 flex flex-wrap justify-stretch gap-5 pb-5">
				<Button type="submit" size="sm" className="w-full md:w-min">
					Cadastrar novo usuário
					<User2 className="ml-4 size-4" />
				</Button>
				<Button
					type="button"
					size="sm"
					variant="ghost"
					asChild
					className="w-full md:w-min"
				>
					<Link href="/home">
						Voltar para lista de usuários
						<CornerDownLeft className="ml-4 size-4" />
					</Link>
				</Button>
			</footer>
		</form>
	);
}
