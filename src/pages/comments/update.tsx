import { Fields, AntTextarea } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin } from "antd";
import { useHooks } from "hooks";

const Comment = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get, t } = useHooks();
  return (
    <div>
      <Container.Form
        url={`/comments/${get(selectedCard, "_id")}`}
        method="put"
        name="comments"
        configs={{
          headers: { 'Content-Type': 'multipart/form-data' },
        }}
        fields={[
          {
            name: "author",
            type: "string",
            value: get(selectedCard, "author"),
            required: true,
          },
          {
            name: "descriptionUz",
            type: "string",
            value: get(selectedCard, "descriptionUz"),
            required: true,
          },
          {
            name: "descriptionRu",
            type: "string",
            value: get(selectedCard, "descriptionRu"),
            required: true,
          },
          {
            name: "descriptionEn",
            type: "string",
            value: get(selectedCard, "descriptionEn"),
            required: true,
          },
          {
            name: "descriptionKr",
            type: "string",
            value: get(selectedCard, "descriptionKr"),
            required: true,
          },
          {
            name: "images",
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["comments"] });
          showEditModal(false)
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
                  placeholder={t("descriptionUz")}
                  rows={3}
                  size="large"
                />
                <Field
                  rootClassName="mb-[10px] w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                  component={AntTextarea}
                  name="descriptionRu"
                  type="text"
                  placeholder={t("descriptionRu")}
                  rows={3}
                  size="large"
                />
                <Field
                  rootClassName="mb-[10px] w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                  component={AntTextarea}
                  name="descriptionEn"
                  type="text"
                  placeholder={t("descriptionEn")}
                  rows={3}
                  size="large"
                />
                <Field
                  rootClassName="mb-[10px] w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                  component={AntTextarea}
                  name="descriptionKr"
                  type="text"
                  placeholder={t("descriptionKr")}
                  rows={3}
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
                className="w-full h-auto py-[10px] px-4 bg-[#2196F3] text-white font-bold hover:!text-white"
                htmlType="submit"
              >
                {t("Saqlash")}
              </Button>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Comment;