import { Field } from "formik";
import { Fields, Button } from "components";
import { useHooks } from "hooks";

const Form = ({ setFieldValue, values }: { setFieldValue: Function, values: any }) => {
  const { t } = useHooks();

  return (
    <div className="w-full mt-[30px]">
      <div>
        <Field
          component={Fields.Input}
          name="link"
          size="large"
          type="string"
          placeholder={t("link")}
          rootClassName="mb-[20px]"
        />
        <div className="flex justify-end mt-[20px]">
          <Button
            title={t("Save")}
            size="large"
            htmlType="submit"
          />
        </div>
      </div>
    </div>
  );
};

export default Form;