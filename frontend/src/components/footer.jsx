

export default function Footer() {
  return (
    <div className=" w-full py-16 bg-zinc-700 flex items-center justify-center text-white flex-col md:flex-row mt-6">
      <div className=" w-full max-w-xs pl-4 px-10 mb-auto order-last md:order-first mr-auto">
        <h1 className="text-3xl py-3 font-bold">Inner Pieces</h1>
        <p className="text-xs md:text-sm py-1">© 2028 by Inner Pieces.</p>
      </div>
      <div className="w-full pl-4 mb-auto mr-auto px-10 max-w-2xl">
        <h1 className="text-3xl py-3 font-bold">Contact</h1>
        <h2 className="text-xl py-2 font-semibold">Ask me anything</h2>
        <div className="flex w-full">
          <div className="flex flex-col w-full mr-2">
            <label htmlFor="" className="my-1 w-full">Full Name</label>
            <input type="text" className="w-full border-b-2 p-1 mb-4 bg-transparent outline-none hover:border-b-red-300"/>
          </div>
          <div className="flex flex-col w-full ml-2">
            <label htmlFor="" className="my-1 w-full">Email *</label>
            <input type="text" className=" w-full border-b-2 p-1 mb-4 bg-transparent outline-none hover:border-b-red-300" required/>
          </div>    
        </div>
        <div>
          <label htmlFor="" className="w-full my-1">Leave Us a Message...</label>
          <input type="text" className="w-full border-b-2 p-1 mb-4 bg-transparent outline-none hover:border-b-red-300"/>
        </div>
      </div>
    </div>
  )
}
