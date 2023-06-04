import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../components/Button";
import Field from "../components/Field";
import Input from "../components/Input";
import Page from "../components/Page";
import { useSignIn } from "../hooks/user";


const SignUpPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {signInError, signInLoading, signIn} = useSignIn()

  const handleLogin = async (e) => {
    e.preventDefault();
     const valid=  await signIn(email, password)
     if(valid){
       router.push("/");
     }
  }; 

  return (
    <Page title="Sign In">
      <form onSubmit={handleLogin}>
        <Field label="Email">
          <Input
            type="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
            className="border"
          />
        </Field>
        <Field label="Password">
          <Input
            type="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        {signInError && <p className="text-red-700">Invalid Credentials</p>}
        {signInLoading ? (
          <p>Loading...</p>
        ) : (
          <Button type="submit ">Sign In</Button>
        )}
      </form>
    </Page>
  );
};

export default SignUpPage;
