"use client"; // this is a client component
import { tableData } from "@/utils/data";
import React, { useState } from "react";
// Table componen
const Table = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState(tableData);
  // Input Search
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    setCurrentPage(1);
  };
  // Search output stored here
  const filteredData = search.filter(
    (item) =>
      item.id.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase()?.includes(searchQuery.toLowerCase()) ||
      item.year.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // Target sorted data
  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };
  // Sorted data stored here
  const sortedData = filteredData.sort((a, b) => {
    if (sortOrder === "asc") {
      return a.year - b.year;
    } else {
      return b.year - a.year;
    }
  });
  // Pagination
  const PAGE_SIZE = 20;

  const totalPages = Math.ceil(filteredData.length / PAGE_SIZE);
  // Previous click handler
  const handlePreviousClick = () => {
    setCurrentPage((currentPage) => currentPage - 1);
  };
  // Next click handler
  const handleNextClick = () => {
    setCurrentPage((currentPage) => currentPage + 1);
  };

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  return (
    <React.Fragment>
      <div className="filter-wrapper">
        <div className="search-field">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchInputChange}
            placeholder="Search..."
            className="search-input"
          />
        </div>
        <div style={{ display: "flex", alignItems: "flex-start" }}>
          <label htmlFor="sort-by">Sort by year:</label>
          <select
            id="sort-by"
            value={sortOrder}
            onChange={handleSortOrderChange}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Year</th>
            <th>Title</th>
            <th>description</th>
          </tr>
        </thead>
        <tbody>
          {!paginatedData.length ? (
            <h1>No Data found...</h1>
          ) : (
            paginatedData?.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.year}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      <div className="pagination">
        <button
          className="previous-button"
          onClick={handlePreviousClick}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className="next-button"
          onClick={handleNextClick}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </React.Fragment>
  );
};

export default Table;
