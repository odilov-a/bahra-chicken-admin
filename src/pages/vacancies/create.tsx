import { useState } from "react";
import { Spin, Tabs } from "antd";
import { Field } from "formik";
import { Container } from "modules";
import { useHooks } from "hooks";
import { Fields, Button, AntTextarea, AntSelect } from "components";
import { storage } from "services";

const Vacancy = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  const [langTab, setLangTab] = useState("Uz")
  const langs = [
    { title: "O'zbekcha", value: "Uz" },
    { title: "Русский", value: "Ru" },
    { title: "English", value: "En" },
    { title: "Chinesse", value: "Kr" },
    { title: "Info", value: "info" },
  ]
  let data = createModal.data && createModal?.data
  //@ts-ignore
  const language = storage.get("i18nextLng")?.charAt(0).toUpperCase() + storage.get("i18nextLng").slice(1) || "Uz"
  return (
    <div>
      <Container.Form
        url={get(data, "_id") ? `vacancies/${get(data, "_id")}` : "vacancies"}
        method={get(data, "_id") ? "put" : "post"}
        name="vacancies"
        fields={[
          {
            name: "titleUz",
            type: "string",
            required: true,
            value: get(data, "titleUz")
          },
          {
            name: "titleRu",
            type: "string",
            required: true,
            value: get(data, "titleRu")
          },
          {
            name: "titleEn",
            type: "string",
            required: true,
            value: get(data, "titleEn")
          },
          {
            name: "titleKr",
            type: "string",
            required: true,
            value: get(data, "titleKr")
          },
          {
            name: "descriptionUz",
            type: "string",
            required: true,
            value: get(data, "descriptionUz")
          },
          {
            name: "descriptionRu",
            type: "string",
            required: true,
            value: get(data, "descriptionRu")
          },
          {
            name: "descriptionEn",
            type: "string",
            required: true,
            value: get(data, "descriptionEn")
          },
          {
            name: "descriptionKr",
            type: "string",
            required: true,
            value: get(data, "descriptionKr")
          },
          {
            name: "salary",
            type: "string",
            required: true,
            value: get(data, "salary")
          },
          {
            name: "adress",
            type: "string",
            required: true,
            value: get(data, "adress")
          },
          {
            name: "workingTime",
            type: "string",
            required: true,
            value: get(data, "workingTime")
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["vacancies"] });
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue, errors, values, submitForm }) => {
          return (
            <div>
              <div className="lang-tabs">
                {langs.map((tab) => (
                  <button
                    key={tab.title}
                    type="button"
                    className={langTab == tab.value ? `selected-tab lang-tab` : "lang-tab"}
                    onClick={() => (
                      setLangTab(tab.value)
                    )}>
                    {t(tab?.title)}
                  </button>
                ))}
              </div>
              <div className="w-full mt-[30px]">
                {langTab !== "info" && <div>
                  <Field
                    rootClassName="mb-6"
                    component={Fields.Input}
                    name={`title${langTab}`}
                    type="text"
                    placeholder={t(`title${langTab}`)}
                    size="large"
                  />
                  <Field
                    rootClassName="w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                    component={AntTextarea}
                    name={`description${langTab}`}
                    type="text"
                    placeholder={t(`description${langTab}`)}
                    size="large"
                  />
                  <div className="flex justify-end">
                    <Button
                      title={t("Next")}
                      size="large"
                      htmlType="button"
                      onClick={() => setLangTab(langTab == "Uz" ? "Ru" : langTab == "Ru" ? "En" : langTab == "En" ? "Kr" : "info")}
                    />
                  </div>
                </div>}
                {langTab == "info" && <div>
                  <Field
                    rootClassName="mb-6"
                    component={Fields.Input}
                    name="salary"
                    type="text"
                    placeholder={t("salary")}
                    size="large"
                  />
                  <Field
                    rootClassName="mt-6"
                    component={Fields.Input}
                    name="adress"
                    type="text"
                    placeholder={t("adress")}
                    size="large"
                  />
                  <Field
                    rootClassName="mt-6"
                    component={Fields.Input}
                    name="workingTime"
                    type="text"
                    placeholder={t("workingTime")}
                    size="large"
                  />
                  <div className="flex justify-end mt-[20px]">
                    <Button
                      title={t("Save")}
                      size="large"
                      htmlType="submit"
                    />
                  </div>
                </div>}
              </div>
            </div>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Vacancy;