"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHeader,
	TableHeaderCell,
	TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/store/users";

export function TableUsers() {
	const searchParams = useSearchParams();
	const router = useRouter();

	const { getUsersPerPage, loading } = useUsers();

	const page = Number(searchParams.get("page")) || 1;

	const { isLastPage, users, totalResults, totalPages } = getUsersPerPage(
		page - 1,
	);

	if (loading) {
		return (
			<div className="h-[calc(70svh)] w-full animate-pulse rounded-md bg-muted" />
		);
	}

	return (
		<>
			<div className="overflow-auto pb-2">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHeaderCell>Nome</TableHeaderCell>
							<TableHeaderCell>Email</TableHeaderCell>
							<TableHeaderCell>Rua</TableHeaderCell>
							<TableHeaderCell>Número</TableHeaderCell>
							<TableHeaderCell>Bairro</TableHeaderCell>
							<TableHeaderCell>CEP</TableHeaderCell>
							<TableHeaderCell>Cidade</TableHeaderCell>
							<TableHeaderCell>Estado</TableHeaderCell>
						</TableRow>
					</TableHeader>
					<TableBody>
						{users.map(
							({
								id,
								name,
								email,
								address,
								cep,
								city,
								state,
								neighborhood,
								number,
							}) => (
								<TableRow key={id}>
									<TableCell>
										<div className="truncate">{name}</div>
									</TableCell>
									<TableCell title={email}>
										<div className="max-w-[13.75rem] truncate">{email}</div>
									</TableCell>
									<TableCell title={address}>
										<div className="max-w-[10.625rem] truncate">{address}</div>
									</TableCell>
									<TableCell title={number}>
										<div className="max-w-[10.625rem] truncate">{number}</div>
									</TableCell>
									<TableCell title={neighborhood}>
										<div className="max-w-[10.625rem] truncate">
											{neighborhood}
										</div>
									</TableCell>
									<TableCell>
										<div className="truncate">{cep}</div>
									</TableCell>
									<TableCell title={city}>
										<div className="max-w-[10.625rem] truncate">{city}</div>
									</TableCell>
									<TableCell>
										<div className="truncate">{state}</div>
									</TableCell>
								</TableRow>
							),
						)}
					</TableBody>
				</Table>
			</div>
			<div className="mb-5 mt-2 flex items-center justify-between rounded-sm border p-4">
				<div className="text-left text-sm">
					<span className="text-muted-foreground">Total de páginas: </span>
					<strong className="mr-3">{totalPages}</strong>
					<strong className="text-muted-foreground">Total registros:</strong>
					<span className="font-semibold text-primary">
						{" "}
						{totalResults} usuários
					</span>
				</div>
				<div className="flex items-center justify-end gap-5">
					<Button
						className="hover:bg-background"
						size="icon"
						variant="outline"
						disabled={page === 1}
						onClick={() => {
							router.push(`/home?page=${page - 1}`);
						}}
					>
						<ChevronLeft />
					</Button>
					<strong>{page}</strong>
					<Button
						disabled={isLastPage}
						className="hover:bg-background"
						size="icon"
						variant="outline"
						onClick={() => {
							router.push(`/home?page=${page + 1}`);
						}}
					>
						<ChevronRight />
					</Button>
				</div>
			</div>
		</>
	);
}
