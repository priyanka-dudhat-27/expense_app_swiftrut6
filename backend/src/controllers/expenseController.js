import Expense from './models/expense.js'; 

// Create Expense
app.post('/expenses', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Read (Get all expenses with advanced filtering, sorting, and pagination)
app.get('/expenses', async (req, res) => {
  const { category, startDate, endDate, paymentType, sortByAmount, sortByDate, page = 1, limit = 10 } = req.query;

  const filter = {};
  
  if (category) filter.category = category;
  if (paymentType) filter.paymentType = paymentType;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  const sort = {};
  if (sortByAmount) sort.amount = sortByAmount === 'asc' ? 1 : -1;
  if (sortByDate) sort.date = sortByDate === 'asc' ? 1 : -1;

  try {
    const expenses = await Expense.find(filter)
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const totalExpenses = await Expense.countDocuments(filter);

    res.status(200).json({
      expenses,
      totalPages: Math.ceil(totalExpenses / limit),
      currentPage: parseInt(page),
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Read (Get single expense by ID)
app.get('/expenses/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update Expense by ID
app.put('/expenses/:id', async (req, res) => {
  try {
    const updatedExpense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedExpense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json(updatedExpense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete Expense by ID
app.delete('/expenses/:id', async (req, res) => {
  try {
    const deletedExpense = await Expense.findByIdAndDelete(req.params.id);
    if (!deletedExpense) return res.status(404).json({ message: 'Expense not found' });
    res.status(200).json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
