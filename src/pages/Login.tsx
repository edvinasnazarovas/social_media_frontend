import { useState } from "react";
import LoginForm from "../ui/auth/LoginForm";
import RegisterForm from "../ui/auth/RegisterForm";
import { UnstyledButton } from "@mantine/core";

export default function LoginPage() {
    const [isLogin, setIsLogin] = useState(true);
    const handleChange = () => {
        setIsLogin(!isLogin);
    }

    return (
        isLogin ?
            <div style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                flexDirection: "column"
            }}>
                <LoginForm />
                <UnstyledButton onClick={handleChange}>Don't have an account yet?</UnstyledButton>
            </div>
            :
            <div style={{
                display: "flex", justifyContent: "center", alignItems: "center",
                flexDirection: "column"
            }}>
                <RegisterForm setIsLogin={setIsLogin} />
                <UnstyledButton onClick={handleChange}>Already have an account?</UnstyledButton>
            </div>
    );
}