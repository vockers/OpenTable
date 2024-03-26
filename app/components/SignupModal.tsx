"use client"
import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [inputs, setInputs] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    city: "",
    password: ""
  })
  
  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setDisabled(!inputs.firstName || !inputs.lastName || !inputs.email || !inputs.phone || !inputs.city || !inputs.password)
  }, [inputs])

  return (
    <div>
      <button className="border p-1 px-4 rounded" onClick={handleOpen}>Sign up</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="p-2 h-[500px] text-black">
            <div className="uppercase font-bold text-center pb-2 border-b mb-2">
              <p className="text-sm">
                Sign Up
              </p>
            </div>
            <div className="m-auto">
              <h2 className="text-2xl font-light text-center">
                Create a new Account
              </h2>
              <div className="my-3 flex justify-between text-sm">
                <input type="text" className="border rounded p-2 py-3 w-[49%]" placeholder="First Name" onChange={e => setInputs({ ...inputs, firstName: e.target.value })} />
                <input type="text" className="border rounded p-2 py-3 w-[49%]" placeholder="Last Name" value={inputs.lastName} onChange={e => setInputs({ ...inputs, lastName: e.target.value })} />
              </div>
              <div className="my-3 flex justify-between text-sm">
                <input type="email" className="border rounded p-2 py-3 w-full" placeholder="Email" value={inputs.email} onChange={e => setInputs({ ...inputs, email: e.target.value })} />
              </div>
              <div className="my-3 flex justify-between text-sm">
                <input type="text" className="border rounded p-2 py-3 w-[49%]" placeholder="Phone" value={inputs.phone} onChange={e => setInputs({ ...inputs, phone: e.target.value })} />
                <input type="text" className="border rounded p-2 py-3 w-[49%]" placeholder="City" value={inputs.city} onChange={e => setInputs({ ...inputs, city: e.target.value })} />
              </div>
              <div className="my-3 flex justify-between text-sm">
                <input type="password" className="border rounded p-2 py-3 w-full" placeholder="Password" value={inputs.password} onChange={e => setInputs({ ...inputs, password: e.target.value })} />
              </div>
              <button className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400" disabled={disabled}>
                Sign Up
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}