<template id="product">
    <div class="container-sm" style="padding: 25px;">
    <div class="row column-container m-0 no-gutters" style="position:relative;">
        <div class="column-element content-container align-self-default col">
    <div style="color: rgb(255, 255, 255); font-weight: 500; font-size: 14px; font-family: inherit; padding: 10px; margin: 0px; border-width: 0px; border-style: solid; border-color: rgb(218, 223, 225);">
    <div class="row m-0">
        <div class="col-lg-12 p-0">
            <div style="position: relative; line-height: normal; text-align: center;">
                <button class="btn btn-default font-family-inherit" style="font-size: inherit; color: inherit; font-weight: inherit; font-family: inherit; line-height: normal; word-break: break-word; outline: none; padding: 10px; border-radius: 3px; border-width: 1px; border-style: solid; border-color: rgb(52, 152, 219); background-color: rgb(52, 152, 219);">Add product to cart
                </button>
            </div>
        </div>
    </div>
    </div>
    <div class="table-container">
    <table class="product-table">
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Frequency</th>
          <th>Price</th>
          <th>Discount</th>
          <th>Tax Rate</th>
          <th>Amount</th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td class="product-cell">
            <div class="product-info">
              <div class="product-icon">
                <i class="fa fa-shopping-cart"></i>
              </div>
              <span>dsfvdg</span>
            </div>
          </td>
          <td>1</td>
          <td>1</td>
          <td v-html="getCurrencySymbol('USD-$') + 43 + getFrequencyType('DAILY', 1)"></td>
          <td>-</td>
          <td>-</td>
          <td v-html="getCurrencySymbol('USD-$') + 43"></td>
        </tr>
      </tbody>
    </table>
  </div>
  </div>
  </div>
</div>
</template>

<script>
export default {
  name: "productComponent",
  props: ['content', 'viewport', 'renderby'],
  methods: {
    getFrequencyType(frequencyType, frequencyValue) {

      switch (frequencyType) {
      case "ONE_TIME":
        return ""
      case "DAILY":
        return "/day"
      case "EXACT_DAYS":
        return "/" + frequencyValue + " day(s)"
      case "WEEKLY":
        return "/week"
      case "EXACT_WEEKS":
        return "/" + frequencyValue + " week(s)"
      case "MONTHLY":
        return "/month"
      case "EXACT_MONTHS":
        return "/" + frequencyValue +" month(s)"
      case "YEARLY":
        return "/year"
      case "EXACT_YEARS":
        return "/" + frequencyValue +" year(s)"
      }

      return "";

    },
    getCurrencySymbol(currencyType) {

      if (currencyType) {
        var arr = currencyType.split('-');
  
        var currecy = arr[1];
        if(currecy.toUpperCase() == 'DH' && arr[0] == 'AED')
          currecy = 'AED';
  
        return currecy;
      } else
        return "$";

    },
    getProductTax(properties) {

      // Get tax rate
      var taxRate = 0;
      try {

        properties.forEach(function(prop) {
          if (prop.field_type == 'TAX')
            taxRate += Number(prop.value);
        });

        if (taxRate > 0) {
          return taxRate + "%";
        }

      } catch (e) {
        return "-";
      }

      return "-";
    },
    calculateProductActualAmountFromDiscount(amount, discount, discountType, properties, quantity, frequency_quantity) {

      if (!frequency_quantity)
        frequency_quantity = 1
      // if (!discount || discount == 0)
      // 	return amount * quantity * frequency_quantity;
	
      if(!amount)
        amount = 0;

      var finalAmount = amount

      if (discountType && discountType == "PERCENTAGE" && discount) {
        finalAmount = (amount - (discount / 100) * amount);
      } else if(discount){
        finalAmount = (amount - discount);
      }

      // Get tax rate
      var taxRate = 0;
      try {
        properties.forEach(function(prop) {
          if (prop.field_type == 'TAX')
            taxRate += Number(prop.value);
        });

        if (taxRate > 0) {
          finalAmount = finalAmount + ((taxRate / 100) * finalAmount);
        }

      } catch (e) {
      }
	
      return (Math.round(Number(finalAmount) * 100) / 100) * quantity * frequency_quantity;
    },
    roundNumberBy2(val) {
      try {
        if (!val)
          return val;

        return Math.round(Number(val) * 100) / 100;
      } catch (e) {
      }

      return val;
    }
  }
}
</script>

<style scoped>
.table-container {
  overflow-x: auto;
  margin-top: 1rem;
}

.product-table {
  width: 100%;
  border-collapse: collapse;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
}

.product-table th {
  text-align: left;
  color: #888;
  font-weight: 600;
  padding: 12px 8px;
  border-bottom: 1px solid #eee;
}

.product-table td {
  padding: 12px 8px;
  border-bottom: 1px solid #f3f3f3;
  color: #444;
  vertical-align: middle;
}

.product-cell .product-info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.product-icon {
  background-color: #6c43f3;
  color: white;
  width: 35px;
  height: 35px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
