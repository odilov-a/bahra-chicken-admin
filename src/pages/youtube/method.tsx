import { FC } from "react";
import { useHooks } from "hooks";
import Container from "modules/container";
import Form from "./form";

interface MethodProps {
  showCreateModal?: (show: boolean) => void;
  showEditModal?: (show: boolean) => void;
  selectedCard?: any;
  setSuccess: (success: boolean) => void;
  successed: boolean;
}

const Method: FC<MethodProps> = ({ showCreateModal, showEditModal, selectedCard, setSuccess, successed }) => {
  const { get } = useHooks();
  const isEditMode = Boolean(get(selectedCard, "_id"));

  return (
    <Container.Form
      url={isEditMode ? `youtubes/${get(selectedCard, "_id")}` : "youtubes"}
      method={isEditMode ? "put" : "post"}
      name="youtubes"
      fields={[
        {
          name: "link",
          type: "string",
          required: true,
          value: get(selectedCard, "link", ""),
        },
      ]}
      onSuccess={(data, resetForm, query) => {
        query.invalidateQueries({ queryKey: ["youtubes"] });
        resetForm();
        if (isEditMode) {
          showEditModal?.(false);
        } else {
          showCreateModal?.(false);
        }
        setSuccess(true);
      }}
      onError={(error) => {
        console.log("Error", error);
      }}
    >
      {({ isSubmitting, setFieldValue, errors, values }) => (
        <Form {...{ setFieldValue, values }} />
      )}
    </Container.Form>
  );
};

export default Method;