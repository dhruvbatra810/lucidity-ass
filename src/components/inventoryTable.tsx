import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import { deleteItem, disableItem, editItem, type Product } from "../store/reducers/inventory";
import { FaEye } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../store/store";
import EditProductModal from "./editPoup";
import { type Product as FormDataType } from "./editPoup";

interface InventoryTableProps {
  products: Product[];
}

const InventoryTable: React.FC<InventoryTableProps> = ({ products }) => {
  const [isEditModalOpen, setIsEditModal] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  const dispatch = useAppDispatch();
  const role = useAppSelector((state) => state.userRole.role);
  const isActionButtonDisabled = role === 'user';

  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setIsEditModal(true);
  };

  const handleCloseModal = () => {
    setIsEditModal(false);
    setSelectedProduct(null); 
  };

  const handleOnSave = (updatedProduct: FormDataType) => {
    const updateValue = {
      price: Number(updatedProduct.price),
      quantity: Number(updatedProduct.quantity),
      name: updatedProduct.name,
      category: updatedProduct.category
    }
    if(selectedProduct)
    dispatch(editItem({id:selectedProduct.id,data: updateValue}))
  };

  return (
    <TableContainer
      component={Paper}
      sx={{
        margin: "20px auto",
        boxShadow: 3,
        borderRadius: 2
      }}
    >
      <EditProductModal 
        open={isEditModalOpen}  
        onClose={handleCloseModal} 
        product={selectedProduct} 
        onSave={handleOnSave}
      />
      
      <Table sx={{ minWidth: 650 }}>
        <TableHead className="bg-gray-700">
          <TableRow>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Name</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Category</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Price</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Quantity</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Value</TableCell>
            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Action</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {products.map(product => (
            <React.Fragment key={product.id}>
              {product.isDisabled && role === 'user' ? null : (
                <TableRow
                  className={`${product.isDisabled ? "bg-gray-500" : 'bg-gray-800'}`}
                >
                  <TableCell sx={{ color: "white" }}>{product.name}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.category}</TableCell>
                  <TableCell sx={{ color: "white" }}>${product.price}</TableCell>
                  <TableCell sx={{ color: "white" }}>{product.quantity}</TableCell>
                  <TableCell sx={{ color: "white" }}>${product.quantity * product.price}</TableCell>
                  <TableCell sx={{ color: "white" }}>
                    <div className="flex flex-row gap-2">
                      <button 
                        onClick={() => { dispatch(disableItem({ id: product.id })) }} 
                        disabled={isActionButtonDisabled} 
                        className="disabled:cursor-not-allowed"
                      >
                        {product.isDisabled ? (
                          <FaEyeSlash color={isActionButtonDisabled ? 'gray' : 'white'} />
                        ) : (
                          <FaEye color={isActionButtonDisabled ? 'gray' : 'white'} />
                        )}
                      </button>
                      
                      <button 
                        disabled={product.isDisabled || isActionButtonDisabled} 
                        className="disabled:cursor-not-allowed"  
                        onClick={() => handleEditClick(product)}
                      >
                        <MdModeEdit color={`${(product.isDisabled || isActionButtonDisabled) ? 'gray' : 'green'}`} />
                      </button>
                      
                      <button 
                        onClick={() => { dispatch(deleteItem({ id: product.id })) }} 
                        disabled={isActionButtonDisabled} 
                        className="disabled:cursor-not-allowed"
                      >
                        <FaTrash color={`${isActionButtonDisabled ? 'gray' : 'red'}`} />
                      </button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </React.Fragment>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default InventoryTable;