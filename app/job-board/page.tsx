import Image from 'next/image'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import Navbar from '../components/Navbar' // Import Navbar
import Footer from '../components/Footer' // Import Footer

const jobs = [
  { 
    id: 1, 
    title: 'Frontend Developer', 
    company: 'TechCorp', 
    logo: '/Amazon.png?height=100&width=100',
    link: '/job-board/1' // Job link within the site
  },
  { 
    id: 2, 
    title: 'Backend Engineer', 
    company: 'DataSys', 
    logo: '/flipkart.png?height=100&width=100',
    link: '/job-board/2' // Job link within the site
  },
  { 
    id: 3, 
    title: 'UX Designer', 
    company: 'DesignHub', 
    logo: '/google.jpg?height=100&width=100',
    link: '/job-board/3' // Job link within the site
  },
]

export default function Home() {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <div className="container mx-auto my-8 flex-grow">
        <h1 className="text-3xl font-bold text-center mb-8">Job Openings</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
          {jobs.map((job) => (
            <div key={job.id} className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className="flex items-center mb-4">
                <Image src={job.logo || "/placeholder.svg"} alt={`${job.company} logo`} width={50} height={50} className="rounded-full mr-4" />
                <h2 className="text-xl font-semibold">{job.title}</h2>
              </div>
              <p className="text-gray-400 mb-4">{job.company}</p>
              <Link href={job.link} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors">
                Apply for this job
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  )
}
