import { React } from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
  useParams,
} from "react-router-dom";
import { useSelector } from "react-redux";
import Login from "../../src/containers/Auth/Login/index";
import Layout from "../../src/containers/Layout/index";
import Brands from "./../containers/Brand/Brands/Brands";
import Collections from "./../containers/Collection/Collections/Collections";
import Attributes from "./../containers/Attribute/Attribute/Attributes";
import Dashboard from "./../containers/Dashboard/Dashboard";
import Products from "./../containers/Product/Products/Products";
import Orders from "./../containers/Order/Orders/Orders";
import {FinalInvoice} from "./../containers/Invoice/invoice";
import CreateProduct from "./../containers/Product/NewProduct/NewProduct";
import ForgotPassword from "./../containers/Auth/ForgotPassword";
import Menu from "./../containers/Menu/Menus/Menus";
import EditProduct from "./../containers/Product/EditProduct/EditProduct";
import Customer from "./../containers/Customer/Customer";
import NewRole from "../containers/Roles/NewRoles/NewRoles";
import Roles from "../containers/Roles/Roles/Roles";
import Users from "../containers/User/User/User";
import Question from "../containers/Question/Question";
import Banners from "../containers/Banners/NewBanners/newBanners";
import NewUsers from "../containers/User/NewUser/NewUser";
import EditUser from "../containers/User/EditUser/EditUser";
import { BrowserRouter } from "react-router-dom";
import Reviews from "../containers/Reviews/Reviews";
import NewBanners from "../containers/Banners/Banners";
import Variations from "../containers/Variations/NewVariationis/Variations";
import EditVariation from "../containers/Variations/EditVariations/EditVariation";
import AllProductVariations from "../containers/Variations/AllProductVariations/AllProdcutVariations";


export default function Routes() {

    const {isAuthenticated} = useSelector(({auth}) => auth);

    return (
       <BrowserRouter>
           <Switch>
               <Route path='/' exact component={Login}/>
               <Route path='/forgot-password' exact component={ForgotPassword}/>
               {isAuthenticated?
                   <Layout>
                       <Route component={({ match }) =>
                           <div>
                               {/*<Route path="/" exact render={()=>{<h1>Dashboard</h1>}}/>*/}
                               <Route path="/dashboard"  component={Dashboard}/>
                               <Route path="/brands"  component={Brands}/>
                               <Route path="/collections"  component={Collections}/>
                               <Route path="/attributes"  component={Attributes}/>
                               <Route path="/products"  component={Products}/>
                               <Route path="/product/create"  component={CreateProduct}/>
                               <Route path="/product/edit/:id"  component={EditProduct}/>
                               <Route path="/orders"  component={Orders}/>
                               <Route path="/menus"  component={Menu}/>
                               <Route path="/customers" component={Customer}/>
                               <Route path="/roles" component={Roles}/>
                               <Route path="/role/create" component={NewRole}/>
                               <Route path="/user/create" component={NewUsers}/>
                               <Route path="/users" component={Users}/>
                               <Route path="/user/edit/:id" component={EditUser}/>
                               <Route path="/question" component={Question}/>
                               <Route path="/reviews" component={Reviews}/>
                               <Route path="/newBanner" component={Banners}/>
                               <Route path="/banners" component={NewBanners}/>
                               <Route path="/product/variation/:id" component={Variations}/>
                               <Route path="/product/editvariation/:id" component={EditVariation}/>
                               <Route path="/product/allproductvariants/:id" component={AllProductVariations}/>
                               <Route path="/product/finalinvoice" component={FinalInvoice}/>
                           </div>
                       }/>
                   </Layout>
                   : <Redirect to='/'/>}
           </Switch>
       </BrowserRouter>
    )

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/forgot-password" exact component={ForgotPassword} />
        {isAuthenticated ? (
          <Layout>
            <Route
              component={({ match }) => (
                <div>
                  {/*<Route path="/" exact render={()=>{<h1>Dashboard</h1>}}/>*/}
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/brands" component={Brands} />
                  <Route path="/collections" component={Collections} />
                  <Route path="/attributes" component={Attributes} />
                  <Route path="/products" component={Products} />
                  <Route path="/product/create" component={CreateProduct} />
                  <Route path="/product/edit/:id" component={EditProduct} />
                  <Route path="/orders" component={Orders} />
                  <Route path="/menus" component={Menu} />
                  <Route path="/customers" component={Customer} />
                  <Route path="/roles" component={Roles} />
                  <Route path="/role/create" component={NewRole} />
                  <Route path="/user/create" component={NewUsers} />
                  <Route path="/users" component={Users} />
                  <Route path="/user/edit/:id" component={EditUser} />
                  <Route path="/question" component={Question} />
                </div>
              )}
            />
          </Layout>
        ) : (
          <Redirect to="/" />
        )}
      </Switch>
    </BrowserRouter>
  );
}
