import Stack from "@mui/material/Stack";
import UserList from "../components/UserList";
export default function Users() {
return (
    <>
      <h1>Users Panel</h1>
      <Stack spacing={2} direction="row">
        <UserList/>
      </Stack>
    </>
  );
}