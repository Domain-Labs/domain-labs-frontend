import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "400px",  
  bgcolor: "#131619",
  boxShadow: 24,
  px: 2,
  color: "#fff",
  pb: 2,
};

const TransferDomainModal = ({
  viewTransferDomainModal,
  setViewTransferDomainModal,
}) => {
  const { isOpen, modalData } = viewTransferDomainModal;
  return (
    <Modal
      open={isOpen}
      onClose={() =>
        setViewTransferDomainModal({
          ...viewTransferDomainModal,
          isOpen: false,
        })
      }
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <h2>Transfer Domain</h2>
          <h4
            onClick={() =>
              setViewTransferDomainModal({
                ...viewTransferDomainModal,
                isOpen: false,
              })
            }
            style={{ cursor: "pointer" }}
          >
            Close
          </h4>
        </Box>
        <hr />
        <h4>Approve</h4>
        <p>
          Contract approval allows the contract to perform transferring of
          domain on your behalf
        </p>
        {modalData.map((data) => {
          return (
            <Box
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#202225",
                marginBottom: "0.6rem",
                borderRadius: "0.6rem",
                border: "1px solid #262a2e",
                fontWeight: "bold",
              }}
            >
              <p>{data.name}</p>
            </Box>
          );
        })}
        <button
          style={{
            backgroundColor: "#66a6ec",
            border: "none",
            width: "100%",
            padding: "1.1rem",
            borderRadius: "0.6rem",
            color: "#fff",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Approve
        </button>
      </Box>
    </Modal>
  );
};
export default TransferDomainModal;
