import { Fields, AntTextarea } from "components";
import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin, Tabs } from "antd";
import { useHooks } from "hooks";

const Partner = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get, t } = useHooks();
  const { TabPane } = Tabs;
  return (
    <div>
      <Container.Form
        url={`/products/${get(selectedCard, "_id")}`}
        method="put"
        name="products"
        configs={{
          headers: { 'Content-Type': 'multipart/form-data' },
        }}
        fields={[
          {
            name: "titleUz",
            type: "string",
            required: true,
            value: get(selectedCard, "titleUz"),
          },
          {
            name: "titleRu",
            type: "string",
            required: true,
            value: get(selectedCard, "titleRu"),
          },
          {
            name: "titleEng",
            type: "string",
            required: true,
            value: get(selectedCard, "titleEng"),
          },
          {
            name: "descriptionUz",
            type: "string",
            required: true,
            value: get(selectedCard, "descriptionUz"),
          },
          {
            name: "descriptionRu",
            type: "string",
            required: true,
            value: get(selectedCard, "descriptionRu"),
          },
          {
            name: "descriptionEng",
            type: "string",
            required: true,
            value: get(selectedCard, "descriptionEng"),
          },
          {
            name: "price",
            type: "number",
            required: true,
            value: get(selectedCard, "price"),
          },
          {
            name: "type",
            type: "string",
            required: true,
            value: get(selectedCard, "type"),
          },
          {
            name: "image",
            required: true,
            value: get(selectedCard, "image1[0].small")
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["products"] });
          showEditModal(false)
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue }) => {
          return (
            <Spin spinning={isSubmitting} tip="Verifying">
              <Tabs defaultActiveKey="uz" className="w-full">
                <TabPane tab={t("Uzbek")} key="uz">
                  <Field
                    rootClassName="mb-[30px]"
                    component={Fields.Input}
                    name="titleUz"
                    type="text"
                    placeholder={t("titleUz")}
                    size="large"
                  />
                  <Field
                    rootClassName=" w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                    component={AntTextarea}
                    name="descriptionUz"
                    type="text"
                    placeholder={t("descriptionUz")}
                    rows={3}
                    size="large"
                  />
                </TabPane>
                <TabPane tab={t("Russian")} key="ru">
                  <Field
                    rootClassName="mb-[30px]"
                    component={Fields.Input}
                    name="titleRu"
                    type="text"
                    placeholder={t("titleRu")}
                    size="large"
                  />
                  <Field
                    rootClassName="w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                    component={AntTextarea}
                    name="descriptionRu"
                    type="text"
                    placeholder={t("descriptionRu")}
                    rows={3}
                    size="large"
                  />
                </TabPane>
                <TabPane tab={t("English")} key="en">
                  <Field
                    rootClassName="mb-[30px]"
                    component={Fields.Input}
                    name="titleEng"
                    type="text"
                    placeholder={t("titleEn")}
                    size="large"
                  />
                  <Field
                    rootClassName="w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                    component={AntTextarea}
                    name="descriptionEng"
                    type="text"
                    placeholder={t("descriptionEn")}
                    rows={3}
                    size="large"
                  />
                </TabPane>
                <TabPane tab={t("Info")} key="zh">
                  <div className="flex justify-center">
                    <div className="flex gap-[70px]">
                      <Field
                        component={Fields.FileUpload}
                        setFieldValue={setFieldValue}
                        rootClassName="mb-[30px]"
                        name="image"
                        accept="image/png, image/jpeg, image/jpg"
                      />
                      <Field
                        rootClassName="mb-[30px]"
                        component={Fields.Input}
                        name="price"
                        type="number"
                        placeholder={t("price")}
                        size="large"
                      />
                    </div>
                    <div>
                      <Field rootClassName="mb-[30px]" component={Fields.Select} name="type" size="large">
                        <option value="unripe">{t("unripe")}</option>
                        <option value="halfReady">{t("halfReady")}</option>
                      </Field>
                    </div>
                  </div>
                  <Button
                    title={t("Saqlash")}
                    className="w-full mt-[20px]"
                    htmlType="submit"
                    size="large"
                  />
                </TabPane>
              </Tabs>
            </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Partner;