import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();


async function main() {
    try {
        console.log("Start seeding data base");
        const users_seeded = await prisma.user.create({
            data: {
                email: "sonfacknelsonmandela+admin@gmail.com",
                passwordString: await hash("Loading@123", 12),
                isSuperUser: true,
                name: "Sonfack Nelson Mandela"
            }
        })
        console.log(users_seeded)
        console.log("Seeding finished");
    } catch (error) {
        console.log({ error })
    }
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (error) => {
        console.log(error);
        await prisma.$disconnect();
        process.exit(1)
    })