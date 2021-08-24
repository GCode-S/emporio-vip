import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Emporio from './pages/Emporio/index';
import AlterValues from './pages/AlterValues';
import NewProduct from './pages/NewProduct';
import Stock from './pages/Stock';
import FiscalPage from './pages/FiscalPage';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Emporio} />
                <Route path="/altera" exact component={AlterValues} />
                <Route path="/cadastrar" exact component={NewProduct} />
                <Route path="/estoque" exact component={Stock} />
                <Route path="/nota-fiscal" exact component={FiscalPage} />

            </Switch>
        </BrowserRouter>
    );
}