// import { EditRate } from "./EditRate";
import { useState } from "react";
import { Icon } from "@iconify/react";

import { useGetCurrency } from "../../hooks/useCurrency";
import PanelContainer from "../../components/dashboard/PanelContainer";
import AdminTable from "../../components/table/AdminTable";
import Rate from "../../components/dashboard/settings/rates/Rate";
import { styled } from "../../common/stitches";

const Rates = () => {
  const { data, isError } = useGetCurrency();
  const [newRate, setNewRate] = useState();

  if (isError) return;

  return (
    <PanelContainer isLoading={data === undefined}>
      <Container>
        {data && (
          <AdminTable headers={["Name", "wallet", "Rate per $", "Manage"]}>
            {data.map((rate) => (
              <Rate rate={rate} key={rate.id} />
            ))}

            {newRate && (
              <Rate
                removeTemoporary={() => setNewRate(null)}
                rate={newRate}
                adding={true}
              />
            )}

            <tr>
              <td colSpan={3}>
                <div className="flex py-10 flex-1 justify-end">
                  <button
                    className="px-7 py-2 bg-accent opacity-70 hover:opacity-100 text-white text-lg rounded-xl flex items-center gap-2"
                    onClick={() => setNewRate({})}
                  >
                    {"Add New Rate"}
                    <Icon icon={"carbon:add-filled"} />
                  </button>
                </div>
              </td>
            </tr>
          </AdminTable>
        )}
      </Container>
    </PanelContainer>
  );
};

const Container = styled("div", {
  margin: "2rem 1rem",
});

export default Rates;
