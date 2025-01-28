'use client';

import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { useForm } from "react-hook-form";
import { GiPadlock } from "react-icons/gi";
import { RegisterSchema, registerSchema } from "@/lib/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerUser } from "@/app/actions/authActions";

type FieldName = keyof RegisterSchema;

export default function RegisterForm() {
  const {register, handleSubmit, setError, formState: {errors, isValid }} = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    mode: "onTouched"
  });

  const onSubmit = async (data: RegisterSchema) => {
    const result = await registerUser(data);
    
    if (result.status === 'success') {
      console.log("User registered successfully");
    } else {
      if (Array.isArray(result.error)) {
        result.error.forEach(error => {
          const fieldName = error.path[0].toString() as FieldName;
          setError(fieldName, {message: error.message})
        })  
      } else {
        setError('root.serverError', {message: result.error})
      }
    }
  }

  return (
    <Card className="w-2/3 mx-auto">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-secondary">
              <div className="flex flex-row gap- items-center">
              <GiPadlock size={30} />
              <h1 className="text-3xl font-semibold">Register</h1>
            </div>
            <p className="text-neutral-500">Welcome back to NextMatch</p>
          </div>
        </CardHeader>
        <CardBody>
          <Form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <Input
                 defaultValue=""
                 label="Name"
                 variant="bordered"
                 type="text"
                 {...register("name")}
                 isInvalid={!!errors.name}
                 errorMessage={errors.name?.message}
                />
              <Input
                 defaultValue=""
                 label="Email"
                 variant="bordered"
                 type="email"
                 {...register("email")}
                 isInvalid={!!errors.email}
                 errorMessage={errors.email?.message}
                />
              <Input
                 defaultValue=""
                 label="Password"
                 variant="bordered"
                 type="password"
                 {...register("password")}
                 isInvalid={!!errors.password}
                 errorMessage={errors.password?.message}
                />
              {errors.root?.serverError && (
                <p className='text-danger text-md'>
                  {errors.root.serverError.message}
                </p>
              )}
              <Button isDisabled={!isValid} fullWidth color="secondary" type="submit">
                Register
              </Button>
          </Form>
        </CardBody>
    </Card>
  );
}
