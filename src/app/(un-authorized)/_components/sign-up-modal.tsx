"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import IdIcon from "@/components/icon/id-icon";
import PasswordIcon from "@/components/icon/password-icon";
import AvatarIcon from "@/components/icon/avatar-icon";
import Form from "next/form";
import ClearIcon from "@/components/icon/clear-icon";
import onSignUp from "../../../lib/action/sign-up-action";
import { RoutePaths } from "@/lib/constant/route";
import { useFormStatus } from "react-dom";
import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/lib/hooks/use-toast";

export default function SignUpModal() {
  const router = useRouter();
  const [state, formAction] = useActionState(onSignUp, {
    message: null,
    isSuccess: false,
  });
  const { pending } = useFormStatus();
  const { toast } = useToast();

  useEffect(() => {
    console.log(`sign up request ${state.isSuccess ? "success" : "fail"}`);
    if (state.isSuccess) {
      toast({
        title: "success",
        description: "Sign Up Success",
        duration: 1500,
      });
      router.replace(RoutePaths.signIn);
    }
  }, [state.isSuccess]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative">
        <header className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">Sign Up</h2>
          <a href={RoutePaths.entry}>
            <ClearIcon />
          </a>
        </header>
        {state.message && (
          <div className="my-3 py-2 px-3 bg-rose-200 rounded-lg ">
            <p className="text-red-600 text-sm">{state.message}</p>
          </div>
        )}

        <Form action={formAction}>
          <ul className="flex flex-col gap-y-3">
            <li className="flex items-center gap-x-3">
              <label htmlFor="id" className="text-sm text-slate-700">
                <IdIcon />
              </label>
              <Input id="username" name="username" placeholder="username" />
            </li>
            <li className="flex items-center gap-x-3">
              <label htmlFor="password" className="text-sm text-slate-700">
                <PasswordIcon />
              </label>
              <Input
                id="password"
                name="password"
                required
                placeholder="password"
                type="password"
              />
            </li>
            <li className="flex items-center gap-x-3">
              <label
                htmlFor="password-confirm"
                className="text-sm text-slate-700"
              >
                <PasswordIcon />
              </label>
              <Input
                id="password-confirm"
                name="password-confirm"
                required
                placeholder="password-confirm"
                type="password"
              />
            </li>

            <li className="flex items-center gap-x-3">
              <label htmlFor="nickname" className="text-sm text-slate-700">
                <AvatarIcon />
              </label>
              <Input
                id="nickname"
                name="nickname"
                required
                placeholder="nickname"
              />
            </li>
          </ul>

          <div className="flex gap-x-3 justify-end mt-5">
            <Button disabled={pending} type="submit">
              Submit
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
