import { Button, Center, Fieldset, Group, TextInput } from "@mantine/core";
import { useEffect, useState } from "react";
import { z } from "zod";
import { Register } from "../../utils/auth";
import { toast } from "react-toastify";

// Define the schema for your form data using Zod
const formSchema = z.object({
    username: z.string().min(1, "Username is required"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    email: z.string().email("Invalid email address"),
    name: z.string().min(1, "Name is required"),
    last_name: z.string().min(1, "Last Name is required"),
});

export default function RegisterForm(props: any) {
    const [formData, setFormData] = useState({
        username: "", password: "", email: "",
        name: "", last_name: ""
    });
    const [formErrors, setFormErrors] = useState({});

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const result = formSchema.safeParse(formData);
        if (!result.success) {
            const errors = result.error.formErrors.fieldErrors;
            setFormErrors(errors);
            return;
        }
        Register(formData)
            .then((res) => {
                if (res.ok) {
                    toast("Registration successful.", { type: "success" });
                    props.setIsLogin(false);
                } else {
                    toast("Failed to register.", { type: "error" })
                }
            })
        console.log("Form data is valid:", formData);
    };

    useEffect(() => {
    }, [formData])

    return (
        <Center style={{ width: "100vw" }}>
            <form onSubmit={handleSubmit}>
                <Fieldset>
                    <TextInput label="Username" name="username" value={formData.username}
                        onChange={handleChange} error={formErrors.username?.[0]} />
                    <TextInput type="password" label="Password" name="password"
                        onChange={handleChange} value={formData.password} error={formErrors.password?.[0]} />
                    <TextInput label="Email" name="email" value={formData.email}
                        onChange={handleChange} error={formErrors.email?.[0]} />
                    <TextInput label="Name" name="name" value={formData.name}
                        onChange={handleChange} error={formErrors.name?.[0]} />
                    <TextInput label="Last Name" name="last_name" value={formData.last_name}
                        onChange={handleChange} error={formErrors.last_name?.[0]} />
                    <Group justify="flex-end" mt="md">
                        <Button type="submit">Register</Button>
                    </Group>
                </Fieldset>
            </form>
        </Center>
    );
}
