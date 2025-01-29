import { SignIn } from "@clerk/clerk-react";

function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <SignIn 
        signUpUrl="/sign-up" 
      />
    </div>
  );
}

export default SignInPage;
