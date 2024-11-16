import { prisma } from "./prisma";

const ITEMS_PER_PAGE = 5;

export const getContacts = async (query: string, currentPage: number) => {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  try {
    // await new Promise ((resolve)=> setTimeout(resolve, 300)) //delay skeleton
    const contact = await prisma.contact.findMany({
      skip: offset,
      take: ITEMS_PER_PAGE,
      where: {
        OR:[
          {
            Name:{ 
              contains: query,
              mode: "insensitive"
            }
          },
          {
           Phone:{ 
              contains: query,
              mode: "insensitive"
            }
          }
        ]
      }
    });
    return contact;
  } catch {
    throw new Error("Failed to Fetch Data"); // Gantilah `error` menjadi `Error`
  }
};

export const getContactById = async (Id: string) => {
  try {
    const contact = await prisma.contact.findUnique({where: {Id}});
    return contact;
  } catch {
    throw new Error("Failed to Fetch Data"); // Gantilah `error` menjadi `Error`
  }
};

export const getContactPages = async (query: string) => {
  try {
    const contacts = await prisma.contact.count({
      where: {
        OR: [
          {
            Name: {
              contains: query,
              mode: "insensitive",
            },
          },
          {
            Phone: {
              contains: query,
              mode: "insensitive",
            },
          },
        ],
      },
    });
    const totalPages = Math.ceil(Number(contacts) / ITEMS_PER_PAGE);
    return totalPages;
  } catch {
    throw new Error("Failed to fetch contact data");
  }
};