import { useState } from "react";
import { Card, Modal, notification } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import { Button } from "components";
import Update from "./update";
import Create from "./create";
import { Delete, Edit, CreateDoc } from "assets/images/icons";

const Product = () => {
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
      title: t("Вы действительно хотите удалить product?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/products/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`products`],
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
        title={t("Create product")}
        width={900}
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
        title={t("Edit product")}
        width={900}
        destroyOnClose
      >
        <Update {...{ showEditModal, selectedCard }} />
      </Modal>
      <div>
        <Container.All name="products" url="/products">
          {({ items }) => {
            return (
              <div>
                <Button
                  title={t("Create product")}
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
                            style={{ width: 300, marginRight: 15 }}
                            cover={
                              <img alt="alt" className="h-48 w-96 object-cover" src={get(card, "image[0].medium")} />
                            }
                          >
                            <Meta
                              className="pb-[60px]"
                              title={
                                <div className="">
                                  <p>{t("Nomi uz")} - {(get(card, "titleUz", ""))}</p>
                                  <p>{t("Nomi ru")} - {(get(card, "titleRu", ""))}</p>
                                  <p>{t("Nomi eng")} - {(get(card, "titleEng", ""))}</p>
                                </div>
                              }
                              description={
                                <div className="scrollable-div">
                                  <p>{t("Tavsifi uz")} - {(get(card, "descriptionUz", ""))}</p>
                                  <p>{t("Tavsifi ru")} - {(get(card, "descriptionRu", ""))}</p>
                                  <p>{t("Tavsifi eng")} - {(get(card, "descriptionEng", ""))}</p>
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

export default Product;