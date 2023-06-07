const getTotalExpense = (expenseList) => {
  if (!expenseList.length) {
    return 'Please book some rooms!'
  }
  return expenseList.reduce((totalExpense, costPerRoom) => {
    return totalExpense += costPerRoom
  }, 0).toFixed(2)
}

export { getTotalExpense }