import { useRecoilValue } from 'recoil'
import userSelector from '../store/selectors/userSelector'
import { Navigate } from 'react-router-dom';

export default function AuthRoute({component, role=null}) {
	const currentUser = useRecoilValue(userSelector)
	if (!currentUser || (role !== null && currentUser.role !== role)) {
		return <Navigate to="/login" />
	}
	return component;
}
