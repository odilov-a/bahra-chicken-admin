import { useState } from "react";
import { Card, Modal } from "antd";
import { Container } from "modules";
import { useHooks } from "hooks";
import Update from "./update";
import { Edit } from "assets/images/icons";
import More from "./more";

const Order = () => {
  const { get, t } = useHooks();
  const { Meta } = Card;
  const [editModal, showEditModal] = useState(false);
  const [moreModal, showMoreModal] = useState({ open: false, data: {} });
  const [selectedCard, setSelectedCard] = useState({});
  const onEdit = (item: object) => {
    showEditModal(true);
    setSelectedCard(item);
  };

  return (
    <div className="flex">
      <Modal
        open={editModal}
        onOk={() => showEditModal(true)}
        onCancel={() => showEditModal(false)}
        footer={null}
        centered
        title={t("Edit order")}
        width={400}
        destroyOnClose
      >
        <Update {...{ showEditModal, selectedCard }} />
      </Modal>
      <Modal
        open={moreModal?.open}
        onOk={() => showMoreModal({ open: true, data: {} })}
        onCancel={() => showMoreModal({ open: false, data: {} })}
        footer={null}
        centered
        title={t("Edit order")}
        width={900}
        destroyOnClose
      >
        <More {...{ showMoreModal, moreModal }} />
      </Modal>
      <div>
        <Container.All name="orders" url="/orders">
          {({ items }) => {
            return (
              <div>
                <div className="grid grid-cols-4 gap-4 mt-[30px]">
                  {items.map((card) => {
                    return (
                      <>
                        <div>
                          <Card
                            hoverable
                            style={{ width: 300, marginRight: 15 }}
                            onClick={() => showMoreModal({ open: true, data: card })}
                          >
                            <div className="pb-[50px]">
                              <p><b>{t("Mijoz nomi")}</b> - {get(card, "clientName", "")}</p>
                              <p><b>{t("Mijoz raqami")}</b> - {get(card, "clientPhone", "")}</p>
                              <p><b>{t("Buyurtma statusi")}</b> - {get(card, "status") == 3 ? <span className="text-[#EB040F]">{t("Bekor qilingan")}</span> : get(card, "status") == 2 ? <span className="text-[#BFC1C2]">{t("Faol emas")}</span> : <span className="text-[#66A925]">{t("Faol")}</span>}</p>
                              <p><b>{t("Sana")}</b> - {(get(card, "createdAt", "")).slice(0, 10).replaceAll("-", ".")} | {(get(card, "createdAt", "")).slice(11, 16)}</p>
                              <div className="mt-[20px] text-[#3367f6] text-[16px]">{t("Batafsil")}</div>
                            </div>
                            <div className="btnPanel">
                              <div
                                className="editBtn"
                                onClick={(e) => (
                                  e.stopPropagation(),
                                  onEdit(card)
                                )}
                              >
                                <Edit />
                              </div>
                            </div>
                          </Card>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            );
          }}
        </Container.All>
      </div>
    </div>
  );
};

export default Order;