import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@mui/material';
import { deleteItem, disableItem, editItem, type Product } from '../store/reducers/inventory';
import { FaEye, FaEyeSlash, FaTrash } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../store/store';
import EditProductModal , {type Product as FormDataType} from './editPoup';

interface InventoryTableProps {
  products: Product[];
}

const TABLE_COLUMNS = [
  { id: 'name', label: 'Name' },
  { id: 'category', label: 'Category' },
  { id: 'price', label: 'Price' },
  { id: 'quantity', label: 'Quantity' },
  { id: 'value', label: 'Value' },
  { id: 'action', label: 'Action' },
]


const TableHeader: React.FC = () => (
  <TableHead className="bg-gray-700">
    <TableRow>
      {TABLE_COLUMNS.map((column) => (
        <TableCell 
          key={column.id} 
          sx={{ color: 'white', fontWeight: 'bold' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  </TableHead>
);

interface ActionButtonsProps {
  product: Product;
  isActionButtonDisabled: boolean;
  onDisable: (id: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  product,
  isActionButtonDisabled,
  onDisable,
  onEdit,
  onDelete
}) => (
  <div className="flex flex-row gap-2">
    <button 
      onClick={() => onDisable(product.id)} 
      disabled={isActionButtonDisabled} 
      className="disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
      aria-label={product.isDisabled ? "Show product" : "Hide product"}
    >
      {product.isDisabled ? (
        <FaEyeSlash color={isActionButtonDisabled ? 'gray' : 'white'} />
      ) : (
        <FaEye color={isActionButtonDisabled ? 'gray' : 'white'} />
      )}
    </button>
    
    <button 
      disabled={product.isDisabled || isActionButtonDisabled} 
      className="disabled:cursor-not-allowed hover:opacity-80 transition-opacity"  
      onClick={() => onEdit(product)}
      aria-label="Edit product"
    >
      <MdModeEdit 
        color={product.isDisabled || isActionButtonDisabled ? 'gray' : 'green'} 
      />
    </button>
    
    <button 
      onClick={() => onDelete(product.id)} 
      disabled={isActionButtonDisabled} 
      className="disabled:cursor-not-allowed hover:opacity-80 transition-opacity"
      aria-label="Delete product"
    >
      <FaTrash color={isActionButtonDisabled ? 'gray' : 'red'} />
    </button>
  </div>
);

interface ProductRowProps {
  product: Product;
  isActionButtonDisabled: boolean;
  onDisable: (id: number) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductRow: React.FC<ProductRowProps> = ({
  product,
  isActionButtonDisabled,
  onDisable,
  onEdit,
  onDelete
}) => {
  const totalValue = product.quantity * product.price;

  return (
    <TableRow
      className={`${product.isDisabled ? 'bg-gray-500' : 'bg-gray-800'} transition-colors`}
    >
      <TableCell sx={{ color: 'white' }}>{product.name}</TableCell>
      <TableCell sx={{ color: 'white' }}>{product.category}</TableCell>
      <TableCell sx={{ color: 'white' }}>${product.price}</TableCell>
      <TableCell sx={{ color: 'white' }}>{product.quantity}</TableCell>
      <TableCell sx={{ color: 'white' }}>${totalValue}</TableCell>
      <TableCell sx={{ color: 'white' }}>
        <ActionButtons
          product={product}
          isActionButtonDisabled={isActionButtonDisabled}
          onDisable={onDisable}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </TableCell>
    </TableRow>
  );
};

const EmptyState: React.FC = () => (
  <TableRow>
    <TableCell colSpan={6} sx={{ textAlign: 'center', py: 4, color: 'gray' }}>
      No products found
    </TableCell>
  </TableRow>
);

// main component
const InventoryTable: React.FC<InventoryTableProps> = ({ products }) => {
  const [isEditModalOpen, setIsEditModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.userRole.role);
  const isActionButtonDisabled = role === 'user';

  const visibleProducts = useMemo(() => {
    if (role === 'user') {
      return products.filter(product => !product.isDisabled);
    }
    return products;
  }, [products, role]);


  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModal(true);
  };

  const handleCloseModal = () => {
    setIsEditModal(false);
    setSelectedProduct(null);
  };

  const handleDisable = (id: number) => {
    dispatch(disableItem({ id }));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteItem({ id }));
  };

  const handleSave = (updatedProduct: FormDataType) => {
    if (!selectedProduct) return;

    const updateValue = {
      price: Number(updatedProduct.price),
      quantity: Number(updatedProduct.quantity),
      name: updatedProduct.name,
      category: updatedProduct.category
    };

    dispatch(editItem({ id: selectedProduct.id, data: updateValue }));
    handleCloseModal();
  };


  return (
    <>
      <TableContainer
        component={Paper}
        sx={{
          margin: '20px auto',
          boxShadow: 3,
          borderRadius: 2,
          overflow: 'hidden'
        }}
      >
        <Table sx={{ minWidth: 650 }}>
          <TableHeader />
          
          <TableBody>
            {visibleProducts.length === 0 ? (
              <EmptyState />
            ) : (
              visibleProducts.map((product) => (
                <ProductRow
                  key={product.id}
                  product={product}
                  isActionButtonDisabled={isActionButtonDisabled}
                  onDisable={handleDisable}
                  onEdit={handleEditClick}
                  onDelete={handleDelete}
                />
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <EditProductModal
        open={isEditModalOpen}
        onClose={handleCloseModal}
        product={selectedProduct}
        onSave={handleSave}
      />
    </>
  );
};

export default InventoryTable;