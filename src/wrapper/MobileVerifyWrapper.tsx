import { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
export default function MobileVerifyWrapper({children}:any) {
    const {mobileSession} = useSelector((state: any) => state.auth)
    const navigate = useNavigate();

    useEffect(()=>{
        if(!mobileSession)
            navigate("/auth");
    }, [])

    if(mobileSession)
    {
        return <> {children}</>;
    }
    return <div> loading ...</div>

}
