import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import { greenA, redA } from "@radix-ui/colors";
import moment from "moment";
import { QueryClient } from "@tanstack/react-query";

import PanelContainer from "../../components/dashboard/PanelContainer";
import { styled } from "../../common/stitches";
import Box from "../../components/box";
import { useGetTransactions } from "../../hooks/useTransaction";
import { publicApiClient as currencyAPI } from "../../hooks/useCurrency";
import { privateApiClient as transactionAPI } from "../../hooks/useTransaction";
import colors from "../../common/colors";
import {
  calculateExchangeAmount,
  sortTransactionsByCreateDate,
} from "../../common/utils";
import toastStore from "../../store/toastStore";
import AdminTable from "../../components/table/AdminTable";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const Exchange = () => {
  const { data, isError, refetch, error } = useGetTransactions();
  const [isLoading, setIsLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const addNotification = toastStore((state) => state.add);
  const [transactions, setTransactions] = useState(undefined);
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

  const handleChange = (event) => {
    setSearchInput(event.target.value);
    setTransactions((prevState) => ({
      ...prevState,
      transactions: transactions.allTransactions.filter((tnx) => {
        return (
          String(tnx.details.email).includes(event.target.value) ||
          String(tnx.details.walletName).includes(event.target.value) ||
          String(tnx.details.transactionId).includes(event.target.value)
        );
      }),
    }));
  };

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const currencies = await queryClient.fetchQuery({
          queryKey: ["currency"],
          queryFn: () => currencyAPI.get(),
        });

        const _object = data.map((txn) => {
          const resFromCurrency = Object.entries(currencies).filter(
            (currency) => currency[1].id === txn.from
          )[0][1];
          const resToCurrency = Object.entries(currencies).filter(
            (currency) => currency[1].id === txn.to
          )[0][1];

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

        sortTransactionsByCreateDate(_object);
        setTransactions({
          allTransactions: _object,
          transactions: _object,
        });
      } catch (error) {
        console.log(error);
      }
    };

    if (data !== undefined) fetchDetails();
  }, [data]);

  useEffect(() => {
    if (error !== null) {
      addNotification({
        title: "Error",
        message: "Error loading data; Please contact admin",
        type: "error",
      });
    }
  }, [error, addNotification]);

  if (isError) return;

  return (
    <PanelContainer isLoading={transactions === undefined}>
      {transactions && (
        <>
          <Container>
            <FilterWrapper>
              <div style={{ display: "flex", gap: 10 }}>
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
              </div>
              <SearchFilterWrapper>
                <CiSearch size={20} />
                <SearchInput
                  type="search"
                  value={searchInput}
                  placeholder="Search transaction by Name or ID"
                  onChange={handleChange}
                />
              </SearchFilterWrapper>
            </FilterWrapper>
          </Container>
          <Container>
            <AdminTable
              headers={[
                "S/N",
                "Send",
                "Receive",
                "Status",
                "Details",
                "Action",
              ]}
            >
              {transactions?.transactions.map(
                ({ fromCurrency, toCurrency, details }, index) => (
                  <Tdatarow key={index}>
                    <Tdata>{index + 1}</Tdata>
                    <Tdata>
                      <OptionLabel>
                        {String(fromCurrency.logo).startsWith("http") ? (
                          <OptionLabelLogo src={fromCurrency.logo} alt="coin" />
                        ) : (
                          <Box
                            style={{
                              width: 30,
                              backgroundColor: "dodgerblue",
                            }}
                          />
                        )}
                        <span>{fromCurrency.label}</span>
                      </OptionLabel>
                    </Tdata>
                    <Tdata>
                      <OptionLabel>
                        {String(toCurrency.logo).startsWith("http") ? (
                          <OptionLabelLogo src={toCurrency.logo} alt="coin" />
                        ) : (
                          <Box
                            style={{
                              width: 30,
                              backgroundColor: "dodgerblue",
                            }}
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
                        <strong>Date:</strong>{" "}
                        {moment(details.createdAt).fromNow()}
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
                        <strong>Our {fromCurrency.label} Account:</strong>{" "}
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
            </AdminTable>
          </Container>
        </>
      )}
    </PanelContainer>
  );
};

const Container = styled("div", {
  margin: "2rem 1rem",
});

const FilterWrapper = styled("ul", {
  display: "flex",
  gap: 10,
  justifyContent: "space-around",
  alignItems: "center",
});

const SearchFilterWrapper = styled("form", {
  position: "relative",
  width: "100%",
  maxWidth: 350,
  height: 45,
  borderRadius: 40,
  boxShadow: "0 6px 8px rgba(0, 0, 0, 0.15)",
  backgroundColor: "#f4f5f5ad",
  display: "flex",
  alignItems: "center",
  padding: 10,
  "&:focus": {
    boxShadow: "0 3px 4px rgba(0, 0, 0, 0.15)",
  },
});

const SearchInput = styled("input", {
  width: "100%",
  fontSize: 14,
  background: "none",
  fontWeight: 500,
  color: "#5a6674",
  border: "none",
  appearance: "none",
  outline: "none",
  "&:focus": {
    outline: "none",
  },
  "&:-webkit-search-cancel-button": {
    appearance: "none",
  },
});

const Filter = styled("li", {
  display: "flex",
  gap: 10,
  alignItems: "center",
  fontWeight: "bold",
  fontSize: 15,
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
  fontSize: 14,
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
  textAlign: "center",
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
