"use client";

import ReportTable from "./table";

export const Table = ({ pageTitle, data, column, filter, title }) => {
  return (
    <>
      <ReportTable
        data={data}
        column={column}
        filter={filter}
        title={title}
        pageTitle={pageTitle}
      />
    </>
  );
};
