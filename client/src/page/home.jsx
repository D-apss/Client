export default function Home() {
  return (
    <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <h2 className="text-4xl tracking-widest text-white text-center uppercase font-bold">
        <span className="block">Choose your Hero</span>
      </h2>
      <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        <div className="group">
          <div className="relative">
            <div className="w-full">
              <img src="https://img.mobilelegends.com/group1/M00/00/B2/Cq2IxmAKtDOAe9QQAAIoQFvuZwA933.jpg"
                className="w-full h-full object-center object-cover opacity-70 group-hover:opacity-100 rounded-md" />
              <div className="absolute bottom-0 px-2 py-4 flex flex-col bg-gradient-to-t from-black w-full rounded-md">
                <p className="text-xl text-white uppercase inline-block align-start text-left pl-2 font-bold">Paquito</p>
                <p className="text-md text-white inline-block align-start text-left pl-2">Fighter</p>
              </div>
            </div>
          </div>
          <div className="flex justify-center items-center h-16">
            <button
              className="px-3 py-2 text-gray-900 bg-gray-100 rounded-sm focus:outline-none focus:ring focus:ring-gray-500 uppercase tracking-widest font-bold">Choose
              Hero</button>
          </div>
        </div>
      </div>
    </div>
  );
}