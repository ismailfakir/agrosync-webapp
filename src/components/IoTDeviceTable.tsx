import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Stack,
  IconButton,
  Tooltip,
  TableSortLabel,
  TablePagination,
  TextField,
  Skeleton,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PowerIcon from "@mui/icons-material/Power";
import { type IoTDevice } from "../types";

/**
 * Device status enum
 */
export enum DeviceStatus {
  ONLINE = "ONLINE",
  OFFLINE = "OFFLINE",
}

/**
 * IoT Device model
 */
/* export interface IoTDevice {
  id: string;
  name: string;
  deviceId: string;
  location?: string;
  status: DeviceStatus;
} */

interface IoTDeviceTableProps {
  devices: IoTDevice[];
  loading?: boolean;
  onRefresh?: () => void;
  onEdit?: (device: IoTDevice) => void;
  onDelete?: (device: IoTDevice) => void;
  onControl?: (device: IoTDevice) => void;
  onRowClick?: (device: IoTDevice) => void;
}

const statusColorMap: Record<DeviceStatus, "success" | "default"> = {
  [DeviceStatus.ONLINE]: "success",
  [DeviceStatus.OFFLINE]: "default",
};

const IoTDeviceTable: React.FC<IoTDeviceTableProps> = ({
  devices,
  loading = false,
  onRefresh,
  onEdit,
  onDelete,
  onControl,
  onRowClick,
}) => {
  const [orderBy, setOrderBy] = React.useState<keyof IoTDevice>("name");
  const [order, setOrder] = React.useState<"asc" | "desc">("asc");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [search, setSearch] = React.useState("");

  const handleSort = (property: keyof IoTDevice) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  console.log(devices);

  const filtered = devices.filter((d) =>
    [d.name, d._id, d.location]
      .filter(Boolean)
      .some((v) => v!.toLowerCase().includes(search.toLowerCase()))
  );

  const sorted = [...filtered].sort((a, b) => {
    const aVal = a[orderBy];
    const bVal = b[orderBy];
    if (aVal < bVal) return order === "asc" ? -1 : 1;
    if (aVal > bVal) return order === "asc" ? 1 : -1;
    return 0;
  });

  const paged = sorted.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Card>
      <CardHeader
        title="IoT Devices Status"
        action={
          onRefresh && (
            <Tooltip title="Refresh">
              <IconButton onClick={onRefresh}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
          )
        }
      />
      <CardContent>
        <Stack spacing={2}>
          <TextField
            placeholder="Search devices"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
          />

          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  {[
                    { key: "name", label: "Name" },
                    { key: "deviceId", label: "Device ID" },
                    { key: "location", label: "Location" },
                    { key: "status", label: "Status" },
                  ].map((col) => (
                    <TableCell key={col.key as string}>
                      <TableSortLabel
                        active={orderBy === col.key}
                        direction={order}
                        onClick={() => handleSort(col.key as keyof IoTDevice)}
                      >
                        {col.label}
                      </TableSortLabel>
                    </TableCell>
                  ))}
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {loading &&
                  Array.from({ length: rowsPerPage }).map((_, i) => (
                    <TableRow key={i}>
                      <TableCell colSpan={5}>
                        <Skeleton height={32} />
                      </TableCell>
                    </TableRow>
                  ))}

                {!loading && paged.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No devices found
                    </TableCell>
                  </TableRow>
                )}

                {!loading &&
                  paged.map((device) => (
                    <TableRow
                      key={device._id}
                      hover
                      sx={{ cursor: onRowClick ? "pointer" : "default" }}
                      onClick={() => onRowClick?.(device)}
                    >
                      <TableCell>{device.name}</TableCell>
                      <TableCell>{device._id}</TableCell>
                      <TableCell>{device.location || "—"}</TableCell>
                      <TableCell>
                        <Chip
                          label={device.status}
                          color={statusColorMap[device.status]}
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="right" onClick={(e) => e.stopPropagation()}>
                        <Stack direction="row" spacing={1} justifyContent="flex-end">
                          {onControl && (
                            <Tooltip title="Control">
                              <IconButton onClick={() => onControl(device)}>
                                <PowerIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {onEdit && (
                            <Tooltip title="Edit">
                              <IconButton onClick={() => onEdit(device)}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                          {onDelete && (
                            <Tooltip title="Delete">
                              <IconButton onClick={() => onDelete(device)}>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={sorted.length}
            page={page}
            onPageChange={(_, p) => setPage(p)}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={(e) => {
              setRowsPerPage(parseInt(e.target.value, 10));
              setPage(0);
            }}
          />
        </Stack>
      </CardContent>
    </Card>
  );
};

export default IoTDeviceTable;
