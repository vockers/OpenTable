import Header from "./components/Header";

export default function ReservePage() {
  return (
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        <Header />
        {/* FORM */}
        <div className="mt-10 flex flex-wrap justify-between w-[660px]">
          <input type="text" className="border rounded p-3 w-80 mb-4" placeholder="First name" />
          <input type="text" className="border rounded p-3 w-80 mb-4" placeholder="Last name" />
          <input type="text" className="border rounded p-3 w-80 mb-4" placeholder="Phone number" />
          <input type="text" className="border rounded p-3 w-80 mb-4" placeholder="Email" />
          <input type="text" className="border rounded p-3 w-80 mb-4" placeholder="Occasion (optional)" />
          <input type="text" className="border rounded p-3 w-80 mb-4" placeholder="Requets (optional)" />
          <button className="bg-red-600 w-full p-3 text-white font-bold rounded disabled:bg-gray-300">Complete
            reservation</button>
          <p className="mt-4 text-sm">By clicking "Complete reservation" Lorem, ipsum dolor sit amet consectetur
            adipisicing elit.</p>
        </div>
        {/* FORM END */}
      </div>
    </div>
  )
}