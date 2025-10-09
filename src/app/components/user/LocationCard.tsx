"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

export function LocationCard() {
  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({
            variant: "destructive",
            title: "Location Error",
            description: "Could not get your location. Please enable location services.",
          });
          setLoading(false);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      );
    } else {
       toast({
          variant: "destructive",
          title: "Location Not Supported",
          description: "Your browser does not support geolocation.",
        });
      setLoading(false);
    }
  }, [toast]);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="font-bold flex items-center gap-2">
          <MapPin className="w-6 h-6" />
          My Location
        </CardTitle>
        <CardDescription>Your current location for attendance.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <Skeleton className="w-full h-[200px] rounded-md" />
        ) : location ? (
          <div className="aspect-video rounded-md overflow-hidden border">
            <iframe
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${location.latitude},${location.longitude}&zoom=15&maptype=satellite`}
            ></iframe>
          </div>
        ) : (
          <div className="text-muted-foreground text-center py-8">
            Could not load map. Please ensure location permissions are enabled.
          </div>
        )}
      </CardContent>
    </Card>
  );
}