'use server';

import { prisma } from "@/lib/prisma";
import { RegisterSchema, registerSchema } from "@/lib/registerSchema";
import { ActionResult } from "@/types";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function registerUser(data: RegisterSchema):Promise<ActionResult<User>> {
  try {
    const validated = registerSchema.safeParse(data);

    if (!validated.success) {
      return {status: 'error', error: validated.error.issues}
    }

    const {name, email, password} = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10);

    const exitingUser = await prisma.user.findUnique({where: {email}});

    if (exitingUser) {
      return {status: 'error', error: "same email already used"};
    }

    const user = await prisma.user.create({  
      data: {
        name,
        email,
        passwordHash: hashedPassword
      }
    }); 

    return {status: 'success', data: user};

  } catch (error) {
    console.log(error);
    return {status: 'error', error: "Something went wrong"};
  }
}