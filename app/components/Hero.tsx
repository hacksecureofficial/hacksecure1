export default function Hero() {
  return (
    <div className="relative h-[70vh] overflow-hidden">
      <video 
        className="absolute w-full h-full object-cover"
        autoPlay 
        loop 
        muted 
        playsInline
      >
        <source src="/placeholder.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to YourBrand</h1>
          <p className="text-xl md:text-2xl mb-8">Discover amazing courses and opportunities</p>
        </div>
      </div>
    </div>
  )
}

