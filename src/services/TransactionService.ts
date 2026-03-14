import Transaction, {
  ITransaction,
  TransactionType,
} from "../models/Transaction";

class TransactionService {
  //Business logic for transaction
  //method to create transaction
  async create(
    data: Partial<ITransaction>,
    userId: string,
  ): Promise<ITransaction> {
    try {
      const newTransaction = new Transaction({ ...data, userId });
      return await newTransaction.save();
    } catch (error) {
      throw error;
    }
  }
  //method to get all the transaction by user ID return array of Transaction binded by interface ITransaction
  async getAll(userId: string): Promise<ITransaction[]> {
    try {
      const transaction = await Transaction.find({ userId });
      return transaction;
    } catch (e) {
      throw e;
    }
  }
  //returns transaction by id
  async getByID(transactionId: string): Promise<ITransaction | null> {
    try {
      const transaction = await Transaction.findById(transactionId);
      return transaction;
    } catch (e) {
      throw e;
    }
  }
  //delete transaction by ID
  async delete(transactionId: string): Promise<void> {
    try {
      const deleteTransaction =
        await Transaction.findByIdAndDelete(transactionId);
    } catch (error) {
      throw error;
    }
  }
  //method to generate the summary of income vs expense
  async getSummary(userId: string): Promise<object> {
    try {
      const transactions = await this.getAll(userId);
      {
        /** Solution with for each
      let incomeTotal: number = 0;
      let ExpenseTotal: number = 0;
      transactions.forEach((element) => {
        if (element.transactionType === "income") {
          incomeTotal += element.ammount;
        } else {
          ExpenseTotal += element.ammount;
        }
      });
      const balance = incomeTotal - ExpenseTotal;*/
      }
      //Solution with filter and reduce
      const incomeTotal = transactions
        .filter((t) => t.transactionType === TransactionType.Income)
        .reduce((sum, t) => sum + t.ammount, 0);
      const expenseTotal = transactions
        .filter((t) => t.transactionType === TransactionType.Expense)
        .reduce((sum, t) => sum + t.ammount, 0);
      return { incomeTotal, expenseTotal, balance: incomeTotal - expenseTotal };
      //return {incomeTotal, incomeExpense, balance}
    } catch (error) {
      throw error;
    }
  }
}

export default new TransactionService();
