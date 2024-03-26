import RestaurantNavbar from "../components/RestaurantNavbar";
import MenuCard from "../components/MenuCard";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

const fetchRestaurantMenu = async (slug: string) => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      items: true
    }
  })

  if (!restaurant)
    throw new Error()

  return restaurant.items
}

export default async function MenuPage({ params }: { params: { slug: string } }) {
  const menu = await fetchRestaurantMenu(params.slug)
  return (
    <div className="bg-white w-[100%] rounded p-3 shadow">
      <RestaurantNavbar slug={params.slug} />
      {/* MENU */}
      <main className="bg-white mt-5">
        <div>
          <div className="mt-4 pb-1 mb-1">
            <h1 className="font-bold text-4xl">
              Menu
            </h1>
          </div>
          <div className="flex flex-wrap justify-between">
            {menu.map(item => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </main>
      {/* MENU */}
    </div>
  )
}