import { useState } from "react";
import { Card, Modal, Col, Row, notification, Pagination } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import { Button } from "components";
import Create from "./create";
import More from "./more";

import { Delete, Edit, CreateDoc } from "assets/images/icons";

const Blog = () => {
  const { get, queryClient, t } = useHooks();
  const { Meta } = Card;
  const [createModal, showCreateModal] = useState({ open: false, data: {} });
  const [page, setPage] = useState(1);
  const [moreModal, showMoreModal] = useState({ open: false, data: {} });
  const { mutate } = usePost();
  const onDeleteHandler = (id: string) => {
    Modal.confirm({
      title: t("Вы действительно хотите удалить blog?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/blogs/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`blogs`],
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
        open={createModal.open}
        onCancel={() => showCreateModal({ open: false, data: {} })}
        footer={null}
        centered
        title={get(createModal, "data._id") ? t("Update blog") : t("Create blog")}
        width={900}
        destroyOnClose
      >
        <Create {...{ showCreateModal, createModal }} />
      </Modal>
      <Modal
        open={moreModal?.open}
        onOk={() => showMoreModal({ open: true, data: {} })}
        onCancel={() => showMoreModal({ open: false, data: {} })}
        footer={null}
        centered
        title={t("More informaiton")}
        width={700}
        destroyOnClose
      >
        <More {...{ showMoreModal, moreModal }} />
      </Modal>
      <div>
        <Container.All name="blogs" url="/blogs" 
        params={{
          page,
          limit: 2,
        }}
        >
          {({ items, meta }) => {
            return (
              <div>
                <div className="flex justify-between">
                <Button
                    title={t("Create blog")}
                    icon={<CreateDoc />}
                    size="large"
                    onClick={() => showCreateModal({ open: true, data: {} })}
                  />
                {meta && meta.perPage && (
                <div className="mt-[20px] flex justify-center">
                  <Pagination
                    current={meta.currentPage}
                    pageSize={meta.perPage}
                    total={(meta.totalCount)}
                    onChange={(page: any) => {
                      setPage(page)
                      window.scrollTo({
                        behavior: "smooth",
                        top: 0,
                        left: 0
                      })
                    }}
                  />
                </div>
              )}
                </div>
                <div className="grid grid-cols-4 gap-4 mt-[30px]">
                  {items.map((card) => {
                    return (
                      <>
                        <div>
                          <Card
                            onClick={() => (
                              showMoreModal({ open: true, data: card })
                            )}
                            hoverable
                            style={{ width: 300, marginRight: 15 }}
                            cover={
                              <img alt="alt" className="object-cover h-48 w-96" src={get(card, "image[0].medium")} />
                            }
                          >
                            <Meta
                              className="pb-[60px]"
                              title={
                                <div className="">
                                  <p>{t("Nomi")} - {(get(card, "title", ""))}</p>
                                </div>
                              }
                              description={
                                <div className="scrollable-div">
                                  <p>{t("Tavsifi")} - {(get(card, "description", ""))}</p>
                                </div>
                              }
                            />
                            <div className="btnPanel2">
                            <div
                            className="editBtn"
                            onClick={(e) => (
                              e.stopPropagation(),
                              showCreateModal({ open: true, data: card })
                            )}
                              >
                                <Edit />
                              </div>
                              <div
                              className="deleteBtn"
                              onClick={(e) => {
                                e.stopPropagation();
                                onDeleteHandler(get(card, "_id", ""));
                              }}
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

export default Blog;