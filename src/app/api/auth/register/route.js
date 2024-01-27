import User from "@/models/User";
import connect from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request) => {
  const { name, email, password } = await request.json();

  await connect(); //connect to mongodb

  const hashedPassword = await bcrypt.hash(password, 5); //THIS IS IMPORTANT SO THAT YOUR ACTUAL PASSWORD DOES NOT SHOW IN THE DATABASE FOR SECURITY PURPOSES

  const newUser = new User({
    name,
    email,
    password: hashedPassword,
  });

  try {
    await newUser.save(); //saving the new user in mongoDb by using the save method
    return new NextResponse("User has been created", {
      status: 201,
    });
  } catch (err) {
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};  