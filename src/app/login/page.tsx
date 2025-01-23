"use client";

import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  /**
   * Handle form submission for credentials login
   * 处理凭证登录的表单提交
   */
  const handleSubmit = async () => {
    try {
      const result = await signIn("credentials", {
        username: "admin",
        password: "123456",
        redirect: false,
      });

      if (result?.error) {
        console.log(result.error);
      } else {
        router.push("/admin");
        router.refresh(); // Refresh server components to update session
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Button onClick={handleSubmit}>Login</Button>
    </div>
  );
}
