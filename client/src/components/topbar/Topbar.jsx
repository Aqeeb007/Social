import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import {
  Button,
  ClickAwayListener,
  Grow,
  InputBase,
  Menu,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@material-ui/core";

export default function Topbar() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState(null);

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };
  function handleListKeyDown(event) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    }
  }
  // return focus to the button when we transitioned from !open -> open
  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    const filteredUsers =
      users &&
      users.filter((user) => {
        return user.username.toLowerCase().includes(term.toLowerCase());
      });
    setSearchData(filteredUsers);
  };

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="topbarContainer h-14 w-full bg-blue-500 flex items-center sticky top-0 z-[999]">
      <div className="topbarLeft flex-[3]">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo text-2xl ml-5 font-bold text-white cursor-pointer flex-[5]">
            chatbook
          </span>
        </Link>
      </div>
      <div className="topbarCenter relative flex-[5]">
        <div className="searchbar relative w-full h-10 bg-white flex items-center rounded-[20px]">
          <Search className="searchIcon text-2xl ml-2" />
          <InputBase
            placeholder="Search for friend, post or video"
            className="searchInput border-none w-[90%]"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          {searchData && searchData.length !== 0 ? (
            <div className="absolute min-h-[30vh] w-full top-12 bg-slate-50 shadow-sm-2 z-[9] p-4">
              {searchData &&
                searchData.map((i, index) => {
                  return (
                    <Link to={`/profile/${i.username}`}>
                      <div className="w-full flex items-start-py-3">
                        <img
                          src={
                            user.profilePicture
                              ? PF + user.profilePicture
                              : PF + "person/noAvatar.png"
                          }
                          alt=""
                          className="topbarImg"
                        />
                        <h1>{i.username}</h1>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : null}
        </div>
      </div>
      <div className="topbarRight flex items-center justify-around text-white flex-[4]">
        <div className="topbarLinks mr-2 text-sm cursor-pointer">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons flex">
          <div className="topbarIconItem mr-4 cursor-pointer relative">
            <Person />
            <span className="topbarIconBadge w-4 h-4 bg-red-500 text-white absolute flex items-center justify-center text-xs rounded-[50%] top-[-4px] right-[-5px]">
              1
            </span>
          </div>
          <div className="topbarIconItem">
            <Link to={"/messenger"}>
              <Chat />
            </Link>
            <span className="topbarIconBadge w-4 h-4 bg-red-500 text-white absolute flex items-center justify-center text-xs rounded-[50%] top-[-4px] right-[-5px]">
              2
            </span>
          </div>
          <div className="topbarIconItem">
            <Notifications />
            <span className="topbarIconBadge  w-4 h-4 bg-red-500 text-white absolute flex items-center justify-center text-xs rounded-[50%] top-[-4px] right-[-5px]">
              1
            </span>
          </div>
        </div>
        <div>
          <Button
            ref={anchorRef}
            aria-controls={open ? "menu-list-grow" : undefined}
            aria-haspopup="true"
            onClick={handleToggle}
          >
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt=""
              className="topbarImg"
            />
          </Button>
          <Popper
            open={open}
            anchorEl={anchorRef.current}
            role={undefined}
            transition
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList
                      autoFocusItem={open}
                      id="menu-list-grow"
                      onKeyDown={handleListKeyDown}
                    >
                      <MenuItem onClick={handleClose}>
                        <Link to={`/profile/${user.username}`}>Profile</Link>
                      </MenuItem>
                      <MenuItem onClick={handleClose}>My account</MenuItem>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
        {/* <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt=""
            className="topbarImg"
          />
        </Link> */}
      </div>
    </div>
  );
}
