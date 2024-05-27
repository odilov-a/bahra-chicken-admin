import { useState } from "react";
import { Card, Modal, notification, Pagination } from "antd";
import { Container } from "modules";
import { useHooks, usePost } from "hooks";
import { Button } from "components";
import Method from "./method";
import { Delete, Edit, CreateDoc } from "assets/images/icons";

const YouTube = () => {
  const { get, queryClient, t } = useHooks();
  const { Meta } = Card;
  const [editModal, showEditModal] = useState(false);
  const [createModal, showCreateModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [page, setPage] = useState(1);
  const [successed, setSuccess] = useState<boolean>(false);
  const { mutate } = usePost();
  
  const onEdit = (item: object) => {
    showEditModal(true);
    setSelectedCard(item);
  };

  const onDeleteHandler = (id: string) => {
    Modal.confirm({
      title: t("Are you sure you want to delete this YouTube link?"),
      okText: t("Yes"),
      okType: "danger",
      cancelText: t("No"),
      onOk: () => deleteAction(id),
    });
  };

  const deleteAction = (id: string) => {
    if (id) {
      mutate(
        { method: "delete", url: `/youtubes/${id}`, data: null },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["youtubes"] });
            notification.success({
              message: t("Successfully deleted"),
              duration: 2,
            });
          },
          onError: (error: any) => {
            notification.error({
              message: get(error, "errorMessage", t("An error occurred!")),
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
        onCancel={() => showCreateModal(false)}
        footer={null}
        centered
        title={t("Create link")}
        width={500}
        destroyOnClose
      >
        <Method {...{ showCreateModal, setSuccess, successed }} />
      </Modal>
      <Modal
        open={editModal}
        onCancel={() => showEditModal(false)}
        footer={null}
        centered
        title={t("Edit link")}
        width={500}
        destroyOnClose
      >
        <Method {...{ showEditModal, selectedCard, setSuccess, successed }} />
      </Modal>
      <div>
        <Container.All name="youtubes" url="/youtubes" params={{page, limit:8}}>
          {({ items, isLoading, meta }) => {
            return (
              <div>
                <Button
                  title={t("Create link")}
                  icon={<CreateDoc />}
                  size="large"
                  onClick={() => showCreateModal(true)}
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
                <div className="grid grid-cols-4 gap-4 mt-8">
                  {items.map((card) => (
                    <div key={get(card, "_id", "")}>
                      <Card hoverable style={{ width: 300, marginRight: 15 }}>
                        <Meta
                          className="pb-16"
                          title={
                            <div>
                              <p>{get(card, "link", "")}</p>
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
                            className="deleteBtn"
                            onClick={() =>
                              onDeleteHandler(get(card, "_id", ""))
                            }
                          >
                            <Delete />
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
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