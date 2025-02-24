"use client"; // Add this line at the top

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface Certificate {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  date: string;
  score: number;
  imageUrl: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch('/api/certificates');
        if (response.ok) {
          const data = await response.json();
          setCertificates(data.certificates);
        } else if (response.status === 401) {
          router.push('/signin');
        } else {
          setError('Failed to fetch certificates');
        }
      } catch (err) {
        setError('An error occurred while fetching certificates');
      } finally {
        setLoading(false);
      }
    };

    fetchCertificates();
  }, [router]);

  const handleDownload = async (imageUrl: string, firstName: string, lastName: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${firstName}_${lastName}_Certificate.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading image:', error);
      alert('Failed to download the certificate. Please try again.');
    }
  };

  const formatDate = (date: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(date).toLocaleDateString(undefined, options);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Your Achievements</h1>
        {loading ? (
          <p>Loading certificates...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : certificates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certificates.map((certificate) => (
              <div key={certificate.id} className="border rounded shadow p-4">
                <Image
                  src={certificate.imageUrl}
                  alt={`${certificate.firstName} ${certificate.lastName} Certificate`}
                  width={300}
                  height={200}
                  className="rounded"
                />
                <h2 className="text-xl font-semibold mt-2">
                  {certificate.firstName} {certificate.lastName}
                </h2>
                <p className="text-gray-400">Score: {certificate.score}</p>
                <p className="text-gray-400">Date: {formatDate(certificate.date)}</p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => handleDownload(certificate.imageUrl, certificate.firstName, certificate.lastName)}
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p>No certificates available.</p>
        )}
      </div>

      <Footer />
    </main>
  );
}
