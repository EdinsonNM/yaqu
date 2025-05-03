import React, { useState } from "react";
import { Input } from "./input";
import { Label } from "./label";
import { Clock } from "lucide-react";

interface TimeFieldProps {
  value: Date;
  onChange: (date: Date | undefined) => void;
  label?: string;
  id?: string;
}

export function TimeField({ value, onChange, label, id = "time-field" }: TimeFieldProps) {
  const [time, setTime] = useState<string>(
    value ? formatTime(value) : "08:00"
  );
  
  // Estado para la entrada manual
  const [hours, setHours] = useState<string>(
    value ? value.getHours().toString().padStart(2, "0") : "08"
  );
  const [minutes, setMinutes] = useState<string>(
    value ? value.getMinutes().toString().padStart(2, "0") : "00"
  );

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = e.target.value;
    setTime(newTime);
    
    if (newTime) {
      const [hrs, mins] = newTime.split(":").map(Number);
      setHours(hrs.toString().padStart(2, "0"));
      setMinutes(mins.toString().padStart(2, "0"));
      
      const newDate = new Date(value);
      newDate.setHours(hrs, mins, 0, 0);
      onChange(newDate);
    }
  };
  
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newHours = e.target.value;
    
    // Limitar a 2 dígitos y validar rango (0-23)
    if (newHours.length > 2) {
      newHours = newHours.slice(0, 2);
    }
    
    const hoursNum = parseInt(newHours, 10);
    if (!isNaN(hoursNum) && hoursNum >= 0 && hoursNum <= 23) {
      setHours(newHours);
      updateTimeFromParts(newHours, minutes);
    } else if (newHours === "") {
      setHours("");
    }
  };
  
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newMinutes = e.target.value;
    
    // Limitar a 2 dígitos y validar rango (0-59)
    if (newMinutes.length > 2) {
      newMinutes = newMinutes.slice(0, 2);
    }
    
    const minutesNum = parseInt(newMinutes, 10);
    if (!isNaN(minutesNum) && minutesNum >= 0 && minutesNum <= 59) {
      setMinutes(newMinutes);
      updateTimeFromParts(hours, newMinutes);
    } else if (newMinutes === "") {
      setMinutes("");
    }
  };
  
  const updateTimeFromParts = (hrs: string, mins: string) => {
    if (hrs && mins) {
      const hoursNum = parseInt(hrs, 10);
      const minutesNum = parseInt(mins, 10);
      
      if (!isNaN(hoursNum) && !isNaN(minutesNum)) {
        const formattedTime = `${hoursNum.toString().padStart(2, "0")}:${minutesNum.toString().padStart(2, "0")}`;
        setTime(formattedTime);
        
        const newDate = new Date(value);
        newDate.setHours(hoursNum, minutesNum, 0, 0);
        onChange(newDate);
      }
    }
  };

  function formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  }

  return (
    <div className="grid gap-2">
      {label && <Label htmlFor={id}>{label}</Label>}
      
      {/* Selector de hora nativo (oculto) */}
      <Input
        id={id}
        type="time"
        value={time}
        onChange={handleTimeChange}
        className="hidden"
      />
      
      {/* Entrada manual de hora */}
      <div className="flex items-center space-x-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <div className="flex items-center">
          <Input
            type="text"
            value={hours}
            onChange={handleHoursChange}
            className="w-12 text-center"
            placeholder="HH"
            maxLength={2}
          />
          <span className="mx-1">:</span>
          <Input
            type="text"
            value={minutes}
            onChange={handleMinutesChange}
            className="w-12 text-center"
            placeholder="MM"
            maxLength={2}
          />
        </div>
      </div>
    </div>
  );
}
