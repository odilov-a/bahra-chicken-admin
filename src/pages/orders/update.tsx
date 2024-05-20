import { Field } from "formik";
import { Container } from "modules";
import { Button, Spin, Select } from "antd";
import { useHooks } from "hooks";

const Order = ({ showEditModal, selectedCard }: any): JSX.Element => {
  const { get, t } = useHooks();
  const { Option } = Select;

  const status = [
    { title: "Faol", value: 1 },
    { title: "Faol emas", value: 2 },
    { title: "Bekor qilingan", value: 3 },
  ]


  return (
    <div>
      <Container.Form
        url={`/orders/${get(selectedCard, "_id")}`}
        method="put"
        name="orders"
        fields={[
          {
            name: "status",
            type: "string",
            value: get(selectedCard, "status"),
            required: true,
          },
        ]}
        onSuccess={(data, resetForm, query) => {
          query.invalidateQueries({ queryKey: ["orders"] });
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
                rootClassName="mb-[40px] w-[300px]"
                name="status"
                render={() => (
                  <Select
                    className="lang-select inline-block w-full mt-[20px]"
                    size={"large"}
                    defaultValue={{ value: 1, title: t("Faol") }}
                    onChange={(value: any) => {
                      setFieldValue("status", value);
                    }}
                  >
                    {status.map((i) => (
                      <Option value={i.value}>{t(i.title)}</Option>
                    ))}
                  </Select>
                )}
              />
              <Button
                className="w-full h-auto mt-[30px] py-[10px] px-4 bg-[#2196F3] text-white font-bold hover:!text-white"
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

export default Order;