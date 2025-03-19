export default function Home() {
  return (
    <main className=" p-6 bg-gray-100 md:w-[1320px]">
      <div>
        <h1 className="md:text-3xl font-bold text-black">
          Welcome to the Dashboard
        </h1>
      </div>
      <section className="grid grid-cols-3 gap-4 mt-8">
        <div className="bg-white shadow-md p-4 rounded-lg">Card 1</div>
        <div className="bg-white shadow-md p-4 rounded-lg">Card 2</div>
        <div className="bg-white shadow-md p-4 rounded-lg">Card 3</div>
      </section>
    </main>
  );
}
