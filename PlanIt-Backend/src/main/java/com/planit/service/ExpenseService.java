package com.planit.service;

import com.planit.model.Expense;

import java.util.List;

public interface ExpenseService {

    Expense addExpense(Expense expense,Long EventId);

   
    List<Expense> getExpensesForEvent(Long eventId);

   
    List<Expense> addExpenseAndSplit(Long eventId, Expense expense, String splitType);

  
    double calculateTotalExpensesForEvent(Long eventId);

   
    Expense updateExpense(Long expenseId, Expense updatedExpense);

    
    void deleteExpense(Long expenseId);
}
