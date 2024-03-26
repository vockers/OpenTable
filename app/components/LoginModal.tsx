"use client"
import { useEffect, useState, useContext } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import useAuth from '@/hooks/useAuth';
import { AuthenticationContext } from '@/context/AuthContext';
import { Alert, CircularProgress } from '@mui/material';

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
  const {signin} = useAuth()
  const {loading, data, error} = useContext(AuthenticationContext)

  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const [disabled, setDisabled] = useState(true)

  useEffect(() => {
    setDisabled(!inputs.password || !inputs.email)
  }, [inputs])
  
  const handleClick = () => {
    signin({email: inputs.email, password: inputs.password}, handleClose)
  }

  return (
    <div>
      <button className="bg-blue-400 text-white border p-1 px-4 rounded mr-3" onClick={handleOpen}>Sign in</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {loading ? 
            <div className="py-24 px-2 h-[500px] flex justify-center">
             <CircularProgress />
            </div>
            : 
            <div className="p-2 h-[500px] text-black">
              {error ? <Alert severity="error" className="mb-4">{error}</Alert> : ""}

              <div className="uppercase font-bold text-center pb-2 border-b mb-2">
                <p className="text-sm">
                  Sign In
                </p>
              </div>
              <div className="m-auto">
                <h2 className="text-2xl font-light text-center">
                  Log Into Your Account
                </h2>
                <div className="my-3 flex justify-between text-sm">
                  <input type="email" className="border rounded p-2 py-3 w-full" placeholder="Email" value={inputs.email} onChange={e => setInputs({ ...inputs, email: e.target.value })} />
                </div>
                <div className="my-3 flex justify-between text-sm">
                  <input type="password" className="border rounded p-2 py-3 w-full" placeholder="Password" value={inputs.password} onChange={e => setInputs({ ...inputs, password: e.target.value })} />
                </div>
                <button className="uppercase bg-red-600 w-full text-white p-3 rounded text-sm mb-5 disabled:bg-gray-400" disabled={disabled} onClick={handleClick}>
                  Sign In
                </button>
              </div>
            </div>
          }
        </Box>
      </Modal>
    </div>
  );
}