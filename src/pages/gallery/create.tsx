import { useState } from "react";
import { Field } from "formik";

import { Container } from "modules";
import { useHooks } from "hooks";
import { Fields, Button } from "components";

const Gallery = ({ showCreateModal, createModal }: any): JSX.Element => {
  const { t, get } = useHooks();

  let data = createModal.data && createModal?.data
  
  return (
    <div>
      <Container.Form
        url={get(data, "_id") ? `galleries/${get(data, "_id")}` : "galleries"}
        method={get(data, "_id") ? "put" : "post"}
        name="galleries"
        configs={{
          headers: { "Content-Type": "multipart/form-data" },
        }}
        fields={[
          {
            name: "textUz",
            type: "string",
            required: true,
            value: get(data, "textUz")
          },
          {
            name: "textRu",
            type: "string",
            required: true,
            value: get(data, "textRu")
          },
          {
            name: "textEn",
            type: "string",
            required: true,
            value: get(data, "textEn")
          },
          {
            name: "textKr",
            type: "string",
            required: true,
            value: get(data, "textKr")
          },
          {
            name: "images",
            required: true,
            onSubmitValue: (val) => typeof val == "string" ? null : val,
            value: get(data, "image[0].small")
          }
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["galleries"] });
          resetForm();
          showCreateModal(false);
        }}
        onError={(error) => {
          console.log("Error", error);
        }}
      >
        {({ setFieldValue }) => {
          return (
            <div>
              <div className="w-full mt-[30px]">
                <div>
                  <Field
                    rootClassName="mb-6"
                    component={Fields.Input}
                    name="textUz"
                    type="text"
                    placeholder={t("Text UZ")}
                    size="large"
                  />
                  <Field
                    rootClassName="mb-6"
                    component={Fields.Input}
                    name="textRu"
                    type="text"
                    placeholder={t("Text RU")}
                    size="large"
                  />
                  <Field
                    rootClassName="mb-6"
                    component={Fields.Input}
                    name="textEn"
                    type="text"
                    placeholder={t("Text EN")}
                    size="large"
                  />
                  <Field
                    rootClassName="mb-6"
                    component={Fields.Input}
                    name="textKr"
                    type="text"
                    placeholder={t("Text KR")}
                    size="large"
                  />
                  <Field
                    component={Fields.FileUpload}
                    setFieldValue={setFieldValue}
                    rootClassName="mb-[40px]"
                    name={get(data, "_id") ? "image" : "images"}
                  />
                  <div className="flex justify-end mt-[20px]">
                    <Button
                      title={get(data, "_id") ? t("Edit") : t("Save")}
                      size="large"
                      htmlType="submit"
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </Container.Form>
    </div>
  );
};

export default Gallery;