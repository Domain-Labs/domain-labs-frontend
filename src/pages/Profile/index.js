import "./profile.css";
import { allDomainsDummyData } from "../../utils/allDomainsDummyData";
import Box from "@mui/material/Box";
import { useThemeStore } from "../../utils/store";
import DomainTable from "./components/DomainTable";
import { useState } from "react";
import ViewDetailsModal from "./components/ViewDetailsModal";
import { BsFilterLeft } from "react-icons/bs";
import { BiDotsVerticalRounded } from "react-icons/bi";
import FilterDrawer from "./components/FilterDrawer";
import { MenuItem } from "@mui/material";
import TransferDomainModal from "./components/TransferDomainModal";
import RenewDomainModal from "./components/RenewDomainModal";
const Profile = () => {
  const [theme] = useThemeStore();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [sortType, setSortType] = useState("name");
  const [selectedDomainsData, setSelectedDomainsData] = useState([]);
  const [viewDetailsModal, setViewDetailsModal] = useState({
    isOpen: false,
    modalData: {},
  });
  const [viewTransferDomainModal, setViewTransferDomainModal] = useState({
    isOpen: false,
    modalData: selectedDomainsData,
  });
  const [viewRenewDomainModal, setViewRenewDomainModal] = useState({
    isOpen: false,
    modalData: selectedDomainsData,
  });
  return (
    <Box
      onClick={() => {
        if (openMenu) setOpenMenu(false);
      }}
    >
      <Box
        position="relative"
        overflow="hidden"
        px={{ md: 10, xs: 5 }}
        py={15}
        style={{
          backgroundColor: theme === "dark-theme" ? "#2a2a2a" : "white",
          color: "white",
        }}
      >
        <Box
          display={"flex"}
          alignItems={"center"}
          justifyContent={"space-between"}
          color={theme === "dark-theme" ? "#fff" : "#2a2a2a"}
          position={"relative"}
        >
          <h1>Domains</h1>
          <Box display={"flex"} gap={"0.6rem"} alignItems={"center"}>
            <Box onClick={() => setIsDrawerOpen(true)}>
              <BsFilterLeft size={30} cursor={"pointer"} />
            </Box>
            <Box onClick={() => setOpenMenu(true)}>
              <BiDotsVerticalRounded size={30} cursor={"pointer"} />
              <Box
                display={openMenu ? "initial" : "none"}
                style={{
                  backgroundColor: "#282828",
                  position: "absolute",
                  top: "60px",
                  right: "0",
                  fontWeight: "bold",
                  boxShadow: "-3px 4px 26px -5px rgba(0,0,0,0.89)",
                  borderRadius: "0.4rem",
                  width: "8rem",
                  color: "white",
                  padding: "0.6rem 0",
                }}
              >
                <MenuItem
                  onClick={() => {
                    if (selectedDomainsData.length <= 0) {
                      alert("Please select domains");
                    } else {
                      setViewTransferDomainModal({
                        ...viewTransferDomainModal,
                        isOpen: true,
                        modalData: selectedDomainsData,
                      });
                    }
                  }}
                >
                  Transfer
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    if (selectedDomainsData.length <= 0) {
                      alert("Please select domains");
                    } else {
                      setViewRenewDomainModal({
                        ...viewRenewDomainModal,
                        isOpen: true,
                        modalData: selectedDomainsData,
                      });
                    }
                  }}
                >
                  Renew
                </MenuItem>
              </Box>
            </Box>
          </Box>
        </Box>
        <DomainTable
          allDomainsDummyData={allDomainsDummyData}
          selectedDomainsData={selectedDomainsData}
          setSelectedDomainsData={setSelectedDomainsData}
          setViewDetailsModal={setViewDetailsModal}
          sortType={sortType}
        />
        <ViewDetailsModal
          viewDetailsModal={viewDetailsModal}
          setViewDetailsModal={setViewDetailsModal}
        />
        <TransferDomainModal
          viewTransferDomainModal={viewTransferDomainModal}
          setViewTransferDomainModal={setViewTransferDomainModal}
        />
        <RenewDomainModal
          viewRenewDomainModal={viewRenewDomainModal}
          setViewRenewDomainModal={setViewRenewDomainModal}
        />
        <FilterDrawer
          isDrawerOpen={isDrawerOpen}
          setIsDrawerOpen={setIsDrawerOpen}
          sortType={sortType}
          setSortType={setSortType}
        />
      </Box>
    </Box>
  );
};

export default Profile;
