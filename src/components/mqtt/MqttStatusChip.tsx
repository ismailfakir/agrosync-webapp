import { Chip } from "@mui/material";
import { type MqttStatus } from "../../types";

interface Props {
  status: MqttStatus;
}

const MqttStatusChip: React.FC<Props> = ({ status }) => (
  <Chip
    label={status}
    color={status === "Connected" ? "success" : "default"}
    size="small"
  />
);

export default MqttStatusChip;
