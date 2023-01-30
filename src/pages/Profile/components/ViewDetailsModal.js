import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "max-content",
  bgcolor: "#282828",
  boxShadow: 24,
  px: 4,
  color: "#fff",
};

const ViewDetailsModal = ({ viewDetailsModal, setViewDetailsModal }) => {
  const { name, registrationDate, expirationDate } = viewDetailsModal.modalData;
  return (
    <Modal
      open={viewDetailsModal.isOpen}
      onClose={() => setViewDetailsModal({ isOpen: false, modalData: {} })}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <h2>{name}</h2>
        <Box>
          <p>Purchased Date : {registrationDate}</p>
          <p>Expiration Date : {expirationDate}</p>
        </Box>
        <h3>owned by {viewDetailsModal?.modalData?.domainDetails?.owner}</h3>
      </Box>
    </Modal>
  );
};
export default ViewDetailsModal;
