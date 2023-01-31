import { useEffect, useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
} from "@mantine/core";
import { keys } from "@mantine/utils";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons";
import apiBack from "../../utils/axios-api";
import { IUser } from "../../utils/Interface/User";
import { PostProps } from "../../providers/PostProvider";

interface TableSortProps {
  data: IUser[];
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text weight={500} size="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size={14} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: IUser[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toString().toLowerCase().includes(query))
  );
}

function sortData(
  data: IUser[],
  payload: { sortBy: keyof IUser | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].localeCompare(a[sortBy]);
      }

      return a[sortBy].localeCompare(b[sortBy]);
    }),
    payload.search
  );
}

export function SearchUser( {data}: TableSortProps) {
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState<IUser[]>([]);
  const [sortBy, setSortBy] = useState<keyof IUser | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  useEffect(() => {
    apiBack
      .get("/user")
      .then((response) => {
        setSortedData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const setSorting = (field: keyof IUser) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const rows = sortedData.map((row) => (
    <tr key={row.email}>
      <td>{row.firstname}</td>
      <td>{row.lastname}</td>
      <td>{row.email}</td>
    </tr>
  ));

  return (
    <ScrollArea className="w-4/5 mx-auto mt-3 pb-20">
      <TextInput
        placeholder="Search by any field"
        mb="md"
        icon={<IconSearch size={14} stroke={1.5} />}
        value={search}
        onChange={handleSearchChange}
        // TODO: Search bar doesn't work
      />
      <Table
        horizontalSpacing="md"
        verticalSpacing="xs"
        sx={{ tableLayout: "fixed", minWidth: 700 }}
      >
        <thead>
          <tr>
            <Th
              sorted={sortBy === "firstname"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("firstname")}
            >
              Prénom
            </Th>
            <Th
              sorted={sortBy === "lastname"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("lastname")}
            >
              Nom
            </Th>
            <Th
              sorted={sortBy === "email"}
              reversed={reverseSortDirection}
              onSort={() => setSorting("email")}
            >
              Email
            </Th>
          </tr>
        </thead>
        <tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <tr>
              <td>
                <Text weight={500} align="center">
                  Nothing found
                </Text>
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </ScrollArea>
  );
}

const useStyles = createStyles(() => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
  },

  icon: {
    width: 21,
    height: 21,
    borderRadius: 21,
  },
}));
