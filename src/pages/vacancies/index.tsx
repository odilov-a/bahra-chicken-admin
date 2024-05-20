import { useState } from "react";
import { Card, Modal, notification } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import { Button } from "components";
import Create from "./create";
import { Delete, Edit, CreateDoc } from "assets/images/icons";
import './style.scss'

const Vacancy = () => {
  const { get, queryClient, t } = useHooks();
  const { Meta } = Card;
  const [createModal, showCreateModal] = useState({
    open: false,
    data: {}
  });
  const { mutate } = usePost();
  const onDeleteHandler = (id: string) => {
    Modal.confirm({
      title: t("Вы действительно хотите удалить vacancy?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/vacancies/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`vacancies`],
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
        open={get(createModal, "open")}
        onOk={() => showCreateModal({ open: true, data: {} })}
        onCancel={() => showCreateModal({ open: false, data: {} })}
        footer={null}
        centered
        // title={t("Create product")}
        width={700}
        destroyOnClose
      >
        <Create {...{ showCreateModal, createModal }} />
      </Modal>
      <div>
        <Container.All name="vacancies" url="/vacancies">
          {({ items }) => {
            return (
              <div>
                <Button
                  title={t("Create vacancy")}
                  icon={<CreateDoc />}
                  size="large"
                  onClick={() => showCreateModal({ open: true, data: {} })}
                />
                <div className="grid grid-cols-4 gap-4 mt-[30px]">
                  {items.map((card) => {
                    return (
                      <>
                        <div>
                          <Card
                            hoverable
                            style={{ width: 260, marginRight: 15 }}
                          >
                            <Meta
                              className="pb-[60px]"
                              title={
                                <div className="">
                                  <p>{t("title")} - {(get(card, "title", ""))}</p>
                                </div>
                              }
                              description={
                                <div className="">
                                  <p>{t("salary")} - {(get(card, "salary", ""))}</p>
                                  <p>{t("workingTime")} - {(get(card, "workingTime", ""))}</p>
                                  <p>{t("adress")} - {(get(card, "adress", ""))}</p>
                                  <p>{t("description")} - {(get(card, "description", ""))}</p>
                                </div>
                              }
                            />
                            <div className="btnPanel">
                              <div
                                className="editBtn"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  showCreateModal({ open: true, data: card })
                                }}
                              >
                                <Edit />
                              </div>
                              <div
                                onClick={(e) => {
                                  e.stopPropagation()
                                  onDeleteHandler(get(card, "_id", ""))
                                }}
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

export default Vacancy;