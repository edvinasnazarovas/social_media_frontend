import { Button, Center, Fieldset, Group, TextInput } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import { CheckAuth, Login } from "../../utils/auth";
import { toast } from "react-toastify";
import { UserContext } from "../../App";

export default function LoginForm() {
    const [formData, setFormData] = useState<{ username: string, password: string }>({ username: "", password: "" });
    const [errors, setErrors] = useState({ username: null, password: null, login: null });
    const { user, setUser } = useContext(UserContext);

    const handleChange = (event: any) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    }

    const handleLogin = (event) => {
        event.preventDefault();
        Login(formData)
            .then(() => {
                CheckAuth()
                    .then((user) => {
                        setUser(user);
                        if (!user) {
                            toast("Login failed.", { type: "error" });
                        } else {
                            toast("Logged in.", { type: "success" });
                        }
                    })
            });
    }

    return (
        <>
            <Center style={{ width: "100vw" }}>
                <form onSubmit={handleLogin}>
                    <Fieldset legend="Login">
                        <TextInput label="Username" onChange={handleChange} name="username" />
                        <TextInput label="Password" onChange={handleChange} name="password" type="password" />
                        <Group justify="flex-end" mt="md">
                            <Button type="submit">Login</Button>
                        </Group>
                    </Fieldset>
                </form>
            </Center>
        </>
    );
}