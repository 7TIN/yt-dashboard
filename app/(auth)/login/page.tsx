
// // (auth)/login/LoginForm.tsx
// return (
//     <main className="flex justify-center items-center min-h-screen">
//       <Card className="w-[380px]">
//         <CardHeader>
//           <CardTitle>Login</CardTitle>
//           <CardDescription>Login to your account</CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Form {...form}>
//             <form
//               onSubmit={form.handleSubmit(handleSubmit)}
//               className="flex flex-col gap-2"
//             >              
//               <Suspense fallback={<div>Loading Google Sign-in...</div>}>
//                 <GoogleSignin />
//               </Suspense>
//             </form>
//           </Form>
//         </CardContent>
//       </Card>
//     </main>
//   );


// // (auth)/login/SignupGoogle.tsx

// return (
//     <Button
//       type="button"
//       variant="outline"
//       onClick={signInWithGoogle}
//       disabled={isGoogleLoading}
//     >
//       {isGoogleLoading ? (
//         <Loader2 className="mr-2 size-4 animate-spin" />
//       ) : (
//         <Image
//           src="https://authjs.dev/img/providers/google.svg"
//           alt="Google logo"
//           width={20}
//           height={20}
//           className="mr-2"
//         />
//       )}{" "}
//       Sign in with Google
//     </Button>
//   );

// // (auth)/login/page.tsx
//   export default async function LoginPage() {
//   const supabase = await createClient();
//   const { data } = await supabase.auth.getUser();
//   if (data.user) {
//     redirect("/dashboard");
//   }

//   return (
//     <Suspense fallback={<div>Loading login form...</div>}>
//       <LoginForm />
//     </Suspense>
//   )
// }

import { redirect } from "next/navigation";
import { Suspense } from "react";
import LoginForm from "./LoginForm";
// import LoginForm from "./LoginForm";

export default async function LoginPage() {

    
  return (
    <Suspense fallback={<div>Loading login form...</div>}>
      <LoginForm />
    </Suspense>
  );
}
