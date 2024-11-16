"use server"

import { z } from "zod"
import { prisma } from "../lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"



const ContactSchema = z.object({
  name: z.string().min(5, { message: "Name must be at least 5 characters long." }),
  phone: z.string().min(11, { message: "Phone number must be at least 11 digits long." })
});

export const saveContact = async (prevState: unknown ,formData: FormData) => {
  const validatedFields = ContactSchema.safeParse( Object.fromEntries(formData.entries()))
  if(!validatedFields.success){
    return {
      Error: validatedFields.error.flatten().fieldErrors
    }
  }
  try{
    await prisma.contact.create({
      data: {
        Name: validatedFields.data.name,
        Phone: validatedFields.data.phone
      }
    })
  }
  catch (error) {
    console.error("Error creating contact:", error);
    return { message: "Failed to create contact" };
  }
  revalidatePath("/contacts")
  redirect("/contacts")

}


export const updateContact = async (Id:string ,prevState: unknown ,formData: FormData) => {
  const validatedFields = ContactSchema.safeParse( Object.fromEntries(formData.entries()))
  
  if(!validatedFields.success){
    return {
      Error: validatedFields.error.flatten().fieldErrors
    }
  }

  try{
    await prisma.contact.update({
      data: {
        Name: validatedFields.data.name,
        Phone: validatedFields.data.phone
      },
      where: {Id}
    })
  }
  catch (error) {
    console.error("Error Updating contact:", error);
    return { message: "Failed to Update contact" };
  }
  revalidatePath("/contacts")
  redirect("/contacts")

}


export const deleteContact = async (Id:string ) => {
  
  try{
    await prisma.contact.delete({
      where: {Id}
    })
  }
  catch (error) {
    console.error("Error delete contact:", error);
    return { message: "Failed to delete contact" };
  }
  revalidatePath("/contacts")

}