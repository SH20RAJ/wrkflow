import { redirect } from "next/navigation";

export default function SignInPage() {
    // Redirect to the StackAuth handler
    redirect("/handler/sign-in");
}