import { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { useRouter } from "next/router";
import MenuIcon from "@mui/icons-material/Menu";
import Link from "next/link";
import { CodeVivaLogo, CodeVivaLogo1 } from "@/components/generic/Icons";
import useUserInfo from "@/queries/useUser";
import { isLoggedIn } from "@/helper";
import { allRoutes } from "@/constants/allRoutes";

const pages = [
  { name: "Projects", path: "/project" },
  { name: "Resource", path: "/resource" },
  { name: "Free MOCK", path: "/free-mock" },
  { name: "Apply ", path: "/apply-internship" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact-us" },
];

const settings = [
  { name: "Profile", path: "/profile" },
  { name: "Account", path: "/account" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Logout", path: "" },
];

function MenuBar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push("/login");
  };

  const userInfo = useUserInfo();

  return (
    <AppBar position="static" className=" bg-purple-100">
      <Container maxWidth="xl" className="">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href={allRoutes.home}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            <CodeVivaLogo />
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              className=" text-primary"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.name} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" color="black">
                    <Link href={page.path}>{page.name}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" }, mr: 1 }}>
            <CodeVivaLogo1 />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link key={page.name} href={page.path} passHref>
                <Button
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "black", display: "block" }}
                  className="font-jost capitalize"
                >
                  {page.name}
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {mounted && isLoggedIn() ? (
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <div className="text-[14px] md:text-[27px] font-light font-roboto bg-primary h-[34px] w-[34px] md:h-[50px] md:w-[50px]  rounded-full flex justify-center place-items-center">
                  <span className="flex justify-center text-white font-normal">
                    {userInfo?.data && (
                      <>{userInfo.data.email[0].toUpperCase()}</>
                    )}
                  </span>
                </div>
              </IconButton>
            ) : (
              <Link href={"/login"}>
                <span className="text-primary font-jost">Login</span>
              </Link>
            )}
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem
                  key={setting.name}
                  onClick={() => {
                    handleCloseUserMenu();
                    if (setting.name === "Logout") {
                      handleLogout();
                    }
                  }}
                >
                  <Typography textAlign="center">
                    <Link href={setting.path}>{setting.name}</Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default MenuBar;
