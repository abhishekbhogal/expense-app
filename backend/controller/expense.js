const ExpenseSchema = require('../models/ExpenseModel');


exports.addExpense = async (req, res) => {
  const { title, amount, category, description, date } = req.body;
  // console.log(req.body);
  const income = ExpenseSchema({ title, amount, category, description, date })
  console.log(income);
  try {
    //validations
    if (!title || !amount || !category || !description || !date) {
      return res.status(400).json({ message: "Invalid Message Sent" })
    }
    if (amount <= 0 || !amount === 'Number') {
      return res.status(400).json({ message: "Amount must be greater than 0 and must be a number" })
    }
    await income.save()
    res.status(200).json({ "message": "Expense Added" })
  }
  catch (error) {
    res.status(500).json({ "message": "Server Error" })
  }

  console.log(income);
}

exports.getExpense = async (req, res) => {
  try {
    const incomes = await ExpenseSchema.find().sort({ createdAt: -1 })
    res.status(200).json(incomes)
  } catch (error) {
    res.status(500).json({ "message": "Server Error" })
  }
}


exports.deleteExpense = async (req, res) => {
  const { id } = req.params;
  ExpenseSchema.findByIdAndDelete(id).then((income) => {
    res.status(200).json({ "message": "Expense Deleted" })
  }).catch((err) => {
    res.status(500).json({ "message": "Server Error" })
  })
}