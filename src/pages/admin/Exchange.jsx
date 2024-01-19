import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { greenA, redA } from "@radix-ui/colors";

import PanelContainer from "../../components/dashboard/PanelContainer";
import { styled } from "../../common/stitches";
import Box from "../../components/box";
import { useGetTransactions } from "../../hooks/useTransaction";
import { publicApiClient as currencyAPI } from "../../hooks/useCurrency";
import { privateApiClient as transactionAPI } from "../../hooks/useTransaction";
import colors from "../../common/colors";
import { calculateExchangeAmount } from "../../common/utils";
import toastStore from "../../store/toastStore";
import { FaUnderline } from "react-icons/fa";

const Exchange = () => {
  const { data, isError, refetch } = useGetTransactions();
  const [isLoading, setIsLoading] = useState(false);
  const addNotification = toastStore((state) => state.add);
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("all");

  const handleUpdate = (updateType, tnxId) => {
    setIsLoading(true);
    const payload = {
      status: updateType === "completed" ? "COMPLETED" : "CANCELED",
    };

    const updateTransaction = async () => {
      await transactionAPI.put(`/${tnxId}`, payload).catch((error) => {
        return addNotification({
          title: "Error",
          message: `An error occured while updating transaction with ID: ${tnxId}`,
          type: "error",
        });
      });
      await refetch();
    };

    updateTransaction();
    addNotification({
      title: String(updateType).toUpperCase(),
      message: `Transaction successfully ${updateType}`,
      type: "success",
    });
    setIsLoading(false);
  };

  const handleFilter = (filter) => {
    setFilterType(filter);

    if (filter === "all")
      return setTransactions((prevState) => ({
        ...prevState,
        transactions: transactions.allTransactions,
      }));

    const _filter = filter === "all" ? "" : filter;
    setTransactions((prevState) => ({
      ...prevState,
      transactions: transactions.allTransactions.filter((tnx) => {
        return tnx.details.status === String(_filter).toUpperCase();
      }),
    }));
  };

  useEffect(() => {
    const fetchDetails = () => {
      try {
        const _object = data.map(async (txn) => {
          const resFromCurrency = await currencyAPI.get(`/${txn.from}`);
          const resToCurrency = await currencyAPI.get(`/${txn.to}`);
          return {
            fromCurrency: {
              id: resFromCurrency.id,
              logo: resFromCurrency.logo,
              label: resFromCurrency.name,
              rate: parseFloat(resFromCurrency.rate),
              wallet: resFromCurrency.wallet,
            },
            toCurrency: {
              id: resToCurrency.id,
              logo: resToCurrency.logo,
              label: resToCurrency.name,
              rate: parseFloat(resToCurrency.rate),
              wallet: resToCurrency.wallet,
            },
            details: txn,
          };
        });

        Promise.all(_object).then((res) =>
          setTransactions({
            allTransactions: res,
            transactions: res,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };

    if (data !== undefined && Object.keys(data).length > 0) fetchDetails();
  }, [data]);

  if (isError || transactions?.transactions === undefined) return;

  return (
    <PanelContainer>
      <Container>
        <FilterWrapper>
          <Filter
            active={filterType === "all"}
            onClick={() => handleFilter("all")}
          >
            All Exchanges
          </Filter>
          <Filter
            active={filterType === "pending"}
            onClick={() => handleFilter("pending")}
          >
            In Progress
          </Filter>
          <Filter
            active={filterType === "completed"}
            onClick={() => handleFilter("completed")}
          >
            Complete
          </Filter>
          <Filter
            active={filterType === "canceled"}
            onClick={() => handleFilter("canceled")}
          >
            Cancelled
          </Filter>
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
              {transactions?.transactions.map(
                ({ fromCurrency, toCurrency, details }, index) => (
                  <Tdatarow key={index}>
                    <Tdata>
                      <OptionLabel>
                        {fromCurrency.logo ? (
                          <OptionLabelLogo src={fromCurrency.logo} alt="coin" />
                        ) : (
                          <Box
                            style={{ width: 30, backgroundColor: "dodgerblue" }}
                          />
                        )}
                        <span>{fromCurrency.label}</span>
                      </OptionLabel>
                    </Tdata>
                    <Tdata>
                      <OptionLabel>
                        {toCurrency.logo ? (
                          <OptionLabelLogo src={toCurrency.logo} alt="coin" />
                        ) : (
                          <Box
                            style={{ width: 30, backgroundColor: "dodgerblue" }}
                          />
                        )}
                        <span>{toCurrency.label}</span>
                      </OptionLabel>
                    </Tdata>
                    <Tdata>
                      <Status status={String(details.status).toLowerCase()}>
                        {details.status}
                      </Status>
                    </Tdata>
                    <Tdata>
                      <p>
                        <strong>Transcation ID:</strong> {details.transactionId}
                      </p>
                      <p>
                        <strong>Date:</strong> {details.createdAt}
                      </p>
                      <p>
                        <strong>Exchange rate:</strong>{" "}
                        {parseFloat(details.exchangeRate).toPrecision(6)}
                      </p>
                      <p>
                        <strong>Exchange:</strong> {details.amount}{" "}
                        {fromCurrency.label} -{" "}
                        {calculateExchangeAmount(
                          fromCurrency.rate,
                          toCurrency.rate,
                          details.amount
                        )[1].toPrecision(6)}{" "}
                        {toCurrency.label}
                      </p>
                      <p>
                        <strong>Email Address:</strong> {details.email}
                      </p>
                      <p>
                        <strong>Our {fromCurrency.label} Address:</strong>{" "}
                        {details.from}
                      </p>
                    </Tdata>
                    <Tdata>
                      <Flex>
                        {String(details.status).toLowerCase() === "pending" ? (
                          <>
                            <ButtonSpinner
                              onClick={() =>
                                handleUpdate("completed", details.id)
                              }
                            >
                              {!isLoading && <span>Approve</span>}
                              {isLoading && (
                                <CgSpinner className="spinner" size={25} />
                              )}
                            </ButtonSpinner>
                            <ButtonSpinner
                              type="danger"
                              onClick={() => handleUpdate("cancel", details.id)}
                            >
                              {!isLoading && <span>Cancel</span>}
                              {isLoading && (
                                <CgSpinner className="spinner" size={25} />
                              )}
                            </ButtonSpinner>
                          </>
                        ) : (
                          <p>Transaction Complete</p>
                        )}
                      </Flex>
                    </Tdata>
                  </Tdatarow>
                )
              )}
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
  cursor: "pointer",
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
  padding: "10px 25px",
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

const OptionLabel = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 3,
});

const OptionLabelLogo = styled("img", {
  height: 30,
  width: 30,
  objectFit: "contain",
});

const Status = styled("p", {
  padding: "10px 20px",
  backgroundColor: "#FCFF80",
  color: "#757575",
  borderRadius: 8,
  fontWeight: 600,
  variants: {
    status: {
      pending: {
        backgroundColor: "#FCFF80",
      },
      completed: {
        backgroundColor: "#66D48F",
        color: colors.white,
      },
      canceled: {
        color: colors.white,
        backgroundColor: "#ff0505",
      },
    },
  },
});

export default Exchange;
