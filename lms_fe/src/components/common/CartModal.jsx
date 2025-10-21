import { Modal, Table, Button } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";

const CartModal = ({ showModal, handleCloseModal, cartItems, onRemoveItem }) => {

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function FormatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(amount);
  }

  return (
    <Modal show={showModal} onHide={handleCloseModal} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Giỏ hàng của bạn</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {cartItems.length > 0 ? (
          <>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Tên khóa học</th>
                  <th>Số lượng</th>
                  <th>Giá</th>
                  <th>Tổng tiền</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.code}>
                    <td>{item.title}</td>
                    <td>{item.quantity}</td>
                    <td>{FormatCurrency(item.price)}</td>
                    <td>{FormatCurrency(item.price * item.quantity)}</td>
                    <td>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => onRemoveItem(item.code)}
                      >
                        <BsTrash />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <div className="d-flex justify-content-end align-items-center mt-3">
              <h4 className="me-3">Tổng cộng:</h4>
              <h4 className="text-primary fw-bold">{FormatCurrency(totalAmount)}</h4>
            </div>
          </>
        ) : (
          <p className="text-center">Giỏ hàng của bạn đang trống. 🛒</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Đóng
        </Button>
        {cartItems.length > 0 && (
          <Button variant="primary">
            Thanh toán
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default CartModal;