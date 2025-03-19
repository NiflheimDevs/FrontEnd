import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function MobileVerifyWrapper({children}) {
    const {mobileSession} = useSelector((state: any) => state.auth)
    const {Phone} = useSelector((state: any) => state.auth)

    const navigate = useNavigate();

    useEffect(()=>{
        if(!mobileSession || !Phone)
            navigate("/auth");
    }, [])

    if(mobileSession)
    {
        return <> {children}</>;
    }
    return <div> loading ...</div>

}
