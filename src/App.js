import React, { useMemo, useState, useEffect } from 'react'

import Table from './components/Table'
import { ColumnFilter } from './components/ColumnFilter'

function App() {
  const columns = useMemo(
    () => [
      {
        Header: "Info",
        columns: [
          {Header: "First Name", accessor: "FirstName", Filter: ColumnFilter, disableFilters: true},
          {Header: "Last Name", accessor: "LastName", Filter: ColumnFilter, disableFilters: true},
          {Header: "Gender", accessor: "Gender", Filter: ColumnFilter},
          {Header: "Latitude", accessor: "Latitude", Filter: ColumnFilter, disableFilters: true},
          {Header: "Longitude", accessor: "Longitude", Filter: ColumnFilter, disableFilters: true},
          {Header: "Credit Card Number", accessor: "CreditCardNumber", Filter: ColumnFilter, disableFilters: true},
          {Header: "Credit Card Type", accessor: "CreditCardType", Filter: ColumnFilter, disableFilters: true},
          {Header: "Email", accessor: "Email", Filter: ColumnFilter, disableFilters: true},
          {Header: "Domain Name", accessor: "DomainName", Filter: ColumnFilter, disableFilters: true},
          {Header: "Phone Number", accessor: "PhoneNumber", Filter: ColumnFilter, disableFilters: true},
          {Header: "MacAddress", accessor: "MacAddress", Filter: ColumnFilter, disableFilters: true},
          {Header: "URL", accessor: "URL", Filter: ColumnFilter, disableFilters: true},
          {Header: "Username", accessor: "UserName", Filter: ColumnFilter, disableFilters: true},
          {Header: "Last Login", accessor: "LastLogin", Filter: ColumnFilter, disableFilters: true},
          {Header: "Payment Method", accessor: "PaymentMethod", Filter: ColumnFilter}
        ]
      }
    ],
    []
  );

  const [data, setData] = useState([]);

  useEffect(() => {
    (async function fetchData () {
      const response = await fetch('http://api.enye.tech/v1/challenge/records');
      const res = await response.json(response);
      const val = res.records.profiles;
        setData(val);
    })();
  }, []);

  return (
    <div className="App">
      <Table columns={columns} data={data} />
    </div>
  );
}

export default App;
