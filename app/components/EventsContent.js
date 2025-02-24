import Image from 'next/image'

export default function EventsContent() {
  const eventImages = [
    "adi.png",
    "mahesh.png",
    "tejas.png"
  ];

  return (
    <section className="py-16 bg-black">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center mb-16">
          <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
            <h2 className="text-3xl font-bold mb-4">Upcoming Events</h2>
            <p className="text-gray-300">
              Join us for exciting events throughout the year. From workshops to conferences,
              we offer a variety of opportunities to learn, network, and grow your skills.
              Our events are designed to inspire and educate, bringing together industry experts
              and enthusiasts in a dynamic environment.
            </p>
          </div>
          <div className="md:w-1/2">
            <Image 
              src="hacksec.jpeg" 
              alt="Events main image" 
              width={600} 
              height={400} 
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {eventImages.map((image, index) => (
            <div key={index} className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
              <Image 
                src={image} 
                alt={`Event ${index + 1}`} 
                width={400} 
                height={250} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Event Title {index + 1}</h3>
                <p className="text-gray-300">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
                  lacinia odio vitae vestibulum vestibulum.
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
