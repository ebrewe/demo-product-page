<template>
  <table class="product-table table-desktop" aria-labelledby="table-caption" ref="table">
    <caption id="table-caption" >
      Products 
      <span class="product-count">
        {{ products.length }} of {{ props.totalProducts }} results
      </span>
    </caption>
    <thead>
      <tr>
        <th 
          v-for="column in columndefs" 
          :data-column="column.prop" 
          :key="column.prop" 
          :style="{ width: `${column.width}px` }"
        >
        <template v-if="column.prop === 'total'">
            <div class="column-total">
              {{  column.title }}
              <div v-if="column.prop === 'total'" @click="sortPrices">
                <span role="button" aria-label="sort ascending" v-if="sortOrder === 'ascending'">▲</span>
                <span role="button" aria-label="sort descending" v-else-if="sortOrder === 'descending'">▼</span>
                <span role="button" aria-label="clear sort" v-else>▲▼</span>
              </div>
            </div>
          </template>
          <template v-else>
            {{ column.title }}
          </template>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr 
        v-for="product in sortedProducts" 
        :key="product.id" 
        @click="setSelectedProduct(product)" 
        role="button" 
        :aria-selected="selectedProduct === product"
        :aria-label="product.product"
        tabindex="0"
        :data-product-id="product.id"
      >
        <td v-for="column in columndefs" :data-column="column.prop" :key="column.title">
          <template v-if="column.prop === 'status'">
            <TCTag :status="getRandomStatus()">Status</TCTag>
          </template>
          <!-- for product-->
          <template v-else-if="column.prop === 'product'">
            <div class="product-name">
              {{ product.product }}
            </div>
            <div class="product-serial">
              {{ product.serial }}
            </div>
          </template>
          <template v-else-if="column.prop === 'total'">
            ${{ productTotal(product.total) }}
          </template>
          <template v-else>{{ product[column.prop as keyof Product] }}
          </template>
        </td>
      </tr>
    </tbody>
  </table>
  <TCModal :is-open="selectedProduct !== null" @close="clearSelectedProduct" :title="selectedProduct?.product">
    <ProductModalInfo :product="selectedProduct" v-if="selectedProduct"/>
  </TCModal>
</template>

<script setup lang="ts">
import { ref, toRef, computed, onMounted, onBeforeUnmount } from 'vue';
import { type Product } from '@/types/Product';
import TCTag from '@/components/Tag/TCTag.vue';
import TCModal from '@/components/Modal/TCModal.vue';
import ProductModalInfo from './ProductModalInfo.vue';

enum Status {
  Primary = 'Primary',
  Secondary = 'Secondary',
  Warning = 'Warning',
  Danger = 'Danger',
}

interface ColumnDef {
  title: string;
  prop: keyof Product | 'status';
  width: number;
}

const props = defineProps({
  products: {
    type: Array as () => Product[],
    required: true,
  },
  totalProducts: {
    type: Number,
    required: true,
  },
  searchQuery: {
    type: String,
    required: false,
  },
});

const products = toRef(props, 'products');

const table = ref<HTMLElement | null>(null);

const columndefs = ref<ColumnDef[]>([
  {
    'title': 'ID',
    'prop': 'id' as keyof Product,
    width: 70, 
  },
  {
    'title': 'Status',
    'prop': 'status',
    width: 144,
  },
   {
    'title': 'Quantity',
    'prop': 'quantity' as keyof Product,
    width: 125,
  },
   {
    'title': 'Product Name',
    'prop': 'product' as keyof Product,
    width: 671,
  },
  {
    'title': 'Prices',
    'prop': 'total' as keyof Product,
    width: 171
  }]);
const sortOrder = ref<'ascending' | 'descending' | 'none' | 'other'>('none');

const selectedProduct = ref<Product | null>(null);


// Just grab a random status for now. 
const getRandomStatus = () => {
  const statuses = Object.values(Status);
  return statuses[Math.floor(Math.random() * statuses.length)];
};

//set the selected product
const setSelectedProduct = (product: Product) => {
  selectedProduct.value = product;
  // blur the active tr
  const active = table.value?.querySelector('tr:focus');
  if (active) {
    (active as HTMLElement).blur();
  }
  
};

const setSelectedProductById = (id: number) => {
  const product = products.value.find((product) => product.id === id);
  if (product) {
    setSelectedProduct(product);
  }
};


const clearSelectedProduct = () => {
  const previousSelected = selectedProduct.value;
  selectedProduct.value = null;
  
};

const filterProductsBySearch = (products: Product[], searchTerm: string) => {
  return products.filter((product) => {
    return product.product.toLowerCase().includes(searchTerm.toLowerCase());
  });
};

const sortedProducts = computed(() => {
  if (sortOrder.value === 'ascending') {
    return filterProductsBySearch(products.value, props.searchQuery || '').slice().sort((a, b) => a.total - b.total);
  } else if (sortOrder.value === 'descending') {
    return filterProductsBySearch(products.value, props.searchQuery || '').slice().sort((a, b) => b.total - a.total);
  }
  return filterProductsBySearch(products.value, props.searchQuery || '');
});

const sortPrices = () => {
  if (sortOrder.value === 'ascending') {
    sortOrder.value = 'descending';
  } else if (sortOrder.value === 'descending') {
    sortOrder.value = 'none';
  } else {
    sortOrder.value = 'ascending';
  }
};

const productTotal = (total: number) => {
  return total && total.toFixed(2) || '0.00';
};


const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    // trigger click event on the active element if it's a tr
    if (document.activeElement?.tagName === 'TR') {
      const id = parseInt((document.activeElement as HTMLElement).dataset.productId || '');
      if (id) {
        setSelectedProductById(id);
      }
    }
  }
  // arrows
  if (e.key === 'ArrowDown') {
    const rows = table.value?.querySelectorAll('tr');
    if (rows) {
      const index = Array.from(rows).findIndex((row) => row === document.activeElement);
      if (index < rows.length - 1) {
        rows[index + 1].focus();
      } else {
        rows[0].focus();
      }
    }
  }

  if(e.key === 'ArrowUp') {
    const rows = table.value?.querySelectorAll('tr');
    if (rows) {
      const index = Array.from(rows).findIndex((row) => row === document.activeElement);
      if (index > 0) {
        rows[index - 1].focus();
      } else {
        rows[rows.length - 1].focus();
      }
    }
  }
};

onMounted(() => {
  if (table.value) {
    table.value.addEventListener('keydown', handleKeydown);
  }
});

onBeforeUnmount(() => {
  if (table.value) {
    table.value.removeEventListener('keydown', handleKeydown);
  }
});
</script>

<style lang="scss" scoped>
.product-table {
  margin: 0 1px;
  width: 100%;
  border: 1px solid var(--color-border);
  border-radius: var(--base-radius);

  caption {
    font-weight: bold;
    margin-bottom: 1rem;
    text-align: left;

    .product-count {
      font-size: var(--font-small);
      font-weight: normal;
      color: var(--color-text-light);
      border: 1px solid black;
    }
  }
  
}
tr {
    cursor: pointer;

    &:focus,
    &:hover {
      background-color: var(--color-button-secondary);
  
      .tc-tag {
        border-color: black;
      }
      .product-name {
        color: var(--color-primary);
        font-weight: bold;
      }
    }
  
    &:focus-visible {
      outline: 2px solid black;
    }
  td, th {
    border-bottom: 1px solid var(--color-border);
  }
  &:last-child {
    td {
      border-bottom: none;
    }
  }
}
th, td {
  text-align: center;
  &:last-child {
    border-left: 1px solid var(--color-border);
  }
}
th {
  padding: var(--base-padding-y) var(--base-padding-x);
  font-size: var(--base-font-size);


  &[data-column="id"] {
    text-align: left;
  }
  &[data-column="product"] {
    $others: calc(70 + 144 + 125 + 171);
    max-width: calc(100% - #{$others}px);
  }

  .column-total {
    display: flex;
    justify-content: center;
    gap: 36px;
    align-items: center;
  }

   
  &:not([data-column="product"]) {
    display:none;
  }

  @media(min-width: 992px) {
    display: table-cell !important;
  }
}

td {
  font-size: var(--table-font-size);
  padding: var(--padding-y-small) var(--base-padding-x);
  
  &[data-column="product"] {
   text-align: left;
  }
  &[data-column="total"]{
    text-align: right;
  }

  &:not([data-column="product"]) {
    display:none;
  }

  @media(min-width: 992px) {
    display: table-cell !important;
  }
}

.product-serial {
  font-size: var(--font-small);
  color: var(--color-text-light);
}
</style>
