import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { BsToggle2Off, BsToggle2On } from "react-icons/bs";

import { Spinner } from "../../../spinner/Spinner";
import { InputField } from "../../../InputField";
import { styled } from "../../../../common/stitches";
import Box from "../../../box";
import {
  useCreateCurrency,
  useUpdateCurrency,
} from "../../../../hooks/useCurrency";
import toastStore from "../../../../store/toastStore";

const Rate = ({ rate, adding = false, removeTemoporary }) => {
  const addNotification = toastStore((state) => state.add);

  const [isActive, setIsActive] = useState(rate.active === "true");
  const {
    mutate: editCurrency,
    data: editData,
    isLoading: isEditing,
    isError: isEditError,
    error: editError,
  } = useUpdateCurrency();
  const {
    mutate: createCurrency,
    data,
    isLoading,
    error,
    isError,
  } = useCreateCurrency();
  const [editing, setEditing] = useState(adding);

  const schema = Yup.object().shape({
    id: Yup.string().required("ID is required"),
    name: Yup.string().required("A name is required"),
    wallet: Yup.string().required("Wallet address is required"),
    rate: Yup.number()
      .moreThan(0, "Rate cannot be less than or equal to 0")
      .required("Rate is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submit = (formData) => {
    if (adding) {
      createCurrency({ data: { ...formData } });
    } else {
      editCurrency({ id: formData["id"], data: { ...formData } });
    }
  };

  useEffect(() => {
    if (isError) {
      if (error.response) {
        const { data } = error?.response;
        data?.message.forEach((msg) => {
          addNotification({
            title: data.error,
            message: msg,
            type: "error",
          });
        });
      } else {
        addNotification({
          title: "Error",
          message:
            "An error occured while processing request, please kind your transaction amount or contact admin",
          type: "error",
        });
      }
    }

    if (isEditError) {
      if (editError.response) {
        const { data } = editError?.response;
        data?.message.forEach((msg) => {
          addNotification({
            title: data.error,
            message: msg,
            type: "error",
          });
        });
      } else {
        addNotification({
          title: "Error",
          message:
            "An error occured while processing request, please kind your transaction amount or contact admin",
          type: "error",
        });
      }
    }
  }, [addNotification, isError, isEditError]);

  useEffect(() => {
    if (
      (data !== undefined && !isError) ||
      (editData !== undefined && !isEditError)
    ) {
      addNotification({
        title: "Successful",
        type: "success",
      });
      setEditing(false);
    }
  }, [data, isError, editData, isEditError]);

  const handleCancelEdit = () => {
    setEditing(false);
    adding && removeTemoporary(rate);
  };

  const handleToggleRate = (formData) => {
    setIsActive(!isActive);
    formData["active"] = `${!isActive}`;
    editCurrency({ id: formData["id"], data: { ...formData } });
  };

  return (
    <>
      <tr
        className={(editing ? "border-2 " : "") + " [&>*]:py-4"}
        key={rate.id}
        style={{
          backgroundColor: isActive ? "inherit" : "#30373f4f",
        }}
      >
        <td className="align-top">
          <div className={"flex gap-3 items-start px-2"}>
            {!adding && (
              <fieldset hidden>
                <input name="id" {...register("id", { value: rate.id })} />
              </fieldset>
            )}
            <OptionLabel>
              {String(rate.logo).startsWith("http") ? (
                <OptionLabelLogo src={rate.logo} alt="coin" />
              ) : (
                <Box style={{ width: 30, backgroundColor: "dodgerblue" }} />
              )}
            </OptionLabel>

            <div className="flex-1 flex flex-col gap-1">
              {editing && (
                <fieldset disabled={!editing} className="w-full">
                  <InputField
                    clazz={
                      (editing ? "border" : "border-none py-0 ") +
                      " disabled:bg-transparent"
                    }
                    errors={errors.logo?.message}
                    placeholder="Logo URL"
                    name="logo"
                    formProps={register("logo", { value: rate.logo })}
                  />
                </fieldset>
              )}
              <fieldset disabled={!editing}>
                <InputField
                  clazz={
                    (editing ? "border" : "border-none py-0") +
                    " disabled:bg-transparent"
                  }
                  errors={errors.name?.message}
                  placeholder="Name"
                  name="name"
                  formProps={register("name", { value: rate.name })}
                />
              </fieldset>
            </div>
          </div>
        </td>
        <td className="align-top">
          <fieldset disabled={!editing}>
            <InputField
              clazz={
                (editing ? "border" : "border-none py-0") +
                " disabled:bg-transparent"
              }
              placeholder="Wallet address"
              errors={errors.wallet?.message}
              name="wallet"
              formProps={register("wallet", { value: rate.wallet })}
            />
          </fieldset>
        </td>
        <td className="align-top">
          <fieldset disabled={!editing}>
            <InputField
              clazz={
                (editing ? "border" : "border-none py-0") +
                " disabled:bg-transparent"
              }
              placeholder="Rate"
              errors={errors.wallet?.message}
              type="number"
              name="rate"
              formProps={register("rate", { value: rate.rate })}
            />
          </fieldset>
        </td>
        <td className="align-top">
          <fieldset disabled={!editing}>
            <InputField
              clazz={
                (editing ? "border" : "border-none py-0") +
                " disabled:bg-transparent"
              }
              placeholder=""
              errors={errors.code?.message}
              type="text"
              name="code"
              formProps={register("code", { value: rate.code })}
            />
          </fieldset>
        </td>
        <td className="align-top">
          <fieldset disabled={!editing}>
            <InputField
              clazz={
                (editing ? "border" : "border-none py-0") +
                " disabled:bg-transparent"
              }
              placeholder="$"
              errors={errors.symbol?.message}
              type="text"
              name="symbol"
              formProps={register("symbol", { value: rate.symbol })}
            />
          </fieldset>
        </td>
        <td className="align-top">
          <div className="px-2 pt-2">
            {!editing && (
              <div
                style={{
                  display: "flex",
                  gap: 10,
                  alignItems: "center",
                }}
              >
                <button
                  onClick={() => setEditing(true)}
                  type="button"
                  className="bg-secondary-1 py-2 px-4 rounded-xl"
                >
                  <Icon height={24} icon={"mdi:edit-outline"} />
                </button>
                <button
                  onClick={() => handleToggleRate(rate)}
                  type="button"
                  style={{
                    padding: "11px 20px",
                    borderRadius: 10,
                    backgroundColor: isActive ? "#dc3545" : "#6c757d",
                    color: "white",
                  }}
                >
                  {isActive ? <BsToggle2Off /> : <BsToggle2On />}
                </button>
              </div>
            )}
            {editing && (
              <div className="flex gap-2">
                <button
                  onClick={handleCancelEdit}
                  type="reset"
                  className="px-7 opacity-70 hover:opacity-100 py-2 bg-secondary-2 text-white  text-lg rounded-xl"
                >
                  {"Cancel"}
                </button>
                <button
                  onClick={handleSubmit(submit)}
                  className="px-7 py-2 bg-accent opacity-70 hover:opacity-100 text-white text-lg rounded-xl flex items-center gap-2"
                  type="submit"
                >
                  <span>{"Save"}</span>
                  {(isEditing || isLoading) && <Spinner />}
                </button>
              </div>
            )}
          </div>
        </td>
      </tr>
    </>
  );
};

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

export default Rate;
