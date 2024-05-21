import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { useHooks } from "hooks";

const User = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get, t } = useHooks();
  return (
    <div>
      <Container.Form
        url="users/update-user"
        method="put"
        name="users/update-user"
        fields={[
          {
            name: "username",
            type: "string",
            value: get(selectedCard, "username"),
            required: true,
          },
          {
            name: "password",
            type: "string",
            value: get(selectedCard, "password"),
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["users/update-user"] });
          showEditModal(false)
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <div className="flex justify-between">
              <div className="flex justify-between flex-col">
                <Field
                  rootClassName="mb-[10px] w-[300px]"
                  component={Fields.Input}
                  name="username"
                  type="text"
                  placeholder={t("username")}
                  label={t("username")}
                  size="large"
                />
                <Field
                  rootClassName="mb-[10px] w-[300px]"
                  component={Fields.Input}
                  name="password"
                  type="text"
                  placeholder={t("password")}
                  label={t("password")}
                  size="large"
                />
              </div>
            </div>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default User;