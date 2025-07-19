import { redirect } from "next/navigation";

export default function SignUpPage() {
    // Redirect to the StackAuth handler
    redirect("/handler/sign-up");
}