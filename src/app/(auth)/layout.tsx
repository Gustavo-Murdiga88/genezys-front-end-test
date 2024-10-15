import { Atom } from "lucide-react";
import type { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
	return (
		<main className="grid h-svh grid-cols-1 md:grid-cols-[minmax(30%,0.7fr)_minmax(50%,1fr)]">
			{children}
			<div className="relative m-4 hidden items-center justify-center rounded-md border bg-zinc-700/20 md:flex">
				<div className="absolute left-1/2 top-1/2 size-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-900/60 blur-[7.5rem]" />
				<div className="w-[min(100%, 80%)] absolute flex flex-col items-center justify-center p-4">
					<p className="mb-10 text-balance text-center text-2xl font-bold delay-100 animate-in fade-in-0 slide-in-from-bottom-10 fill-mode-backwards">
						Olá, Bem vindo à Genezys!{" "}
						<Atom className="mb-1 ml-4 inline-block size-6 animate-[spin_2s_linear_infinite]" />
					</p>
					<p className="mx-10 w-[70%] text-balance text-center text-4xl font-bold delay-150 animate-in fade-in-0 slide-in-from-bottom-10 fill-mode-backwards">
						Redefinindo o mercado de fundos
					</p>
					<p className="mx-auto mt-5 w-[70%] text-center text-lg font-bold delay-200 animate-in fade-in-0 slide-in-from-bottom-10 fill-mode-backwards">
						Somos a melhor infraestrutura global para fundos de investimento com
						interoperabilidade, privacidade, automatização, e baixo custo.
					</p>
				</div>
			</div>
		</main>
	);
}
