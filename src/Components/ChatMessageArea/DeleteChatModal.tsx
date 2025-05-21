// src/components/ChatMessageArea/DeleteChatModal.tsx
import { motion } from "framer-motion";

interface DeleteChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  chatName: string;
}

const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
};

const DeleteChatModal = ({
  isOpen,
  onClose,
  onConfirm,
  chatName,
}: DeleteChatModalProps) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center z-50"
      variants={modalVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div
        className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg z-10"
        variants={modalVariants}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">
          حذف چت
        </h3>
        <p className="text-gray-600 mb-6 text-center">
          آیا مطمئن هستید که می‌خواهید چت با{" "}
          <span className="font-medium">{chatName}</span> را حذف کنید؟
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={onConfirm}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            بله
          </button>
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors cursor-pointer"
          >
            لغو
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DeleteChatModal;