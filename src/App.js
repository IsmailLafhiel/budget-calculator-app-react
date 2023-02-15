import React, { useState } from "react";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Alert from "./components/Alert";
import Form from "./components/Form";
import List from "./components/List";

// const Array = [
//   { id: uuidv4(), charge: "rent", amount: 2000 },
//   { id: uuidv4(), charge: "car", amount: 500 },
//   { id: uuidv4(), charge: "electricity", amount: 300 },
// ];
const initialExpenses = localStorage.getItem("expenses")
  ? JSON.parse(localStorage.getItem("expenses"))
  : [];
function App() {
  // ---------state values--------- //
  // all expenses, add expense //
  const [expenses, setExpenses] = useState(initialExpenses);
  // single charge //
  const [charge, setCharge] = useState("");
  // single amount //
  const [amount, setAmount] = useState("");
  //alert
  const [alert, setAlert] = useState({ show: false });
  //edit
  const [edit, setEdit] = useState(false);
  //edit item
  const [id, setId] = useState(0);
  // ---------useEffect----------- //
  useEffect(() => {
    console.log("useEffect call");
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);
  // ---------functions----------- //
  // handle charge //
  const handleCharge = (e) => {
    // console.log(`charge; ${e.target.value}`);
    setCharge(e.target.value);
  };
  // handle amount //
  const handleAmount = (e) => {
    // console.log(`charge; ${e.target.value}`);
    setAmount(e.target.value);
  };
  // handle alert
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type, text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (charge !== "" && amount > 0) {
      if (edit) {
        let tempExpenses = expenses.map((item) => {
          return item.id === id ? { ...item, charge, amount } : item;
        });
        setExpenses(tempExpenses);
        setEdit(false);
        handleAlert({ type: "success", text: "item edited" });
      } else {
        const singleExpense = { id: uuidv4(), charge, amount };
        setExpenses([...expenses, singleExpense]);
        handleAlert({ type: "success", text: "item added" });
      }

      setCharge("");
      setAmount("");
    } else {
      handleAlert({
        type: "danger",
        text: "your charge should not be empty value and your amount should be bigger than zero",
      });
    }
  };
  //clear all items
  const clearItems = () => {
    // console.log('items are cleared');
    setExpenses([]);
    handleAlert({ type: "danger", text: "all items deleted" });
  };
  // handle delete
  const handleDelete = (id) => {
    // console.log(`your item ${id} is deleted successfuly`);
    const tempExpense = expenses.filter((item) => item.id !== id);
    setExpenses(tempExpense);
    handleAlert({ type: "danger", text: "item deleted" });
  };
  // handle edit
  const handleEdit = (id) => {
    // console.log(`your item  ${id} is edited successfuly`);
    const expense = expenses.find((item) => item.id === id);
    // console.log(expense);
    let { charge, amount } = expense;
    setCharge(charge);
    setAmount(amount);
    setEdit(true);
    setId(id);
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}
      <Alert />
      <h1>Budget Calculator</h1>
      <main className="App">
        <Form
          charge={charge}
          amount={amount}
          handleAmount={handleAmount}
          handleCharge={handleCharge}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <List
          expenses={expenses}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
          clearItems={clearItems}
        />
      </main>
      <h1>
        Total spending:{" "}
        <span className="total">
          $
          {expenses.reduce((acc, curr) => {
            return (acc += parseInt(curr.amount));
          }, 0)}
        </span>
      </h1>
    </>
  );
}

export default App;
