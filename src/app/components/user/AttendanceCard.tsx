"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clock, TimerOff, Camera, CheckCircle, MapPin, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import { currentUser, offices } from "@/lib/data";

const PUNCH_IN_RADIUS_METERS = 200; // 200 meters

// Haversine formula to calculate distance between two lat/lon points
const getDistance = (
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
) => {
  const R = 6371e3; // metres
  const φ1 = (lat1 * Math.PI) / 180; // φ, λ in radians
  const φ2 = (lat2 * Math.PI) / 180;
  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d;
};


export function AttendanceCard() {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [timer, setTimer] = useState(0);
  const [lastPunchPhoto, setLastPunchPhoto] = useState<string | null>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
  const [punchInLocation, setPunchInLocation] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        toast({
          variant: "destructive",
          title: "Camera Not Supported",
          description: "Your browser does not support camera access.",
        });
        setHasCameraPermission(false);
        return;
      }
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
             setHasCameraPermission(true);
          };
        }
      } catch (error) {
        console.error("Error accessing camera:", error);
        setHasCameraPermission(false);
        toast({
          variant: "destructive",
          title: "Camera Access Denied",
          description: "Please enable camera permissions in your browser settings.",
        });
      }
    };

    getCameraPermission();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [toast]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPunchedIn) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      if (timer > 0) setTimer(0);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPunchedIn, timer]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const capturePhoto = (): string | null => {
    if (!videoRef.current || !canvasRef.current || !hasCameraPermission) return null;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext('2d');
    if (context) {
      context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
      return canvas.toDataURL('image/jpeg');
    }
    return null;
  };
  
  const performPunch = (latitude?: number, longitude?: number) => {
      const photoDataUrl = capturePhoto();
      if (!photoDataUrl) {
        toast({
          variant: "destructive",
          title: "Photo Capture Failed",
          description: "Could not capture photo. Please try again.",
        });
        return;
      }
      setLastPunchPhoto(photoDataUrl);

      const newPunchedInState = !isPunchedIn;
      setIsPunchedIn(newPunchedInState);

      if (newPunchedInState && latitude && longitude) {
        setPunchInLocation(`${latitude.toFixed(4)}, ${longitude.toFixed(4)}`);
      } else {
          setPunchInLocation(null);
          if(isPunchedIn) { // Only clear timer when punching out
              setTimeout(() => setLastPunchPhoto(null), 5000);
          }
      }
      
      toast({
        title: `Successfully Punched ${newPunchedInState ? 'In' : 'Out'}!`,
        description: `Your attendance has been recorded at ${new Date().toLocaleTimeString()}.`,
      });
  }

  const handlePunch = () => {
    if (isPunchedIn) {
        // Punching out doesn't require geo-lock
        performPunch();
        return;
    }

    if (!hasCameraPermission) {
      toast({
        variant: "destructive",
        title: "Camera Permission Required",
        description: "Cannot punch in without camera access.",
      });
      return;
    }
    
    // If geo-lock is disabled for the user, punch in immediately without location check.
    if (currentUser.isGeoLockEnabled === false) {
        toast({
            title: "Geo-Lock Bypassed",
            description: "Punching in without location verification.",
        });
        performPunch();
        return;
    }

    const assignedOffice = offices.find(o => o.id === currentUser.officeId);

    if (!assignedOffice) {
        toast({
            variant: "destructive",
            title: "No Assigned Office",
            description: "You are not assigned to an office. Please contact your administrator.",
        });
        return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const distance = getDistance(
          latitude,
          longitude,
          assignedOffice.latitude,
          assignedOffice.longitude
        );

        if (distance > PUNCH_IN_RADIUS_METERS) {
          toast({
            variant: "destructive",
            title: "Out of Range",
            description: `You must be within ${PUNCH_IN_RADIUS_METERS} meters of your office to punch in. You are ${Math.round(distance)}m away.`,
          });
          return;
        }
        
        performPunch(latitude, longitude);
      },
      (error) => {
        toast({
          variant: "destructive",
          title: "Location Error",
          description: "Could not get location. Please enable location services and try again.",
        });
      }
    );
  };

  return (
    <Card className="w-full transform transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl">
      <CardHeader>
        <CardTitle className="font-headline flex items-center gap-2">
          <Camera className="w-6 h-6" />
          Photo Punch
        </CardTitle>
        <CardDescription>Punch in or out with a photo for verification.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="w-full aspect-video rounded-md overflow-hidden bg-muted border relative">
          {hasCameraPermission === null && <Skeleton className="w-full h-full" />}
          
          <video ref={videoRef} className={`w-full h-full object-cover ${hasCameraPermission ? 'block' : 'hidden'}`} autoPlay muted playsInline />
          <canvas ref={canvasRef} className="hidden" />

          {hasCameraPermission === false && (
            <div className="absolute inset-0 flex items-center justify-center p-4">
              <Alert variant="destructive">
                <AlertTitle>Camera Access Required</AlertTitle>
                <AlertDescription>
                  Please allow camera access in your browser settings to use this feature.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>
        
        {lastPunchPhoto && (
            <div className="w-full flex flex-col items-center gap-2">
                <p className="text-sm font-medium text-muted-foreground">Last Punch Photo:</p>
                <Image src={lastPunchPhoto} alt="Last punch photo" width={120} height={90} className="rounded-md border-2 border-primary" data-ai-hint="person face" />
            </div>
        )}

        <div className="text-6xl font-bold font-mono text-center tabular-nums text-foreground/80 tracking-wider">
          {formatTime(timer)}
        </div>
        
        <div className={`flex items-center gap-2 font-semibold ${isPunchedIn ? "text-green-600" : "text-amber-600"}`}>
          <div className={`w-3 h-3 rounded-full ${isPunchedIn ? "bg-green-500 animate-pulse" : "bg-amber-500"}`} />
          {isPunchedIn ? "You are punched in" : "You are punched out"}
        </div>
        
        {isPunchedIn && punchInLocation && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Location: {punchInLocation}</span>
          </div>
        )}

        <Button
          onClick={handlePunch}
          size="lg"
          className="w-full font-bold text-lg mt-2 transition-all duration-300"
          variant={isPunchedIn ? "destructive" : "default"}
          disabled={hasCameraPermission === null || hasCameraPermission === false}
        >
          {isPunchedIn ? (
            <>
              <TimerOff className="mr-2 h-5 w-5" />
              Punch Out
            </>
          ) : (
            <>
              <Clock className="mr-2 h-5 w-5" />
              Punch In
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}
