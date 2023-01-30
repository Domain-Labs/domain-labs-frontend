import { Box, Modal } from "@mui/material";

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
const RenewDomainModal = ({
  viewRenewDomainModal,
  setViewRenewDomainModal,
}) => {
  const { isOpen, modalData } = viewRenewDomainModal;
  return (
    <Modal
      open={isOpen}
      onClose={() =>
        setViewRenewDomainModal({
          ...viewRenewDomainModal,
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
          <h2>Renew Domain</h2>
          <h4
            onClick={() =>
              setViewRenewDomainModal({
                ...viewRenewDomainModal,
                isOpen: false,
              })
            }
            style={{ cursor: "pointer" }}
          >
            Close
          </h4>
        </Box>
        <h3>Renewal Cost</h3>
        <Box marginBottom={"0.6rem"}>
          <p style={{ color: "#7b7b7b" }}>Renewal Duration:</p>
          <select
            style={{
              width: "100%",
              border: "none",
              padding: "1.1rem 0.4rem",
              backgroundColor: "#282c30",
              borderRadius: "0.4rem",
              color: "#fff",
              fontWeight: "bold",
            }}
          >
            {["1", "2", "3", "4", "5", "6"].map((value) => (
              <option style={{ fontWeight: "bold", padding: "1.1rem 0.4rem" }}>
                {value} year
              </option>
            ))}
          </select>
        </Box>
        <p style={{ fontWeight: "bold" }}>
          Below is the estimated renewal cost for this transaction
        </p>
        <Box marginBottom={"0.6rem"}>
          <p style={{ color: "#7b7b7b" }}>Estimated Cost:</p>
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
            <p>0.0038ETH</p>
          </Box>
        </Box>

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
          Renew
        </button>
      </Box>
    </Modal>
  );
};

export default RenewDomainModal;
