import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, signupUser } from "../redux/apis/authApi.js";
import { toast } from "sonner";

const Login = () => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const [loginInput, setLoginInput] = useState({});
  const [signupInput, setSignupInput] = useState({});
  const [isEmailLogin, setIsEmailLogin] = useState(true);

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target; // Destructure name and value from the input event
    if (type === "signup") {
      setSignupInput({ ...signupInput, [name]: value });
    } else {
      setLoginInput({ ...loginInput, [name]: value });
    }
  };
  // Validation logic
  const validateSignup = () => {
    const { username, email, password } = signupInput;
    if (!username || !email || !password) {
      toast.error("All fields are required for Signup!");
      return false;
    }
    return true;
  };

  const validateLogin = () => {
    const { email, username, password } = loginInput;
    if (isEmailLogin) {
      if (!email || !password) {
        toast.error("Email and Password are required!");
        return false;
      }
    } else {
      if (!username || !password) {
        toast.error("Username and Password are required!");
        return false;
      }
    }
    return true;
  };
  const handleFormSubmission = (type) => {
    const formData = type === "signup" ? signupInput : loginInput;
    if (type === "signup") {
      if (validateSignup()) {
        dispatch(signupUser(formData));
      }
    } else if (type === "login") {
      if (validateLogin()) {
        dispatch(loginUser(formData));
      }
    }
  };

  // console.log(signupInput, "Signup Input");
  // console.log(loginInput, "Login Input");

  return (
    <div className="flex items-center w-full justify-center mt-20">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account and click signup when you are done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  value={signupInput.username || ""}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  type="text"
                  placeholder="Enter your username here."
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  name="email"
                  value={signupInput.email || ""}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  type="email"
                  placeholder="Enter your email here."
                  required
                />
              </div>
              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  value={signupInput.password || ""}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  type="password"
                  placeholder="Enter your password here."
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleFormSubmission("signup")}>
                Signup
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>Login with your credentials.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="font-medium">
                  Login with: {isEmailLogin ? "Email" : "Username"}
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="toggle-login"
                    checked={isEmailLogin}
                    onCheckedChange={() => setIsEmailLogin(!isEmailLogin)}
                  />
                  <Label htmlFor="toggle-login">
                    {isEmailLogin ? "Username" : "Email"}
                  </Label>
                </div>
              </div>

              {isEmailLogin ? (
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    value={loginInput.email}
                    onChange={(e) => changeInputHandler(e, "login")}
                    type="email"
                    placeholder="Enter your email here."
                    required
                  />
                </div>
              ) : (
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    name="username"
                    value={loginInput.username}
                    onChange={(e) => changeInputHandler(e, "login")}
                    type="text"
                    placeholder="Enter your username here."
                    required
                  />
                </div>
              )}

              <div className="space-y-1">
                <Label htmlFor="password">Password</Label>
                <Input
                  name="password"
                  value={loginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  type="password"
                  placeholder="Enter your password here."
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleFormSubmission("login")}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Login;
