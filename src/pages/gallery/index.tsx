import { useState } from "react";
import { Card, Modal, Pagination, notification } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import { Button } from "components";
import Create from "./create";
import { Delete, Edit, CreateDoc } from "assets/images/icons";

import NoImage from 'assets/images/product-not-found.jpg'

import './style.scss'

const Gallery = () => {
  const { get, queryClient, t } = useHooks();
  const { Meta } = Card;
  const [createModal, showCreateModal] = useState({
    open: false,
    data: {}
  });
  const [moreProducts, showMoreProducts] = useState<{
    isOpen: boolean;
    data: object;
  }>({
    isOpen: false,
    data: {}
  });
  const [page, setPage] = useState();

  const { mutate } = usePost();

  const onDeleteHandler = (id: string) => {
    Modal.confirm({
      title: t("Вы действительно хотите удалить Gallery?"),
      okText: t("да"),
      okType: "danger",
      cancelText: t("нет"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `galleries/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: [`galleries`],
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
        <Container.All name="galleries" url="/galleries" params={{ limit: 8, page }}>
          {({ items, meta }) => {
            console.log(items);
            
            return (
              <div>
                <Button
                  title={t("Create gallery")}
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
                            onClick={() => showMoreProducts({ isOpen: true, data: card })}
                            cover={
                              <img alt="alt" className="h-48 w-96 object-cover" src={get(card, "image[0].medium", NoImage)} />
                            }
                          >
                            <Meta
                              className="pb-[60px]"
                              title={
                                <div className="">
                                  <p>{(get(card, "text", ""))}</p>
                                </div>
                              }
                            // description={
                            //   <div className="">
                            //   </div>
                            // }
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
                {meta && meta.perPage && (
                  <div className="mt-[20px] flex justify-end">
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
            );
          }}
        </Container.All>
      </div>
    </div>
  );
};

export default Gallery;