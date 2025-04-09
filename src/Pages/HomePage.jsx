import { useRef } from "react";
import Banner from "../components/Banner/Banner";
import CoinsTable from "../components/CoinsTable";

const HomePage = () => {
  const tableRef = useRef(null);

  return (
    <>
      <Banner scrollToTable={tableRef} />
      <div ref={tableRef}>
        <CoinsTable />
      </div>
    </>
  );
};

export default HomePage;
