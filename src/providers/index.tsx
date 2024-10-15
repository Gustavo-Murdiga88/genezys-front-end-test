import type { ReactNode } from "react";

import { UsersProvider } from "@/store/users";

export function Providers({ children }: { children: ReactNode }) {
	return <UsersProvider>{children}</UsersProvider>;
}
