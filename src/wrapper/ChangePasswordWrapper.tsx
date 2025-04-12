import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function MobileVerifyWrapper({children}:any) {
    const {canChangePassword} = useSelector((state: any) => state.auth)
    const navigate = useNavigate();

    useEffect(()=>{
        if(!canChangePassword)
            navigate("/auth");
    }, [])

    if(canChangePassword)
    {
        return <> {children}</>;
    }
    return <div> loading ...</div>

}
