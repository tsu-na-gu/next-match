import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Form } from "@heroui/form";
import { Input } from "@heroui/input";
import { GiPadlock } from "react-icons/gi";

export default function LofinForm() {
  
  return (
    <Card className="w-2/3 mx-auto">
        <CardHeader className="flex flex-col items-center justify-center">
          <div className="flex flex-col gap-2 items-center text-secondary">
              <div className="flex flex-row gap- items-center">
              <GiPadlock size={30} />
              <h1 className="text-3xl font-semibold">Login</h1>
            </div>
            <p className="text-neutral-500">Welcome back to NextMatch</p>
          </div>
        </CardHeader>
        <CardBody>
          <Form className="space-y-4" action="">
              <Input
                 label="Email"
                 variant="bordered"
                 type="email"
                />
              <Input
                 label="Password"
                 variant="bordered"
                 type="password"
                />
              <Button fullWidth color="secondary" type="submit">
                Login
              </Button>
          </Form>
        </CardBody>
    </Card>
  );
}
