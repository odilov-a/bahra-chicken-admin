import { useState } from "react";
import { Col, Row, Modal, notification } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import { Button } from "components";
import Update from "./update";
import Create from "./create";
import { Delete, Edit, CreateDoc } from "assets/images/icons";

const Certificate = () => {
  const { get, queryClient, t } = useHooks();
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
      title: t("Вы действительно хотите удалить ceretifikat?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/certificates/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`certificates`],
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
        title={t("Create certificate")}
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
        title={t("Edit certificate")}
        width={500}
        destroyOnClose
      >
        <Update {...{ showEditModal, selectedCard }} />
      </Modal>
      <div>
        <Container.All name="certificates" url="/certificates">
          {({ items }) => {
            return (
              <div>
                <Button
                  title={t("Create certificate")}
                  icon={<CreateDoc />}
                  size="large"
                  onClick={() => showCreateModal(true)}
                />
                <Row
                  className="h-[120px] mt-[15px]"
                >
                  {items.map((card) => {
                    return (
                      <>
                        <Col className="flex items-baseline justify-center">
                          <div className="mr-8 mb-4">
                          <img className="object-cover rounded-[10px] w-[260px] h-[200px]" alt="" src={get(card, "image[0].medium")} />
                          <div className="btnPanel2">
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
                          </div>
                          
                        </Col>
                      </>
                    );
                  })}
                </Row>
              </div>
            );
          }}
        </Container.All>
      </div>
    </div>
  );
};

export default Certificate;