import React from "react";
import Item from "./Item";
import { MdDelete } from "react-icons/md";

const List = ({ expenses, handleEdit, handleDelete, clearItems }) => {
  return (
    <>
      <ul className="list">
        {expenses.map((expense) => {
          return (
            <Item
              key={expense.id}
              expense={expense}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          );
        })}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          Clear expenses
          <MdDelete className="btn-icon" />
        </button>
      )}
    </>
  );
};

export default List;
