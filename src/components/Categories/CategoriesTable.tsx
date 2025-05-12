import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";

interface CategoriesTableProps {
  columns: string[];
  attributes: string[];
  data: object[];
}

interface IGetAttribute {
  name: {
    FA: string,
    EN: string
  },
  slug:string
}

const getKeyValue =
  <T extends object, U extends keyof T>(key: U) =>
    (obj: T) => obj[key]

const CategoriesTable = ({
  columns,
  attributes,
  data,
}: CategoriesTableProps) => {
  const getName = getKeyValue<IGetAttribute, "name">("name")
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col, index) => (
              <TableCell key={index}>{col}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data && data.map((item, i) => (
            <TableRow key={i}>
              {attributes.map((attr: string, i) => (
                <TableCell key={i}>
                  {attr == "name" ? (item as IGetAttribute)["name"].FA : getKeyValue(attr as never)(item)}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoriesTable;
