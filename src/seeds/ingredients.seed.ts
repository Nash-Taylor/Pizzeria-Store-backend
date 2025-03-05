import { Ingredient } from '../models/ingredient.model';

export const ingredientsSeedData = [
  // CRUSTS
  { id: 1, name: "Small Thin Crust", price: 8.99, available: true },
  { id: 2, name: "Medium Thin Crust", price: 10.99, available: true },
  { id: 3, name: "Large Thin Crust", price: 12.99, available: true },
  
  { id: 4, name: "Small Classic Hand Tossed", price: 9.99, available: true },
  { id: 5, name: "Medium Classic Hand Tossed", price: 11.99, available: true },
  { id: 6, name: "Large Classic Hand Tossed", price: 13.99, available: true },
  
  { id: 7, name: "Small Cheese Burst", price: 11.99, available: true },
  { id: 8, name: "Medium Cheese Burst", price: 13.99, available: true },
  { id: 9, name: "Large Cheese Burst", price: 15.99, available: true },

  // SAUCES
  { id: 10, name: "Regular Marinara Sauce", price: 0.00, available: true },
  { id: 11, name: "Extra Marinara Sauce", price: 1.00, available: true },
  
  { id: 12, name: "Regular BBQ Sauce", price: 0.50, available: true },
  { id: 13, name: "Extra BBQ Sauce", price: 1.50, available: true },
  
  { id: 14, name: "Regular Garlic White Sauce", price: 0.50, available: true },
  { id: 15, name: "Extra Garlic White Sauce", price: 1.50, available: true },

  { id: 16, name: "Regular Tandoori Sauce", price: 0.50, available: true },
  { id: 17, name: "Extra Tandoori Sauce", price: 1.50, available: true },

  { id: 18, name: "Regular Pesto Sauce", price: 0.75, available: true },
  { id: 19, name: "Extra Pesto Sauce", price: 1.75, available: true },

  { id: 20, name: "Regular Buffalo Sauce", price: 0.50, available: true },
  { id: 21, name: "Extra Buffalo Sauce", price: 1.50, available: true },

  { id: 22, name: "Regular Alfredo Sauce", price: 0.75, available: true },
  { id: 23, name: "Extra Alfredo Sauce", price: 1.75, available: true },

  // TOPPINGS - VEGGIES
  { id: 24, name: "Regular Mushrooms", price: 1.50, available: true },
  { id: 25, name: "Extra Mushrooms", price: 2.50, available: true },
  
  { id: 26, name: "Regular Bell Peppers", price: 1.00, available: true },
  { id: 27, name: "Extra Bell Peppers", price: 2.00, available: true },
  
  { id: 28, name: "Regular Red Onions", price: 1.00, available: true },
  { id: 29, name: "Extra Red Onions", price: 2.00, available: true },
  
  { id: 30, name: "Regular Black Olives", price: 1.50, available: true },
  { id: 31, name: "Extra Black Olives", price: 2.50, available: true },

  { id: 32, name: "Regular Sweet Corn", price: 1.00, available: true },
  { id: 33, name: "Extra Sweet Corn", price: 2.00, available: true },

  { id: 34, name: "Regular Jalapeños", price: 1.25, available: true },
  { id: 35, name: "Extra Jalapeños", price: 2.25, available: true },

  { id: 36, name: "Regular Baby Spinach", price: 1.50, available: true },
  { id: 37, name: "Extra Baby Spinach", price: 2.50, available: true },

  { id: 38, name: "Regular Pineapple", price: 1.50, available: true },
  { id: 39, name: "Extra Pineapple", price: 2.50, available: true },

  { id: 40, name: "Regular Sun-Dried Tomatoes", price: 1.75, available: true },
  { id: 41, name: "Extra Sun-Dried Tomatoes", price: 2.75, available: true },

  // TOPPINGS - MEATS
  { id: 42, name: "Regular Pepperoni", price: 2.00, available: true },
  { id: 43, name: "Extra Pepperoni", price: 3.50, available: true },
  
  { id: 44, name: "Regular Italian Sausage", price: 2.00, available: true },
  { id: 45, name: "Extra Italian Sausage", price: 3.50, available: true },
  
  { id: 46, name: "Regular Grilled Chicken", price: 2.00, available: true },
  { id: 47, name: "Extra Grilled Chicken", price: 3.50, available: true },

  { id: 48, name: "Regular Tandoori Chicken", price: 2.25, available: true },
  { id: 49, name: "Extra Tandoori Chicken", price: 3.75, available: true },

  { id: 50, name: "Regular BBQ Chicken", price: 2.25, available: true },
  { id: 51, name: "Extra BBQ Chicken", price: 3.75, available: true },

  { id: 52, name: "Regular Ham", price: 2.00, available: true },
  { id: 53, name: "Extra Ham", price: 3.50, available: true },

  { id: 54, name: "Regular Bacon", price: 2.00, available: true },
  { id: 55, name: "Extra Bacon", price: 3.50, available: true },

  // TOPPINGS - CHEESE
  { id: 56, name: "Regular Mozzarella", price: 1.50, available: true },
  { id: 57, name: "Extra Mozzarella", price: 2.50, available: true },
  
  { id: 58, name: "Regular Parmesan", price: 1.50, available: true },
  { id: 59, name: "Extra Parmesan", price: 2.50, available: true },

  { id: 60, name: "Regular Cheddar", price: 1.50, available: true },
  { id: 61, name: "Extra Cheddar", price: 2.50, available: true },

  { id: 62, name: "Regular Feta", price: 1.75, available: true },
  { id: 63, name: "Extra Feta", price: 2.75, available: true },

  { id: 64, name: "Regular Gouda", price: 1.75, available: true },
  { id: 65, name: "Extra Gouda", price: 2.75, available: true }
];

export async function seedIngredients() {
  try {
    // Create all ingredients
    await Ingredient.bulkCreate(ingredientsSeedData, {
      updateOnDuplicate: ['name', 'price', 'available']
    });
    console.log('Ingredients seeded successfully');
  } catch (error) {
    console.error('Error seeding ingredients:', error);
    throw error;
  }
} 