import { useState } from "react";
import { Card, Modal } from "antd";
import { useHooks, useGet } from "hooks";
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
    name: "users/update-user",
    url: "users/update-user",
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
                  <p>{t("Login")} - {(get(info, "username", ""))}</p>
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