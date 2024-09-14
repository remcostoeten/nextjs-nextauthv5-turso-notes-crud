"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { loginUser } from "./actions";
import LoginForm from "./_components/login-grid";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const [state, formAction] = useFormState(loginUser, null);

  useEffect(() => {
    if (state?.success) {
      toast.success("Login successful");
      router.push("/dashboard");
    } else if (state?.error) {
      toast.error(state.error);
    }
  }, [state, router]);

  return (
    <>
      <LoginForm />
    </>
  );
}

// "use client";

// import LoginGridWithProviders from "./_components/login-grid";

// export default function LoginPage() {

//   return (
//     <>
//       <LoginGridWithProviders mode={"login"} />
//     </>
//   );
// }
