'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface LocationData {
  city: string;
  country: string;
  countryRegion: string;
  latitude: string;
  longitude: string;
  region: string;
}

export default function IPLocation() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchLocation = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/location');
      if (!response.ok) {
        throw new Error('Failed to fetch location');
      }
      const data = await response.json();
      setLocation(data);
    } catch (err) {
      setError('Error fetching location data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>IP Location</CardTitle>
      </CardHeader>
      <CardContent>
        <Button onClick={fetchLocation} disabled={loading}>
          {loading ? 'Loading...' : 'Get My Location'}
        </Button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
        {location && (
          <div className="mt-4">
            <p><strong>City:</strong> {location.city}</p>
            <p><strong>Country:</strong> {location.country}</p>
            <p><strong>Region:</strong> {location.countryRegion}</p>
            <p><strong>Latitude:</strong> {location.latitude}</p>
            <p><strong>Longitude:</strong> {location.longitude}</p>
            <p><strong>Vercel Region:</strong> {location.region}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

