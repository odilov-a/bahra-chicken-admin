import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin } from "antd";
import { useHooks } from "hooks";

const User = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get, t } = useHooks();
  return (
    <div>
      <Container.Form
        url="update-user/"
        method="put"
        name="update-user"
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
          {
            name: "email",
            type: "string",
            value: get(selectedCard, "email"),
            required: true,
          },
          {
            name: "phone",
            type: "string",
            value: get(selectedCard, "phone"),
            required: true,
          },
          {
            name: "instagram",
            type: "string",
            value: get(selectedCard, "instagram"),
            required: true,
          },
          {
            name: "facebook",
            type: "string",
            value: get(selectedCard, "facebook"),
            required: true,
          },
          {
            name: "telegram",
            type: "string",
            value: get(selectedCard, "telegram"),
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["update-user"] });
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
                <Field
                  rootClassName="mb-[10px] w-[300px]"
                  component={Fields.Input}
                  name="email"
                  type="text"
                  placeholder={t("email")}
                  label={t("email")}
                  size="large"
                />
                <Field
                  rootClassName="w-[300px]"
                  component={Fields.Input}
                  name="phone"
                  type="text"
                  placeholder={t("phone")}
                  label={t("phone")}
                  size="large"
                />

              </div>
              <div className="flex justify-between flex-col">
                <Field
                  rootClassName="mb-[10px] w-[300px]"
                  component={Fields.Input}
                  name="instagram"
                  type="text"
                  placeholder={t("instagram")}
                  label={t("instagram")}
                  size="large"
                />
                <Field
                  rootClassName="mb-[10px] w-[300px]"
                  component={Fields.Input}
                  name="facebook"
                  type="text"
                  placeholder={t("facebook")}
                  label={t("facebook")}
                  size="large"
                />
                <Field
                  rootClassName="mb-[10px] w-[300px]"
                  component={Fields.Input}
                  name="telegram"
                  type="text"
                  placeholder={t("telegram")}
                  label={t("telegram")}
                  size="large"
                />
                <Button
                  className="w-full h-auto py-[10px] px-4 bg-[#2196F3] text-white font-bold hover:!text-white"
                  htmlType="submit"
                >
                  {t("Saqlash")}
                </Button>
              </div>
            </div>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default User;