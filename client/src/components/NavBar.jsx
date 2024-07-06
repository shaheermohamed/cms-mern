import { CameraOutlined, SettingOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import { Button, Drawer } from "antd";
import { useState } from "react";
const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Drawer
        title="Settings"
        onClose={() => {
          setDrawerOpen(false);
        }}
        open={drawerOpen}
      >
        <Button
          onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");
            window.location.reload();
            setDrawerOpen(false);
          }}
        >
          Logout
        </Button>
      </Drawer>
      <header className="fixed top-0 left-0 w-full py-5 sm:px-10 px-5 flex justify-between items-center border-b border-b-stone-300 bg-white z-10">
        <nav className="flex w-full screen-max-width">
          <h3 className="text-sm">CMS</h3>
          <div className="flex flex-1 justify-center max-sm:hidden">
            <div className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all">
              {""}
            </div>
          </div>
          <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
            <SettingOutlined
              style={{ fontSize: "1.2rem" }}
              onClick={() => setDrawerOpen(true)}
            />
          </div>
        </nav>
      </header>
    </>
  );
};

NavBar.propTypes = {
  setOpenModal: PropTypes.func.isRequired,
};

export default NavBar;
