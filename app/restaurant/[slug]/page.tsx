import RestaurantNavbar from "./components/RestaurantNavbar";
import Header from "./components/Header";
import { PrismaClient, Review } from "@prisma/client";
import Images from "./components/Images";
import Reviews from "./components/Reviews";
import { calculateReviewRatingAverage } from "@/utils/calculateReviewRatingAverage";
import Stars from "@/app/components/Stars";
import { notFound } from "next/navigation";

const prisma = new PrismaClient()

interface Restaurant {
  id: number;
  name: string;
  images: string[];
  description: string;
  slug: string;
  reviews: Review[]
}

const fetchRestaurantBySlug = async (slug: string): Promise<Restaurant> => {
  const restaurant = await prisma.restaurant.findUnique({
    where: {
      slug
    },
    select: {
      id: true,
      name: true,
      images: true,
      description: true,
      slug: true,
      reviews: true
    }
  })
  if (!restaurant) {
    notFound()
  }
  return restaurant
}

export default async function RestaurantPage({ params }: { params: { slug: string } }) {
  const restaurant = await fetchRestaurantBySlug(params.slug)
  return (
    <>
      <div className="bg-white w-[70%] rounded p-3 shadow">
        <RestaurantNavbar slug={restaurant.slug} />
        {/* TITLE */}
        <div className="mt-4 border-b pb-6">
          <h1 className="font-bold text-6xl">{restaurant.name}</h1>
        </div>
        {/* TITLE */}
        {/* RATINGS */}
        <div className="flex items-end">
          <div className="ratings mt-2 flex items-center">
            <Stars reviews={restaurant.reviews} />
            <p className="text-reg ml-3">{calculateReviewRatingAverage(restaurant.reviews).toFixed(1)}</p>
          </div>
          <div className="text-reg ml-4">{restaurant.reviews.length} Review{restaurant.reviews.length === 1 ? "" : "s"}</div>
        </div>
        {/* RATINGS */}
        {/* DESCRIPTION */}
        <div className="mt-4">
          <p className="text-lg font-light">
            {restaurant.description}
          </p>
        </div>
        {/* DESCRIPTION */}
        {/* IMAGES */}
        <Images images={restaurant.images} />
        {/* IMAGES */}
        <Reviews reviews={restaurant.reviews} />
      </div>
      {/* RESERVATION CARD PORTION */}
      <div className="w-[27%] relative text-reg">
        <div className="fixed w-[15%] bg-white rounded p-3 shadow">
          <div className="text-center border-b pb-2 font-bold">
            <h4 className="mr-7 text-lg">
              Make a reservation
            </h4>
          </div>
          <div className="my-3 flex flex-col">
            <label htmlFor="">
              Party size
            </label>
            <select name="" className="py-3 border-b font-light" id="">
              <option value="">1 person</option>
              <option value="">2 person</option>
            </select>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-[48%]">
              <label htmlFor="">
                Date
              </label>
              <input type="text" className="py-3 border-b font-light w-28" />
            </div>
            <div className="flex flex-col w-[48%]">
              <label htmlFor="">
                Time
              </label>
              <select name="" id="" className="py-3 border-b font-light">
                <option value="">7:30 AM</option>
                <option value="">9:30 AM</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <button className="bg-red-600 rounded w-full px-4 text-white font-bold h-16">Find a time</button>
          </div>
        </div>
      </div>
    </>
  )
}