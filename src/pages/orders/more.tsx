import { useHooks } from "hooks";
import { Table } from "components";

const More = ({ showMoreModal, moreModal }: any) => {
  const data = moreModal?.data
  const { t, get } = useHooks()

  return (
    <div>
      <div className="flex items-center mb-[10px]"><p className="mr-[20px]"><b>{t("Mijoz nomi")}:</b></p><p>{data.clientName}</p></div>
      <div className="flex items-center mb-[10px]"><p className="mr-[20px]"><b>{t("Mijoz raqami")}:</b></p><p>{data.clientPhone}</p></div>
      <div className="flex items-center mb-[30px]"><p className="mr-[20px]"><b>{t("Buyurtma statusi")}:</b> {get(data, "status") == 3 ? <span className="text-[#EB040F]">{t("Bekor qilingan")}</span> : get(data, "status") == 2 ? <span className="text-[#BFC1C2]">{t("Faol emas")}</span> : <span className="text-[#66A925]">{t("Faol")}</span>}</p></div>
      <Table
        items={data?.products}
        columns={[
          {
            title: t("Mahsulot nomi"),
            dataIndex: "productTitleUz",
            render: (value) => <>{value}</>,
          },
          {
            title: t("Mahsulot vazni"),
            dataIndex: "weight",
            render: (value) => <>{value}</>,
          },
          {
            title: t("Mahsulot tavsifi"),
            dataIndex: "descriptionUz",
            render: (value) => <>{value}</>,
          },
          {
            title: t("Mahsulot afzalliklari"),
            dataIndex: "descriptionUz",
            render: (value) => <>{value}</>,
          },
          {
            title: t("Mahsulot haqida"),
            dataIndex: "aboutUz",
            render: (value) => <>{value}</>,
          },
        ]}
        // isLoading={isLoading}
        // meta={meta}
      />
    </div>
  )
}

export default More