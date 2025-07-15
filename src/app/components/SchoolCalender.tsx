import React, { useMemo, useCallback } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import dayjs from 'dayjs';
import { useIsMobile } from '../hooks/useIsMobile';

export default function SchoolCalendar() {
  const isMobile = useIsMobile();

  const today = dayjs();
  const initial = today.format('YYYY-MM-DD');
  const validRange = useMemo(
    () => ({
      start: today.startOf('month').format('YYYY-MM-DD'),
      end: today.endOf('year').format('YYYY-MM-DD'),
    }),
    [today]
  );

  const events = [
    { title: 'Very Long Event Title That Might Get Cut Off', date: '2025-07-15' },
    { title: 'Event 2', date: '2025-07-18' },
  ];

  const renderEventContent = useCallback(
    (info: any) => (
      <div
        title={isMobile ? undefined : info.event.title}
        style={
          isMobile
            ? {
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 3,
              overflow: 'hidden',
              whiteSpace: 'normal',
              fontSize: '10px',
              lineHeight: '1.2',
              wordBreak: 'break-word',
              padding: '1px 2px',
            }
            : {
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              maxWidth: '100%',
              fontSize: '10px',
              wordBreak: 'break-word',
            }
        }
      >
        {info.event.title}
      </div>
    ),
    [isMobile]
  );

  return (
    <div style={{ maxWidth:"auto", margin: '0 auto' }}>
      <FullCalendar
        plugins={[dayGridPlugin]}
        initialView="dayGridMonth"
        initialDate={initial}
        validRange={validRange}
        events={events}
        eventContent={renderEventContent}
        dayMaxEventRows={2}
        height={isMobile ? 'auto' : 600}
        titleFormat={{ year: '2-digit', month: 'short' }}
        fixedWeekCount={false}
        showNonCurrentDates={true}
        headerToolbar={{ left: 'prev', center: 'title', right: 'next' }}
      />
    </div>
  );
}
