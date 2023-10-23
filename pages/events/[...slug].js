import Head from "next/head";
import { getFilteredEvents } from "../../helpers/api-util";
import EventList from "../../components/events/EventList";
import ErrorAlert from "../../components/ui/error-alert/ErrorAlert";

const FilteredEventsPage = (props) => {
  const { filteredEvents, year, month } = props;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <title>Filtered Events</title>
        <meta
          name="description"
          content="No Events was found with these parameters"
        />
        <ErrorAlert>No Events found for the choosen filter</ErrorAlert>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events for year ${year} and month ${month}`}
        />
      </Head>
      <EventList items={filteredEvents} />
    </>
  );
};

export default FilteredEventsPage;

export const getServerSideProps = async (context) => {
  const { params } = context;

  const filterData = params.slug;
  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });

  return {
    props: {
      filteredEvents: filteredEvents,
      year: filteredYear,
      month: filteredMonth,
    },
  };
};
