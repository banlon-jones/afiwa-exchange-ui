import React, { useEffect, useState } from "react";
import { QueryClient } from "@tanstack/react-query";
import { greenA, redA } from "@radix-ui/colors";
import moment from "moment";
import { useLocation } from "react-router-dom";

import { styled } from "../common/stitches";
import Container from "../components/container";
import Header from "../components/home/Header";
import colors from "../common/colors";
import AdminTable from "../components/table/AdminTable";
import Box from "../components/box";
import {
  calculateExchangeAmount,
  sortTransactionsByCreateDate,
} from "../common/utils";
import toastStore from "../store/toastStore";
import { useGetUserTransactions } from "../hooks/useSession";
import { publicApiClient } from "../hooks/useCurrency";
import { privateApiClient as transactionAPI } from "../hooks/useTransaction";
import { CgSpinner } from "react-icons/cg";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

const RecentExchange = () => {
  const { pathname, hash, key } = useLocation();
  const [transactions, setTransactions] = useState(undefined);
  const [filterType, setFilterType] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const addNotification = toastStore((state) => state.add);
  const { data, isError, refetch } = useGetUserTransactions();

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
    const fetchDetails = async () => {
      try {
        const currencies = await queryClient.fetchQuery({
          queryKey: ["currency"],
          queryFn: () => publicApiClient.get(),
        });

        let _object = data?.transactions.map((txn) => {
          const resFromCurrency = Object.entries(currencies).filter(
            (currency) => currency[1].id === txn.from
          )[0][1];
          const resToCurrency = Object.entries(currencies).filter(
            (currency) => currency[1].id === txn.to
          )[0][1];

          return {
            fromCurrency: {
              id: resFromCurrency.id,
              logo: resFromCurrency.logo.startsWith("http")
                ? resFromCurrency.logo
                : null,
              label: resFromCurrency.name,
              rate: parseFloat(resFromCurrency.rate),
              wallet: resFromCurrency.wallet,
            },
            toCurrency: {
              id: resToCurrency.id,
              logo: resToCurrency.logo.startsWith("http")
                ? resToCurrency.logo
                : null,
              label: resToCurrency.name,
              rate: parseFloat(resToCurrency.rate),
              wallet: resToCurrency.wallet,
            },
            details: txn,
          };
        });
        sortTransactionsByCreateDate(_object);
        setTransactions({
          transactions: _object,
          allTransactions: _object,
        });
      } catch (error) {
        console.log(error);
      }
    };
    if (data !== undefined) {
      fetchDetails();
      setIsLoading(false);
    }
  }, [data, isLoading]);

  const handleUpdate = (tnxId) => {
    setIsLoading(true);
    const payload = {
      status: "CANCELED",
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
      title: "CANCELED",
      message: `Transaction successfully canceled`,
      type: "success",
    });
    setIsLoading(false);
  };

  useEffect(() => {
    // if not a hash link, scroll to top
    if (hash === "") {
      window.scrollTo(0, 0);
    }
    // else scroll to id
    else {
      setTimeout(() => {
        const id = hash.replace("#", "");
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView();
        }
      }, 0);
    }
  }, [pathname, hash, key]);

  if (isError) return;

  return (
    <Main>
      <Container>
        <Header />
      </Container>
      <Container add="headerMargin" style={{ paddingTop: 0 }}>
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
        {transactions && (
          <>
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
                          {fromCurrency.logo ? (
                            <OptionLabelLogo
                              src={fromCurrency.logo}
                              alt="coin"
                            />
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
                          {toCurrency.logo ? (
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
                          <strong>Transcation ID:</strong>{" "}
                          {details.transactionId}
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
                          <strong>Recipient Name:</strong> {details.walletName}
                        </p>
                        <p>
                          <strong>Recipient Account:</strong>{" "}
                          {details.walletAddress}
                        </p>
                      </Tdata>
                      <Tdata>
                        <Flex>
                          {String(details.status).toLowerCase() ===
                          "pending" ? (
                            <ButtonSpinner
                              type="danger"
                              onClick={() => handleUpdate("cancel", details.id)}
                            >
                              {!isLoading && <span>Cancel</span>}
                              {isLoading && (
                                <CgSpinner className="spinner" size={25} />
                              )}
                            </ButtonSpinner>
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
      </Container>
    </Main>
  );
};

const Main = styled("div", {});

const FilterWrapper = styled("ul", {
  display: "flex",
  gap: 10,
  justifyContent: "center",
  padding: "20px 0",
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

export default RecentExchange;