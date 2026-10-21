// Q8. Dynamic Discount Evaluator
// Demonstrates loops, conditionals, reduce(), and category-based discounts

const cart = [
  { item: "Laptop", category: "electronics", price: 45000 },
  { item: "Shoes",  category: "fashion",     price: 2500  },
  { item: "Book",   category: "education",   price: 600   }
];

console.log("===== Dynamic Discount Evaluator =====");

// Apply per-item discounts based on category using map()
const discountedCart = cart.map(product => {
  let discountRate = 0;

  if (product.category === "electronics") {
    discountRate = 0.10; // 10% discount
  } else if (product.category === "fashion") {
    discountRate = 0.05; // 5% discount
  }
  // Education category gets no individual discount

  const discount = product.price * discountRate;
  const discountedPrice = product.price - discount;

  console.log(
    `${product.item} (${product.category}): ₹${product.price} - ${discountRate * 100}% = ₹${discountedPrice.toFixed(2)}`
  );

  return { ...product, discountedPrice };
});

// Calculate total cart value after individual discounts using reduce()
let totalAfterItemDiscounts = discountedCart.reduce(
  (sum, product) => sum + product.discountedPrice, 0
);

console.log(`\nTotal after item discounts : ₹${totalAfterItemDiscounts.toFixed(2)}`);

// Apply extra 5% overall discount if total cart value > ₹50,000
// Note: We check original total before item discounts per common retail logic
const originalTotal = cart.reduce((sum, p) => sum + p.price, 0);

if (originalTotal > 50000) {
  const extraDiscount = totalAfterItemDiscounts * 0.05;
  totalAfterItemDiscounts -= extraDiscount;
  console.log(`Extra 5% discount applied (cart > ₹50,000): -₹${extraDiscount.toFixed(2)}`);
}

console.log(`Final Total                : ₹${totalAfterItemDiscounts.toFixed(2)}`);
console.log("=======================================");
