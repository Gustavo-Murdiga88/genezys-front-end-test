"use client";

import {
	createContext,
	type ReactNode,
	use,
	useCallback,
	useEffect,
	useMemo,
	useState,
} from "react";

import { usersCache } from "./cache-users";

interface IUsersProviderProps {
	children: ReactNode;
}

interface IUser {
	id: string;
	name: string;
	email: string;
	address: string;
	neighborhood: string;
	city: string;
	state: string;
	cep: string;
	password: string;
	number: string;
}
interface IUsersContextProps {
	users: IUser[];
	createUser: (user: IUser) => void;
	loading: boolean;
	findUserByEmail: (email: string) => IUser | undefined;
	getUsersPerPage: (page: number) => {
		users: IUser[];
		totalResults: number;
		totalPages: number;
		isLastPage: boolean;
	};
}

const UsersContext = createContext({} as IUsersContextProps);

export function UsersProvider({ children }: IUsersProviderProps) {
	const [users, setUsers] = useState<IUser[]>([]);

	const createUser = useCallback(
		(user: IUser) => {
			const currentUsers = [user, ...users];
			setUsers(currentUsers);
			localStorage.setItem("users", JSON.stringify(currentUsers));
		},
		[users],
	);

	const getUsersPerPage = useCallback(
		(page: number) => {
			const copy = [...users];
			const usersPerPage = copy.slice(page * 10, page * 10 + 10);

			return {
				users: usersPerPage,
				totalResults: users.length,
				isLastPage: usersPerPage.length < 10 || users.length === page * 10,
				totalPages: Math.ceil(users.length / 10),
			};
		},
		[users],
	);

	const findUserByEmail = useCallback(
		(email: string) => users.find((user) => user.email === email),
		[users],
	);

	const providerValue = useMemo(
		() => ({
			createUser,
			users,
			getUsersPerPage,
			findUserByEmail,
			loading: users.length === 0,
		}),
		[createUser, users, getUsersPerPage, findUserByEmail],
	);

	useEffect(() => {
		const storageUsers = localStorage.getItem("users");
		if (storageUsers) {
			const usersFromJSON = JSON.parse(storageUsers);
			setUsers(usersFromJSON);
		} else {
			setUsers(usersCache);
		}
	}, []);

	return (
		<UsersContext.Provider value={providerValue}>
			{children}
		</UsersContext.Provider>
	);
}

export function useUsers() {
	const userContext = use(UsersContext);

	if (!userContext) {
		throw new Error("useUsers must be used within an UsersProvider");
	}

	return userContext;
}
