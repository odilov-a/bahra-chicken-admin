import { useState } from "react";
import { Spin, Tabs } from "antd";
import { Field } from "formik";

import { Container } from "modules";
import { useHooks } from "hooks";
import { Fields, Button, AntTextarea, AntSelect } from "components";

import NoImage from 'assets/images/product-not-found.jpg'
import { storage } from "services";


const Product = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();
  const [langTab, setLangTab] = useState("Uz")
  const [optionChange, setOptionChange] = useState(false)
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
  console.log(get(data, "category._id"));
  return (
    <div>
      <Container.Form
        url={get(data, "_id") ? `products/${get(data, "_id")}` : "products"}
        method={get(data, "_id") ? "put" : "post"}
        name="products"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "productTitleUz",
            type: "string",
            required: true,
            value: get(data, "productTitleUz")
          },
          {
            name: "productTitleEn",
            type: "string",
            required: true,
            value: get(data, "productTitleEn")
          },
          {
            name: "productTitleRu",
            type: "string",
            required: true,
            value: get(data, "productTitleRu")
          },
          {
            name: "productTitleKr",
            type: "string",
            required: true,
            value: get(data, "productTitleKr")
          },
          {
            name: "aboutUz",
            type: "string",
            required: true,
            value: get(data, "productTitleUz")
          },
          {
            name: "aboutEn",
            type: "string",
            required: true,
            value: get(data, "aboutEn")
          },
          {
            name: "aboutRu",
            type: "string",
            required: true,
            value: get(data, "aboutRu")
          },
          {
            name: "aboutKr",
            type: "string",
            required: true,
            value: get(data, "aboutKr")
          },
          {
            name: "advantagesUz",
            type: "string",
            required: true,
            value: get(data, "advantagesUz")
          },
          {
            name: "advantagesEn",
            type: "string",
            required: true,
            value: get(data, "advantagesEn")
          },
          {
            name: "advantagesRu",
            type: "string",
            required: true,
            value: get(data, "advantagesRu")
          },
          {
            name: "advantagesKr",
            type: "string",
            required: true,
            value: get(data, "advantagesKr")
          },
          {
            name: "category",
            type: "string",
            required: true,
            // onSubmitValue: (val) => get(val, "_id"),
            value: get(data, "category"),
          },
          {
            name: "price",
            type: "number",
            required: true,
            value: get(data, "price"),
          },
          {
            name: "weight",
            type: "number",
            required: true,
            value: get(data, "weight"),
          },
          {
            name: "image1",
            required: true,
            onSubmitValue: (val) => typeof val == "string" ? null : val,
            value: get(data, "image1[0].small")
          },
          {
            name: "image2",
            required: true,
            onSubmitValue: (val) => typeof val == "string" ? null : val,
            value: get(data, "image2[0].small")
          },
          {
            name: "image3",
            required: true,
            onSubmitValue: (val) => typeof val == "string" ? null : val,
            value: get(data, "image3[0].small")
          }
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["products"] });
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ isSubmitting, setFieldValue, errors, values }) => {
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
                    name={`productTitle${langTab}`}
                    type="text"
                    placeholder={t(`productTitle${langTab}`)}
                    size="large"
                  />
                  <Field
                    rootClassName="w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                    component={AntTextarea}
                    name={`about${langTab}`}
                    type="text"
                    placeholder={t(`about${langTab}`)}
                    size="large"
                  />
                  <Field
                    rootClassName="w-full bg-[#E6ECFE] dark:bg-[#454d70] py-[10px] px-[15px] border-2 rounded-[12px] dark:bg-[#30354E] placeholder-[#9EA3B5] border-[#9EA3B5] dark:text-[#fff]"
                    component={AntTextarea}
                    name={`advantages${langTab}`}
                    type="text"
                    placeholder={t(`advantages${langTab}`)}
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
                    component={Fields.AntAsyncSelect}
                    name="category"
                    placeholder={t("category")}
                    url="categories"
                    optionLabel={`categoryName${language}`}
                    optionValue="_id"
                    onChange={(option: { [key: string]: any }) => {
                      setFieldValue("category", option);
                      setOptionChange(true)
                    }}
                    className="w-full mb-[20px]"
                  />
                  <div className="flex items-center justify-between">
                    <Field
                      rootClassName="w-[94%]"
                      component={Fields.Input}
                      name="price"
                      type="number"
                      placeholder={t("Narx")}
                      size="large"
                    />
                    <p className="">
                      {t("so'm")}
                    </p>
                  </div>
                  <Field
                    rootClassName="mt-6"
                    component={Fields.Input}
                    name="weight"
                    type="number"
                    placeholder={t("Ogirlik")}
                    size="large"
                  />
                  <div className="flex justify-between items-end mt-6">
                    <Field
                      component={Fields.FileUpload}
                      setFieldValue={setFieldValue}
                      rootClassName="mb-[40px]"
                      name="image1"
                    />
                    <Field
                      component={Fields.FileUpload}
                      setFieldValue={setFieldValue}
                      rootClassName="mb-[40px]"
                      name="image2"
                    />
                    <Field
                      component={Fields.FileUpload}
                      setFieldValue={setFieldValue}
                      rootClassName="mb-[40px]"
                      name="image3"
                    />
                  </div>
                  <div className="flex justify-end mt-[20px]">
                    <Button
                      title={t("Save")}
                      size="large"
                      onClick={() => get(data, "category._id") && !optionChange ? setFieldValue("category", get(data, "category._id")) : ""}
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

export default Product;