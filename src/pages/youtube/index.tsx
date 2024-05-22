import { useState } from "react";
import { Card, Modal, notification } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import { Button } from "components";
import Update from "./update";
import Create from "./create";
import { Delete, Edit, CreateDoc } from "assets/images/icons";

const YouTube = () => {
  const { get, queryClient, t } = useHooks();
  const { Meta } = Card;
  const [editModal, showEditModal] = useState(false);
  const [createModal, showCreateModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [successed, setSuccess] = useState<boolean>(false);
  const [modal, setModal] = useState<{
    isOpen: boolean;
    data: null;
  }>({
    isOpen: false,
    data: null,
  });
  const { mutate } = usePost();
  const onEdit = (item: object) => {
    showEditModal(true);
    setSelectedCard(item);
  };
  const onDeleteHandler = (id: string) => {
    Modal.confirm({
      title: t("Вы действительно хотите удалить YouTube?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/youtubes/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`youtubes`],
            });
            notification["success"]({
              message: t("Успешно удалена"),
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification["error"]({
              message: get(error, "errorMessage", t("Произошло ошибка!")),
              duration: 2,
            });
          },
        }
      );
    }
  };

  return (
    <div className="flex">
      <Modal
        open={createModal}
        onOk={() => showCreateModal(true)}
        onCancel={() => showCreateModal(false)}
        footer={null}
        centered
        title={t("Create link")}
        width={500}
        destroyOnClose
      >
        <Create {...{ showCreateModal, setSuccess, successed }} />
      </Modal>
      <Modal
        open={editModal}
        onOk={() => showEditModal(true)}
        onCancel={() => showEditModal(false)}
        footer={null}
        centered
        title={t("Edit link")}
        width={500}
        destroyOnClose
      >
        <Update {...{ showEditModal, selectedCard }} />
      </Modal>
      <div>
        <Container.All name="youtubes" url="/youtubes">
          {({ items }) => {
            return (
              <div>
                <Button
                  title={t("Create link")}
                  icon={<CreateDoc />}
                  size="large"
                  onClick={() => showCreateModal(true)}
                />
                <div className="grid grid-cols-4 gap-4 mt-[30px]">
                  {items.map((card) => {
                    return (
                      <>
                        <div>
                          <Card
                            hoverable
                            style={{ width: 400, marginRight: 15 }}
                          >
                            <Meta
                              className="pb-[60px]"
                              title={
                                <div className="">
                                  <p>{(get(card, "link", ""))}</p>
                                </div>
                              }
                            />
                            <div className="btnPanel">
                              <div
                                className="editBtn"
                                onClick={() => onEdit(card)}
                              >
                                <Edit />
                              </div>
                              <div
                                onClick={() =>
                                  onDeleteHandler(get(card, "_id", ""))
                                }
                                className="deleteBtn"
                              >
                                <Delete />
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

export default YouTube;