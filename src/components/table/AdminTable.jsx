import React from "react";
import { styled } from "../../common/stitches";

const AdminTable = ({ headers, children }) => {
  return (
    <div style={{ overflow: "scroll" }}>
      <Table>
        <thead>
          <tr>
            {headers.map((title, index) => (
              <Thead key={index}>{title}</Thead>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </Table>
    </div>
  );
};

const Table = styled("table", {
  width: "100%",
  border: "1px solid rgb(209 206 206 / 70%)",
  borderSpacing: 0,
  borderCollapse: "separate",
  overflow: "hidden",
  color: "#757575",
  overflowX: "scroll",
  whiteSpace: "nowrap",
});

const Thead = styled("th", {
  backgroundColor: "#EBECF0",
  textAlign: "start",
  padding: "12px 20px",
});

export default AdminTable;
