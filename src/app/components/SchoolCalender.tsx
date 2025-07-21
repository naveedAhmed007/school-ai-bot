import React, { useMemo, useCallback, useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import dayjs from 'dayjs';
import { useIsMobile } from '../hooks/useIsMobile';
import Loader from './Loader';

export default function SchoolCalendar() {
  const isMobile = useIsMobile();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);


  // ─────────────────────────────────────────────────────────────
  // DATE RANGE & INITIAL DATE
  // ─────────────────────────────────────────────────────────────
  const today = dayjs();
  const initial = today.format('YYYY-MM-DD');
  const validRange = useMemo(
    () => ({
      start: today.startOf('month').format('YYYY-MM-DD'),
      end: today.endOf('year').format('YYYY-MM-DD'),
    }),
    [today]
  );

  // ─────────────────────────────────────────────────────────────
  // GOOGLE CALENDAR FETCH
  // ─────────────────────────────────────────────────────────────
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_CALENDAR_API_KEY;
  const calendarId = 'naveed.ahmed123456654321@gmail.com';

  useEffect(() => {
    if (!apiKey || !calendarId) {
      console.warn('Missing API key or calendar ID');
      return;
    }

    (async () => {
      try {
        const timeMin = dayjs(validRange.start).startOf('day').toISOString();
        const timeMax = dayjs(validRange.end).endOf('day').toISOString();

        const res = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(
            calendarId,
          )}/events?key=${apiKey}&singleEvents=true&orderBy=startTime&timeMin=${timeMin}&timeMax=${timeMax}`,
        );

        const data = await res.json();
        if (data.items) {
          const formatted = data.items.map((ev: any) => ({
            id: ev.id,
            title: ev.summary || 'Untitled',
            start: ev.start.dateTime || ev.start.date,
            end: ev.end?.dateTime || ev.end?.date,
            allDay: !!ev.start.date, // true if only a "date" field (all‑day)
          }));
          setEvents(formatted);

        }
      } catch (err) {
        console.error('Error fetching calendar events:', err);
      }
      finally {
        setLoading(false);
      }
    })();
  }, [apiKey, calendarId, validRange]);

  // ─────────────────────────────────────────────────────────────
  // EVENT RENDERING (adds timeText)
  // ─────────────────────────────────────────────────────────────
  const renderEventContent = useCallback(
    (info: any) => {
      const timeText = info.timeText && !info.event.allDay ? info.timeText : 'All Day';

      return (
        <div
          title={isMobile ? undefined : info.event.title}
          style={{
            fontSize: 10,
            lineHeight: '1.2',
            wordBreak: 'break-word',
            padding: '2px 4px',
            whiteSpace: 'normal',
          }}
        >
          <div style={{ fontWeight: 'bold' }}>{timeText}</div>
          <div>{info.event.title}</div>
        </div>
      );
    },
    [isMobile]
  );
  // ─────────────────────────────────────────────────────────────
  // PROMINENT BLUE STYLE
  // ─────────────────────────────────────────────────────────────
  const handleEventDidMount = useCallback((info: any) => {
    info.el.style.backgroundColor = '#007bff';
    info.el.style.color = 'white';
    info.el.style.fontWeight = 'bold';
    info.el.style.borderRadius = '6px';
    info.el.style.boxShadow = '0 2px 6px rgba(0,0,0,0.15)';
    info.el.style.padding = '2px 6px';
  }, []);


  return (
    <div className="relative w-full mt-5 min-h-[600px]">
      <style>{`
      .fc-list-table .fc-list-event:hover td {
        background-color: #007bff !important;
      }
    `}</style>

      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/60 mb-60">
          <Loader size={100} /> {/* No fullScreen prop used */}
        </div>
      )}

      <FullCalendar
        plugins={[dayGridPlugin, listPlugin]}
        initialView={isMobile ? 'listMonth' : 'dayGridMonth'}
        validRange={validRange}
        events={events}
        eventContent={renderEventContent}
        eventDidMount={handleEventDidMount}
        displayEventEnd={true}
        eventTimeFormat={{ hour: 'numeric', minute: '2-digit', hour12: true }}
        dayMaxEventRows={2}
        height={isMobile ? 'auto' : 600}
        titleFormat={{ year: '2-digit', month: 'short' }}
        fixedWeekCount={false}
        showNonCurrentDates={true}
        headerToolbar={{
          left: 'prev,next',
          center: 'title',
          right: 'dayGridMonth,listMonth',
        }}
      />


    </div>
  );

}
