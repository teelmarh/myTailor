import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { mockDataMeasurements } from "../../data/mockData";
import { Box, useTheme, Typography } from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const OrderSchedule = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const handleEvents = (events) => {
    if (!areEventsEqual(currentEvents, events)) {
      setCurrentEvents(events);
    }
  };

  const areEventsEqual = (events1, events2) => {
    if (events1.length !== events2.length) {
      return false;
    }

    for (let i = 0; i < events1.length; i++) {
      if (
        events1[i].id !== events2[i].id ||
        events1[i].title !== events2[i].title
      ) {
        return false;
      }
    }

    return true;
  };

  const calculateDaysLeft = (dueDate) => {
    const today = new Date();
    const due = new Date(dueDate);
    const timeDifference = due.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDifference / (1000 * 3600 * 24));
    return daysLeft;
  };

  const mockData = mockDataMeasurements.map((data) => ({
    id: String(data.id),
    title: `${data.name}'s order!`,
    start: data.dueDate,
    allDay: true,
    daysLeft: data.status === "completed" ? null : calculateDaysLeft(data.dueDate),
  }));
  

  //TEE ONCLICK IT SHOULD OPEN THE ORDER
  // const handleEventClick = (selected) => {
  //   if (
  //     window.confirm(
  //       `Are you sure you want to delete the event '${selected.event.title}'`
  //     )
  //   ) {
  //     selected.event.remove();
  //   }
  // };

  return (
    <Box m="20px">
      <Header
        title="Order Schedule"
        subtitle="Track Your Orders"
      />

      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          "& .fc-theme-standard .fc-list-day-cushion": {
            backgroundColor: colors.primary[400],
          },
          ".fc .fc-list-event:hover td": {
            backgroundColor: colors.grey[800]
        },
        "& .fc .fc-list-event-dot":{ 
          borderColor: colors.greenAccent[700],
        }
        }}
      >
        {/* CALENDAR */}
        <Box
          flex="1 1 100%"
          ml="15px"
        >
          <FullCalendar
            height="75vh"
            plugins={[interactionPlugin, listPlugin]}
            headerToolbar={{
              left: "prev,next",
              center: "title",
              right: "",
            }}
            initialView="listMonth"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            events={mockData}
            // eventClick={handleEventClick}
            eventsSet={(events) => handleEvents(events)}
            eventContent={(arg) => (
              <>
                <div>
                  <strong>{arg.event.title}</strong>
                </div>
                <div>{arg.timeText}</div>
                <div>
                  {arg.event.extendedProps.daysLeft > 0 ? (
                    <Typography
                      color={colors.redAccent[500]}
                      variant="caption"
                     
                    >
                      Due in {arg.event.extendedProps.daysLeft} days
                    </Typography>
                  ) : (
                    <Typography
                      variant="caption"
                      color={colors.greenAccent[500]}
                    >
                      Completed!
                    </Typography>
                  )}
                </div>
              </>
            )}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default OrderSchedule;
