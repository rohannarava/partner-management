import Layout from '../Layout'
import SftpList from './containers/SftpList'
import SftpForm from './containers/SftpForm'
// import handleFeaturedTableRoute from '../helpers/featuredTableRoute'
import SftpCreateForm from './containers/SftpCreateForm'

export default () => ({
  path: 'partner-management',
  component: Layout,
  indexRoute: {
    component: SftpList,
    // onEnter(nextState) {
    //   handleFeaturedTableRoute(store, 'SFTP_FETCH_REQUESTED', nextState)
    // },
    // onChange(prevState, nextState) {
    //   handleFeaturedTableRoute(store, 'SFTP_FETCH_REQUESTED', nextState)
    // },
  },
  childRoutes: [
    {
      path: ':id/edit',
      component: SftpForm,
    },
    {
      path: ':id/view',
      component: SftpForm,
    },
    {
      path: 'new',
      component: SftpCreateForm,
    },
  ],
})
