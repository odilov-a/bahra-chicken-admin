import { Spin, Tabs } from "antd";
import { Field } from "formik";
import { Fields, Button, AntTextarea } from "components";
import { Container } from "modules";
import { useHooks } from "hooks";

const Blog = ({ showCreateModal, setSuccess }: any): JSX.Element => {
  const { t } = useHooks();
  const { TabPane } = Tabs;
  return (
    <div>
      <Container.Form
        url="/blogs"
        method="post"
        name="blogs"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "titleUz",
            type: "string",
            required: true,
          },
          {
            name: "titleRu",
            type: "string",
            required: true,
          },
          {
            name: "titleEn",
            type: "string",
            required: true,
          },
          {
            name: "titleKr",
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
          {
            name: "images",
          },
          {
            name: "images",
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["blogs"] });
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
                    name="titleEn"
                    type="text"
                    placeholder={t("titleEn")}
                    size="large"
                  />
                  <Field
                    rootClassName="w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                    component={AntTextarea}
                    name="descriptionEn"
                    type="text"
                    placeholder={t("descriptionEn")}
                    rows={3}
                    size="large"
                  />
                </TabPane>
                <TabPane tab={t("Chinese")} key="zh">
                  <Field
                    rootClassName="mb-[30px]"
                    component={Fields.Input}
                    name="titleKr"
                    type="text"
                    placeholder={t("titleKr")}
                    size="large"
                  />
                  <Field
                    rootClassName="w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                    component={AntTextarea}
                    name="descriptionKr"
                    type="text"
                    placeholder={t("descriptionKr")}
                    rows={3}
                    size="large"
                  />
                  <div className="flex justify-center">
                    <div className="flex gap-[70px]">
                      <Field
                        component={Fields.FileUpload}
                        setFieldValue={setFieldValue}
                        rootClassName="mb-[30px]"
                        name="images"
                        accept="image/png, image/jpeg, image/jpg"
                      />
                      <Field
                        component={Fields.FileUpload}
                        setFieldValue={setFieldValue}
                        rootClassName="mb-[30px]"
                        name="images"
                        accept="image/png, image/jpeg, image/jpg"
                      />
                      <Field
                        component={Fields.FileUpload}
                        setFieldValue={setFieldValue}
                        rootClassName="mb-[30px]"
                        name="images"
                        accept="image/png, image/jpeg, image/jpg"
                      />
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
            // <Spin spinning={isSubmitting} tip="Verifying">
            //   <div className="flex gap-20">
            //     <Field
            //       rootClassName="mb-[40px] w-[300px]"
            //       component={Fields.Input}
            //       name="titleUz"
            //       type="text"
            //       placeholder={t("titleUz")}
            //       label={t("titleUz")}
            //       size="large"
            //     />
            //     <Field
            //       rootClassName="mb-[40px] w-[450px] bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
            //       component={AntTextarea}
            //       name="descriptionUz"
            //       type="text"
            //       placeholder={t("descriptionUz")}
            //       rows={3}
            //       size="large"
            //     />
            //   </div>
            //   <div className="flex gap-20">
            //     <Field
            //       rootClassName="mb-[40px] w-[300px]"
            //       component={Fields.Input}
            //       name="titleRu"
            //       type="text"
            //       placeholder={t("titleRu")}
            //       label={t("titleRu")}
            //       size="large"
            //     />
            //     <Field
            //       rootClassName="mb-[40px] w-[450px] bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
            //       component={AntTextarea}
            //       name="descriptionRu"
            //       type="text"
            //       placeholder={t("descriptionRu")}
            //       rows={3}
            //       size="large"
            //     />
            //   </div>
            //   <div className="flex gap-20">
            //     <Field
            //       rootClassName="mb-[40px] w-[300px]"
            //       component={Fields.Input}
            //       name="titleEn"
            //       type="text"
            //       placeholder={t("titleEn")}
            //       label={t("titleEn")}
            //       size="large"
            //     />
            //     <Field
            //       rootClassName="mb-[40px] w-[450px] bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
            //       component={AntTextarea}
            //       name="descriptionEn"
            //       type="text"
            //       placeholder={t("descriptionEn")}
            //       rows={3}
            //       size="large"
            //     />
            //   </div>
            //   <div className="flex gap-20">
            //     <Field
            //       rootClassName="mb-[40px] w-[300px]"
            //       component={Fields.Input}
            //       name="titleKr"
            //       type="text"
            //       placeholder={t("titleKr")}
            //       label={t("titleKr")}
            //       size="large"
            //     />
            //     <Field
            //       rootClassName="mb-[40px] w-[450px] bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
            //       component={AntTextarea}
            //       name="descriptionKr"
            //       type="text"
            //       placeholder={t("descriptionKr")}
            //       rows={3}
            //       size="large"
            //     />
            //   </div>
            //   <div className="flex justify-center">
            //     <Field
            //       component={Fields.FileUpload}
            //       setFieldValue={setFieldValue}
            //       rootClassName="mb-[40px]"
            //       name="images"
            //       accept="image/png, image/jpeg, image/jpg"
            //     />
            //     <Field
            //       component={Fields.FileUpload}
            //       setFieldValue={setFieldValue}
            //       rootClassName="mb-[40px]"
            //       name="images"
            //       accept="image/png, image/jpeg, image/jpg"
            //     />
            //     <Field
            //       component={Fields.FileUpload}
            //       setFieldValue={setFieldValue}
            //       rootClassName="mb-[40px]"
            //       name="images"
            //       accept="image/png, image/jpeg, image/jpg"
            //     />
            //   </div>
            //   <Button
            //     title={t("Saqlash")}
            //     className="w-full mt-[20px]"
            //     htmlType="submit"
            //     size="large"
            //   />
            // </Spin>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Blog;