import type { Metadata } from "next";

import { SigninForm } from "./components/form-signin";

export const metadata: Metadata = {
	title: "Entrar",
};

export default function Signin() {
	return <SigninForm />;
}
