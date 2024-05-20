import { useHooks } from "hooks";

const More = ({ moreProducts }: any): JSX.Element => {
  const card = moreProducts.data
  const { get, t } = useHooks();
  return (
    <div>
      <p><b>{t("Kategoriyasi")}</b> - {(get(card, "category.categoryNameEn", ""))}</p>
      <p><b>{t("Haqida")}</b> - {(get(card, "about", ""))}</p>
      <p><b>{t("Afzalliklari")}</b> - {(get(card, "advantages", ""))}</p>
    </div>
  );
};

export default More;