import type { Metadata } from "next";

import { FormForgotPassword } from "./components/form-forgot-password";

export const metadata: Metadata = {
	title: "Esqueci a senha",
};
export default function ForgotPassword() {
	return <FormForgotPassword />;
}
