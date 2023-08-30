import { createContext, useContext, useState } from "react";
import axios from "axios";

const BASE_URL = "http://localhost:500/api/v1/";

const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {

  const [incomes, setIncomes] = useState([])
  const [expenses, setExpenses] = useState([])
  const [error, setError] = useState(null)



  //calculate incomes
  const addIncome = async (income) => {
    const response = await axios.post(`${BASE_URL}add-income`, income)
      .catch((err) => {
        setError(err.response.data.message)
      })
    getIncomes()
  }

  const getIncomes = async () => {
    try {
      const response = await axios.get(`${BASE_URL}get-income`);
      setIncomes(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching incomes:", error);
      setError("An error occurred while fetching incomes.");
    }
  };


  const deleteIncome = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-income/${id}`)
    getIncomes()
  }

  const totalIncome = () => {
    let totalIncome = 0;
    incomes.forEach((income) => {
      totalIncome = totalIncome + income.amount
    })

    return totalIncome;
  }


  //calculate incomes
  const addExpense = async (income) => {
    const response = await axios.post(`${BASE_URL}add-expense`, income)
      .catch((err) => {
        setError(err.response.data.message)
      })
    getExpenses()
  }


  const getExpenses = async () => {
    const response = await axios.get(`${BASE_URL}get-expense`)
    setExpenses(response.data)
    console.log(response.data)
  }

  const deleteExpense = async (id) => {
    const res = await axios.delete(`${BASE_URL}delete-expense/${id}`)
    getExpenses()
  }


  const totalExpenses = () => {
    let totalIncome = 0;
    expenses.forEach((income) => {
      totalIncome = totalIncome + income.amount
    })

    return totalIncome;
  }


  const totalBalance = () => {
    return totalIncome() - totalExpenses()
  }

  const transactionHistory = () => {
    const history = [...incomes, ...expenses]
    history.sort((a, b) => {
      return new Date(b.createdAt) - new Date(a.createdAt)
    })

    return history.slice(0, 3)
  }


  return (
    <GlobalContext.Provider
      value={{
        totalBalance,
        deleteExpense,
        addExpense,
        transactionHistory,
        getExpenses,
        addIncome,
        getIncomes,
        incomes,
        deleteIncome,
        totalIncome,
        error,
        setError
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
