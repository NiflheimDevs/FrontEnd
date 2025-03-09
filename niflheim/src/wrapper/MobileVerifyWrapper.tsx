// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
// import { useNavigate } from 'react-router-dom';
// export default function MobileVerifyWrapper({children}) {
//     const {mobileSession} = useSelector((state: any) => state.mobileVerify)
//     const navigate = useNavigate();

//     useEffect(()=>{
//         if(!mobileSession)
//             navigate("/auth");
//     }, [])

//     if(mobileSession)
//     {
//         return <> {children}</>;
//     }
//     return <div> loading ...</div>

// }
