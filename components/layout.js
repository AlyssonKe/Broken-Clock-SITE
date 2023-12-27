import Navbar from './navbar'
import Footer from './footer'

const Layout = ({children}) => (
	<div>
		<Navbar />
	
		<main>{children}</main>

		<Footer />
	</div>
);

export default Layout