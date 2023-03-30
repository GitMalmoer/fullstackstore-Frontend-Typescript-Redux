import jwtDecode from "jwt-decode";

const withAdminAuth = (WrappedComponent: any) => {
  return (props: any) => {
    const accessToken = localStorage.getItem("token") ?? "";

    if (accessToken) {
      const decode: { role: string } = jwtDecode(accessToken);
      console.log(decode);
      if (decode.role != "admin") {
        window.location.replace("/AccessDenied");
        return null;
      }
    } else {
      // if accessToken is not present
      window.location.replace("/login");
      return null;
    }
    return <WrappedComponent {...props} />;
  };
};

export default withAdminAuth;
