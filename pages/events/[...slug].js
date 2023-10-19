import { useRouter } from "next/router";
import { getFilteredEvents } from "@/dummy-data";
import EventList from "@/components/events/EventList";
import ErrorAlert from "@/components/ui/error-alert/ErrorAlert";

const FilteredEventsPage = () => {
  const router = useRouter();
  const filterData = router.query.slug;

  if (!filterData) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  const filteredEvents = getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return <ErrorAlert>No Events found for the choosen filter</ErrorAlert>;
  }

  return (
    <>
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;
