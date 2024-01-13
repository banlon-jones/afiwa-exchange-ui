import React from "react";
import { CgSpinner } from "react-icons/cg";
import { greenA, redA } from "@radix-ui/colors";

import PanelContainer from "../../components/dashboard/PanelContainer";
import { styled } from "../../common/stitches";
import Box from "../../components/box";

const Exchange = () => {
  return (
    <PanelContainer>
      <Container>
        <FilterWrapper>
          <Filter active="true">All Exchanges</Filter>
          <Filter>In Progress</Filter>
          <Filter>Complete</Filter>
          <Filter>Cancelled</Filter>
        </FilterWrapper>
      </Container>
      <Container>
        <div style={{ overflow: "scroll" }}>
          <Table>
            <thead>
              <tr>
                <Thead>Send</Thead>
                <Thead>Receive</Thead>
                <Thead>Status</Thead>
                <Thead>Details</Thead>
                <Thead>Action</Thead>
              </tr>
            </thead>
            <tbody>
              <Tdatarow>
                <Tdata>
                  <Flex>
                    <Box style={{ backgroundColor: "#FF8A00" }} />
                    <p>Orange Money Burkina</p>
                  </Flex>
                </Tdata>
                <Tdata>
                  <Flex>
                    <Box style={{ backgroundColor: "#D9D9D9" }} />
                    <p>Orange Money Burkina</p>
                  </Flex>
                </Tdata>
                <Tdata>
                  <span
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#FCFF80",
                      color: "#757575",
                      borderRadius: 8,
                      fontWeight: 600,
                    }}
                  >
                    In progress
                  </span>
                </Tdata>
                <Tdata>
                  <p>
                    <strong>Transcation ID:</strong> 879591819
                  </p>
                  <p>
                    <strong>Date:</strong> Nov 9, 2023
                  </p>
                  <p>
                    <strong>Exchange rate:</strong> 65 FCFA - 1 TRON
                  </p>
                  <p>
                    <strong>Email Address:</strong> example@email.com
                  </p>
                  <p>
                    <strong>Our TRON Address:</strong> pioahjaofewoephi
                  </p>
                </Tdata>
                <Tdata>
                  <Flex>
                    <ButtonSpinner>
                      <span>Approve</span>
                      <CgSpinner className="spinner" size={25} />
                    </ButtonSpinner>
                    <ButtonSpinner type="danger">
                      <span>Cancel</span>
                      <CgSpinner className="spinner" size={25} />
                    </ButtonSpinner>
                  </Flex>
                </Tdata>
              </Tdatarow>
              <Tdatarow>
                <Tdata>
                  <Flex>
                    <Box style={{ backgroundColor: "#FF8A00" }} />
                    <p>Orange Money Burkina</p>
                  </Flex>
                </Tdata>
                <Tdata>
                  <Flex>
                    <Box style={{ backgroundColor: "#D9D9D9" }} />
                    <p>Tron</p>
                  </Flex>
                </Tdata>
                <Tdata>
                  <span
                    style={{
                      padding: "10px 20px",
                      backgroundColor: "#FCFF80",
                      color: "#757575",
                      borderRadius: 8,
                      fontWeight: 600,
                    }}
                  >
                    In progress
                  </span>
                </Tdata>
                <Tdata>
                  <p>
                    <strong>Transcation ID:</strong> 879591819
                  </p>
                  <p>
                    <strong>Date:</strong> Nov 9, 2023
                  </p>
                  <p>
                    <strong>Exchange rate:</strong> 65 FCFA - 1 TRON
                  </p>
                  <p>
                    <strong>Email Address:</strong> example@email.com
                  </p>
                  <p>
                    <strong>Our TRON Address:</strong> pioahjaofewoephi
                  </p>
                </Tdata>
                <Tdata>
                  <Flex>
                    <ButtonSpinner>
                      <span>Approve</span>
                      <CgSpinner className="spinner" size={25} />
                    </ButtonSpinner>
                    <ButtonSpinner type="danger">
                      <span>Cancel</span>
                      <CgSpinner className="spinner" size={25} />
                    </ButtonSpinner>
                  </Flex>
                </Tdata>
              </Tdatarow>
            </tbody>
          </Table>
        </div>
      </Container>
    </PanelContainer>
  );
};

const Container = styled("div", {
  margin: "2rem 1rem",
});

const FilterWrapper = styled("ul", {
  display: "flex",
  gap: 10,
});

const Filter = styled("li", {
  display: "flex",
  gap: 10,
  alignItems: "center",
  fontWeight: "bold",
  fontSize: 16,
  padding: "10px 15px",
  borderRadius: 16,
  color: "#757575",
  "&:hover": {
    backgroundColor: "#EBECF0",
  },
  variants: {
    active: {
      true: {
        backgroundColor: "#EBECF0",
        color: "#4253F0",
      },
    },
  },
});

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

const Tdatarow = styled("tr", {
  "&:nth-child(even)": {
    backgroundColor: "#e7e7e76e",
  },
  "&:hover": {
    backgroundColor: "rgb(229 229 229 / 49%)",
  },
});

const Tdata = styled("td", {
  borderTop: "1px solid rgb(207 207 207 / 69%)",
  fontSize: 15,
  padding: "10px 20px",
});

const Flex = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 10,
});

const ButtonSpinner = styled("button", {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  color: "white",
  width: "100%",
  borderRadius: 8,
  padding: "10px 5px",
  fontWeight: "bold",
  variants: {
    type: {
      default: {
        backgroundColor: greenA.greenA10,
        "&:hover": {
          backgroundColor: greenA.greenA9,
        },
      },
      danger: {
        backgroundColor: redA.redA10,
        "&:hover": {
          backgroundColor: redA.redA9,
        },
      },
    },
  },
  defaultVariants: {
    type: "default",
  },
});

export default Exchange;
