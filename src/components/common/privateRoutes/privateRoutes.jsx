// import { connect } from "react-redux"
// import { Navigate, Outlet } from "react-router-dom"

// //Кастомный хук
// const useAuth = ({isAuth}) => {
//     const profile = {isAuth}
//     return profile && profile.isAuth
// }

// const PrivateRoutes = (props) => {
//     const isAuth = useAuth(props.isAuth)
//     return isAuth ? <Outlet /> : <Navigate to='/login' />
// }

// const mapStateToProps = (state) => {
//     return {
//         isAuth: state.auth.isAuth
//     }
// }

// export default connect(mapStateToProps)(PrivateRoutes)