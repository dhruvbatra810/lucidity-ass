import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Modal, Box, Backdrop } from '@mui/material';
import { IoClose } from 'react-icons/io5';

export interface Product {
  name: string;
  category: string;
  price: string | number;
  quantity: string | number;
}

interface EditProductModalProps {
  open: boolean;
  onClose: () => void;
  product: Product | null;
  onSave: (product: Product) => void;
}

interface FormData {
  name: string;
  category: string;
  price: string;
  quantity: string;
}

export default function EditProductModal({
  open,
  onClose,
  product,
  onSave
}: EditProductModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    category: '',
    price: '',
    quantity: '',
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        category: product.category || '',
        price: String(product.price || ''),
        quantity: String(product.quantity || ''),
      });
    }
  }, [product]);

  const handleChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Product);
    onClose();
  };

  const handleCancel = () => {
    onClose();
  };

  if (!open) return null;

  const modalContent = (
    <Modal
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '100%',
          maxWidth: '32rem',
          bgcolor: '#2a2d35',
          borderRadius: '8px',
          boxShadow: 24,
          outline: 'none',
        }}
      >
        <form onSubmit={handleSave}>
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-white text-xl font-medium">Edit product</h2>
                <p className="text-gray-400 text-sm mt-1">{formData.name}</p>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="hover:bg-gray-800 p-1 rounded transition-colors"
              >
                <IoClose size={24} className="text-gray-400" />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">
                    Category
                  </label>
                  <input
                    required
                    type="text"
                    value={formData.category}
                    onChange={handleChange('category')}
                    className="w-full bg-[#3a3d45] text-white rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-gray-600"
                  />
                </div>

                <div>
                  <label className="text-gray-400 text-sm mb-2 block">
                    Price
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={formData.price}
                    onChange={handleChange('price')}
                    className="w-full bg-[#3a3d45] text-white rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-gray-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm mb-2 block">
                    Quantity
                  </label>
                  <input
                    required
                    type="number"
                    min="0"
                    value={formData.quantity}
                    onChange={handleChange('quantity')}
                    className="w-full bg-[#3a3d45] text-white rounded-lg px-4 py-3 text-sm outline-none border border-transparent focus:border-gray-600"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <button
                type="button"
                onClick={handleCancel}
                className="hover:bg-gray-400/10 px-6 py-2 rounded transition-colors font-medium text-gray-400"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-gray-600 hover:bg-gray-500 text-white px-8 py-2 rounded-lg transition-colors font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </Box>
    </Modal>
  );

  return createPortal(
    modalContent,
    document.body
  );
}