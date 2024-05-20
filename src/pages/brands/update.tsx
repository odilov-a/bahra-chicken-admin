import { Fields } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin } from "antd";
import { useHooks } from "hooks";

const Brand = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get, t } = useHooks();
  return (
    <div className="">
      <Container.Form
        className="w-full"
        url={`/brands/${get(selectedCard, "_id")}`}
        method="put"
        name="brands"
        configs={{
          headers: { 'Content-Type': 'multipart/form-data' },
        }}
        fields={[
          {
            name: "images",
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["brands"] });
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
                component={Fields.FileUpload}
                setFieldValue={setFieldValue}
                className="mb-4"
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

export default Brand;