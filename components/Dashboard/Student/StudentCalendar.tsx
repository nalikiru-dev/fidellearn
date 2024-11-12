'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, addDays, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Event {
  id: string;
  title: string;
  date: Date;
  type: 'deadline' | 'class' | 'exam';
}

const StudentCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Example events
  const events: Event[] = [
    {
      id: '1',
      title: 'JavaScript Basics Quiz',
      date: addDays(new Date(), 2),
      type: 'exam'
    },
    {
      id: '2',
      title: 'React Project Deadline',
      date: addDays(new Date(), 5),
      type: 'deadline'
    }
  ];

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const selectedDateEvents = events.filter(
    event => format(event.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card className="md:col-span-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Calendar</CardTitle>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="icon" onClick={prevMonth}>
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="font-medium">
                {format(currentDate, 'MMMM yyyy')}
              </span>
              <Button variant="outline" size="icon" onClick={nextMonth}>
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center py-2 font-medium text-sm">
                {day}
              </div>
            ))}
            {days.map((day, index) => {
              const hasEvents = events.some(
                event => format(event.date, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd')
              );
              return (
                <Button
                  key={day.toString()}
                  variant={format(selectedDate, 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd') 
                    ? "default" 
                    : "ghost"}
                  className={`aspect-square ${hasEvents ? 'ring-2 ring-blue-500 ring-offset-2' : ''}`}
                  onClick={() => setSelectedDate(day)}
                >
                  <time dateTime={format(day, 'yyyy-MM-dd')}>
                    {format(day, 'd')}
                  </time>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            Events for {format(selectedDate, 'MMMM d, yyyy')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedDateEvents.map(event => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border"
                >
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{event.title}</h3>
                    <span className={`text-sm px-2 py-1 rounded ${
                      event.type === 'exam' 
                        ? 'bg-red-100 text-red-800'
                        : event.type === 'deadline'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">
                    {format(event.date, 'h:mm a')}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No events scheduled for this date.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StudentCalendar;






























