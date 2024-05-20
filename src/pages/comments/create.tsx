import { Spin } from "antd";
import { Field } from "formik";
import { Fields, Button, AntTextarea } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";
import { Input } from "antd";
const { TextArea } = Input;

const Comment = ({ showCreateModal, setSuccess }: any): JSX.Element => {
  const { t } = useHooks();
  return (
    <div>
      <Container.Form
        url="/comments"
        method="post"
        name="comments"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "author",
            type: "string",
            required: true,
          },
          {
            name: "descriptionUz",
            type: "string",
            required: true,
          },
          {
            name: "descriptionRu",
            type: "string",
            required: true,
          },
          {
            name: "descriptionEn",
            type: "string",
            required: true,
          },
          {
            name: "descriptionKr",
            type: "string",
            required: true,
          },
          {
            name: "images",
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["comments"] });
          setSuccess((prev: any) => !prev);
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Spin spinning={isSubmitting} tip="Verifying">
                <Field
                  rootClassName="mb-[20px] w-full"
                  component={Fields.Input}
                  name="author"
                  type="text"
                  placeholder={t("author")}
                  size="large"
                />
                <Field
                  rootClassName="mb-[10px] w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                  component={AntTextarea}
                  name="descriptionUz"
                  type="text"
                  rows={3}
                  placeholder={t("descriptionUz")}
                  size="large"
                />
                <Field
                  rootClassName="mb-[10px] w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                  component={AntTextarea}
                  name="descriptionRu"
                  type="text"
                  rows={3}
                  placeholder={t("descriptionRu")}
                  size="large"
                />
                <Field
                  rootClassName="mb-[10px] w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                  component={AntTextarea}
                  name="descriptionEn"
                  type="text"
                  rows={3}
                  placeholder={t("descriptionEn")}
                  size="large"
                />
                <Field
                  rootClassName="mb-[10px] w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                  component={AntTextarea}
                  name="descriptionKr"
                  type="text"
                  rows={3}
                  placeholder={t("descriptionKr")}
                  size="large"
                />
                <Field
                  component={Fields.FileUpload}
                  setFieldValue={setFieldValue}
                  rootClassName="mb-[20px]"
                  name="images"
                  accept="image/png, image/jpeg, image/jpg"
                />
              <Button
                title={t("Saqlash")}
                className="w-full mt-[20px]"
                htmlType="submit"
                size="large"
              />
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Comment;