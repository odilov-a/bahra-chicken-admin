import { useState } from "react";
import { Card, Modal } from "antd";
import { Container } from "modules";
import { useHooks, usePost, useGet } from "hooks";
import Update from "./update";
import { Edit } from "assets/images/icons";

const User = () => {
  const { get, queryClient, t } = useHooks();
  const { Meta } = Card;
  const [editModal, showEditModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [successed, setSuccess] = useState<boolean>(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    data: null;
  }>({
    isOpen: false,
    data: null,
  });
  const onEdit = (item: object) => {
    showEditModal(true);
    setSelectedCard(item);
  };

  const { data } = useGet({
    name: "update-user",
    url: "contacts",
    onSuccess: (data) => {
    },
    onError: (error) => {
    },
  });

  const info = get(data, "data", {})

  return (
    <div className="flex">
      <Modal
        open={editModal}
        onOk={() => showEditModal(true)}
        onCancel={() => showEditModal(false)}
        footer={null}
        centered
        title={t("Edit user")}
        width={700}
        destroyOnClose
      >
        <Update {...{ showEditModal, selectedCard }} />
      </Modal>
      <div>
        <div>
          <Card
            hoverable
            style={{ width: 300, marginRight: 15 }}
          >
            <Meta
              className="pb-[60px]"
              title={
                <div className="">
                  <p>{t("Login")} - {(get(info, "login", ""))}</p>
                </div>
              }
              description={
                <div className="">
                  <p><b>{t("Email")}:</b> {(get(info, "email", ""))}</p>
                  <p><b>{t("phone")}:</b> {(get(info, "phone", ""))}</p>
                  <p><b>{t("instagram")}:</b> {(get(info, "instagram", ""))}</p>
                  <p><b>{t("facebook")}:</b> {(get(info, "facebook", ""))}</p>
                  <p><b>{t("telegram")}:</b> {(get(info, "telegram", ""))}</p>
                </div>
              }
            />
            <div className="btnPanel">
              <div
                className="editBtn"
                onClick={() => onEdit(info)}
              >
                <Edit />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default User;