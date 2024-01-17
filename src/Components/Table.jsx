import React, { useEffect, useState } from "react";
import { Avatar, Tag, Table, CryptoLogos } from "@web3uikit/core";
import axios from "axios";

const TableNew = ({ data, header, style }) => {
  return (
    <div>
      <Table
        columnsConfig={style}
        data={data}
        header={header}
        isColumnSortable={[false, true, false, false]}
        maxPages={3}
        onPageNumberChanged={function noRefCheck() {}}
        onRowClick={function noRefCheck() {}}
        pageSize={5}
      />
    </div>
  );
};

export default TableNew;
