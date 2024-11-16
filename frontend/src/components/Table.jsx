import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/Select"
import { Input } from "./ui/Input"
import { Button } from "./ui/Button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/Table"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/Card"
import { Badge } from "./ui/Badge"

const SalesManagement = () => {
  const [month, setMonth] = useState('3'); // Default to March
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0); // New state to store total records

  const fetchTransactions = async () => {
    try {
      const bodyData = {
        page: page.toString(),
        perPage: '10',
        search: search,
        month: month, // Include month in the request body
      };
  
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/transaction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bodyData),
      });
      
      const data = await response.json();
      console.log("Records -> ", data.transactions[0].dateOfSale);
      setTransactions(data.transactions);
      setTotalPages(data.totalPages);
      setTotalRecords(data.totalRecords); // Set the total records from response
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  const months = [
    { value: '1', label: 'Jan' },
    { value: '2', label: 'Feb' },
    { value: '3', label: 'Mar' },
    { value: '4', label: 'Apr' },
    { value: '5', label: 'May' },
    { value: '6', label: 'Jun' },
    { value: '7', label: 'Jul' },
    { value: '8', label: 'Aug' },
    { value: '9', label: 'Sep' },
    { value: '10', label: 'Oct' },
    { value: '11', label: 'Nov' },
    { value: '12', label: 'Dec' },
  ];

  return (
    <Card className="w-full max-w-6xl mx-auto ">
      <CardHeader>
        <CardTitle>Transaction Dashboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <Select value={month} onValueChange={(value) => setMonth(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((m) => (
                <SelectItem key={m.value} value={m.value}>
                  {m.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="search"
            placeholder="Search transactions"
            className="max-w-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Sold</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>
                    <img
                      src={transaction.image}
                      alt={transaction.title}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                  </TableCell>
                  <TableCell>{transaction.title}</TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell>{transaction.category}</TableCell>
                  <TableCell>${transaction.price.toFixed(2)}</TableCell>
                  <TableCell>
                  {new Date(transaction.dateOfSale).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                  })}
                </TableCell>

                  <TableCell>
                    <Badge variant={transaction.sold ? "success" : "secondary"}>
                      {transaction.sold ? "Sold" : "Available"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span>
            Page {page} of {totalPages} ({totalRecords} records)
          </span>
          <Button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SalesManagement;
