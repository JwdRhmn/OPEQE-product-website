import getItemTotals from "./getItemTotals";

export default state => getData(state.cart.details);

const getData = cart => {
  const out = {
    quantity: 0,
    price: 0,
    preparation: 0,
    fees: [
      {
        title: "delivery",    
        amount: 0
      },
      {
        title: "service",    
        amount: 0
      }
    ],
    items: [], 
    discount: [],               
    total: 0,
  }

  const totalItemsData = getItemTotals(cart);

  out.fees = totalItemsData.fees;
  out.discount = totalItemsData.rewards.concat(totalItemsData.specials);
  out.preparation = totalItemsData.preparation;
  out.price = totalItemsData.totals.price;
  out.quantity = totalItemsData.totals.quantity;

  out.items = cart.items.map( item => {
    return {
      productId: item.id,
      title: item.title,
      quantity: item.quantity,
      note: item.note,
      price: item.price,
      total: item.total,
      preparation: item.preparation,
      options: item.options,
      indexes: JSON.stringify(
        stringifyIndexes(item.indexes)
      ),
      subscription: item.subscription
    };
  });

  const totalDiscount = out.discount.reduce( (total, discount) => total + discount.amount , 0);


  let total = out.price;
  total -= totalDiscount;
  total += out.fees.reduce((total, fee) => (total + fee.amount), 0);
  out.total = total;

  return out;
}




const stringifyIndexes = indexes => {
  const out = [];
  for( let i = 0; i < indexes.length; i++){
    indexes[i].forEach(index => {
      out.push([i, index]);
    })
  }

  return out;
}