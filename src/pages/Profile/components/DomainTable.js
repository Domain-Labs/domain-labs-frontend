import { FormControlLabel, FormGroup, Switch } from "@mui/material";
import { Box } from "@mui/system";
import { FiArrowUp } from "react-icons/fi";
import React, { useState, useEffect } from "react";
import { useThemeStore } from "../../../utils/store";
const ROW_PER_VIEW = 5;
const DomainTable = ({
  allDomainsDummyData,
  selectedDomainsData,
  setSelectedDomainsData,
  setViewDetailsModal,
  sortType,
}) => {
  const [theme] = useThemeStore();
  const [allDomainsData, setAllDomainsData] = useState(allDomainsDummyData);
  const [startFrom, setStartFrom] = useState(1);
  const [endTo, setEndTo] = useState(ROW_PER_VIEW);
  const [currentViewDomainsData, setCurrentViewDomainsData] = useState(
    allDomainsData.slice(startFrom, endTo)
  );

  const handleTableSort = (sortType) => {
    switch (sortType) {
      case "name":
        let nameTypeSortedArray = [...allDomainsData];
        nameTypeSortedArray = nameTypeSortedArray.sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
        setAllDomainsData(nameTypeSortedArray);
        break;
      case "buy on":
        let buyOnTypeSortedArray = [...allDomainsData];
        buyOnTypeSortedArray = buyOnTypeSortedArray.sort(
          (a, b) => new Date(b.registrationDate) - new Date(a.registrationDate)
        );
        setAllDomainsData(buyOnTypeSortedArray);
        break;
      case "expire on":
        let expireOnTypeSortedArray = [...allDomainsData];
        expireOnTypeSortedArray = expireOnTypeSortedArray.sort(
          (a, b) => new Date(b.expirationDate) - new Date(a.expirationDate)
        );
        setAllDomainsData(expireOnTypeSortedArray);
        break;
    }
  };

  useEffect(() => {
    handleTableSort(sortType);
  }, [sortType]);

  useEffect(() => {
    setCurrentViewDomainsData(allDomainsData.slice(startFrom - 1, endTo));
  }, [startFrom, endTo, allDomainsData]);

  const handlePagination = (direction) => {
    if (direction === "next") {
      setStartFrom(endTo + 1);
      setEndTo((prevState) => prevState + ROW_PER_VIEW);
    } else if (direction === "prev") {
      setStartFrom((prevState) => prevState - ROW_PER_VIEW);
      setEndTo(startFrom - 1);
    }
  };

  const checkBoxOnChange = (e, id) => {
    if (e.target.checked) {
      const selectedDomainData = allDomainsData.find(
        ({ id: selectedDomainId }) => selectedDomainId === id
      );
      selectedDomainData.isChecked = true;
      setSelectedDomainsData([...selectedDomainsData, selectedDomainData]);
    } else {
      const unSelectedDomainData = allDomainsData.find(
        ({ id: selectedDomainId }) => selectedDomainId === id
      );
      unSelectedDomainData.isChecked = false;
      let prevData = [...selectedDomainsData];
      prevData.splice(
        prevData.findIndex((ele) => ele.id === id),
        1
      );
      setSelectedDomainsData([...prevData]);
    }
  };
  // const ReverseButton = () => {
  //   return (
  //     <FiArrowUp
  //       cursor="pointer"
  //       size={22}
  //       onClick={() => {
  //         setAllDomainsData([...allDomainsData].reverse());
  //       }}
  //       style={{
  //         transition: "0.25s transform ease-in",
  //       }}
  //     />
  //
  //   );
  // };
  return (
    <div style={{ overflow: "auto" }}>
      <table
        className="domain-table"
        style={{
          color: theme === "dark-theme" ? "#fff" : "#2a2a2a",
        }}
      >
        <thead>
          <th>Select</th>
          <th>
            <div className="domain-table-cell-heading">
              Domain
              {/* {<ReverseButton />} */}
            </div>
          </th>
          <th>
            <div className="domain-table-cell-heading">
              Registration Date
              {/* {<ReverseButton />} */}
            </div>
          </th>
          <th>
            <div className="domain-table-cell-heading">
              Expiration Date
              {/* {<ReverseButton />} */}
            </div>
          </th>
          <th>Details</th>
        </thead>
        <tbody>
          {currentViewDomainsData.map(
            ({
              id,
              name,
              registrationDate,
              expirationDate,
              domainDetails,
              isChecked,
            }) => {
              return (
                <React.Fragment key={id}>
                  <tr style={{ textAlign: "center" }}>
                    <td>
                      <input
                        type={"checkbox"}
                        checked={isChecked ? true : false}
                        onChange={(e) => checkBoxOnChange(e, id)}
                      />
                    </td>
                    <td>{name}</td>
                    <td>{registrationDate}</td>
                    <td>{expirationDate}</td>
                    <td>
                      <button
                        className="view-details-btn"
                        onClick={() => {
                          setViewDetailsModal((prevState) => {
                            return {
                              isOpen: true,
                              modalData: {
                                id,
                                name,
                                registrationDate,
                                expirationDate,
                                domainDetails,
                              },
                            };
                          });
                        }}
                      >
                        view details
                      </button>
                    </td>
                  </tr>
                </React.Fragment>
              );
            }
          )}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={5}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "1.5rem",
                  margin: "0 1rem",
                }}
              >
                <p>
                  {startFrom}-{endTo}
                </p>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <button
                    disabled={startFrom === 1 ? true : false}
                    style={{
                      color: theme === "dark-theme" ? "#fff" : "#2a2a2a",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                    onClick={() => handlePagination("prev")}
                  >
                    {"<"}
                  </button>
                  <button
                    disabled={
                      allDomainsData.length >= startFrom &&
                      allDomainsData.length <= endTo
                        ? true
                        : false
                    }
                    style={{
                      color: theme === "dark-theme" ? "#fff" : "#2a2a2a",
                      fontWeight: "bold",
                      fontSize: "1.1rem",
                    }}
                    onClick={() => handlePagination("next")}
                  >
                    {">"}
                  </button>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default DomainTable;
