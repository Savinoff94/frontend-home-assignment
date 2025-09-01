import { useState } from "react";
import { CreateUserModal } from "../modals/CreateUserModal";

export function Toolbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  return (
    <>
      <div className="toolbar">
        <button onClick={() => setIsModalOpen(true)}>Create New User</button>
      </div>
      {isModalOpen && (
        <CreateUserModal
          onClose={() => setIsModalOpen(false)}
          onUserCreated={() => {
            setIsModalOpen(false);
          }}
        />
      )}
    </>
    
  );
}