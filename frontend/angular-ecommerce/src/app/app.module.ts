import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ProductListComponent } from './components/product-list/product-list.component';

import { RouterModule, Routes } from '@angular/router';
import { ProductCategoryMenuComponent } from './components/product-category-menu/product-category-menu.component';
import { SearchComponent } from './components/search/search.component'; // Single import statement for Routes and RouterModule

const routes: Routes = [
  // Define your routes here
  {path: 'category/:id/:name', component: ProductListComponent},
  {path: 'category', component:ProductListComponent},
  {path: 'products', component:ProductListComponent},
  {path: '', redirectTo:'/products',pathMatch:'full'},
  {path: '**', redirectTo:'/products',pathMatch:'full'},
  {path: 'search/:keyword', component:ProductListComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryMenuComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, 
    HttpClientModule,
    RouterModule.forRoot(routes) // Register routes
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
