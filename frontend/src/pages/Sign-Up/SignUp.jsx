import { SignUp } from "@clerk/clerk-react";

function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <SignUp 
        signInUrl="/sign-in"
      />
    </div>
  );
}

export default SignUpPage;
