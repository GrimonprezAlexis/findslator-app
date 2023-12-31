# Angular/TypeScript: Basic User Authentication Code Sample

This TypeScript code sample demonstrates **how to implement user authentication** in Angular applications using Auth0. This Angular code sample builds the Single-Page Application (SPA) using Angular class components.

This code sample is part of the ["Auth0 Developer Resources"](https://developer.auth0.com/resources), a place where you can explore the authentication and authorization features of the Auth0 Identity Platform.

Visit the ["Angular/TypeScript Code Sample: User Authentication For Basic Apps"](https://developer.auth0.com/resources/code-samples/spa/angular/basic-authentication) page for instructions on how to configure and run this code sample and how to integrate it with an API server of your choice to [create a full-stack code sample](https://developer.auth0.com/resources/code-samples/full-stack/hello-world/basic-access-control/spa).

[![Angular/TypeScript Code Sample: User Authentication For Basic Apps](https://cdn.auth0.com/blog/hub/code-samples/spa/angular-typescript/basic-authentication.png)](https://developer.auth0.com/resources/code-samples/spa/angular/basic-authentication)

## Why Use Auth0?

Auth0 is a flexible drop-in solution to add authentication and authorization services to your applications. Your team and organization can avoid the cost, time, and risk that come with building your own solution to authenticate and authorize users. We offer tons of guidance and SDKs for you to get started and [integrate Auth0 into your stack easily](https://developer.auth0.com/resources/code-samples/full-stack).

# Findslator

## Create environnement File
`
export const environment = {
  production: false,
  auth0: {
    domain: 'dev-xxx.com',
    clientId: 'xxxx',
    authorizationParams: {
      audience: 'https://dev-xxxx.com/api/v2/',
      redirect_uri: 'http://localhost:4040/callback',
    },
    errorPath: '/callback',
  },
  api: {
    serverUrl: 'http://localhost:6060',
  },
};
`





We are on the ProfilePageComponent this page show buttons example
            <div>
              <button type="button" (click)="openModalEditProfile()">Editer le profile</button>
            </div>

              <div>
              <button type="button" (click)="openModalExploreOffer()">Explorer les offres</button>
            </div>


L'objectif est d'avoir un composant modal generic réutilisable qui va ouvrir une modal avec en contenu un composant dynamic (donné dans la method du clique avec des paramétrès) lorsque l'utilisateur va cliquer 

Pour exemple quand je clique sur le bouton openModalEditProfile cela va ouvrir le composant modalGeneric avec le contenu de la page ProfileEditComponent.

Si je clique sur openModalExploreOffer cela va ouvrir le composant modalGeneric avec le contenu de la page ExplorerComponent.
Fournit moi le code permettant de faire cela en Angular / SCSS la modal generic doit être complète. Use factory if require but the most simple way to do this

  this._modalService.openModal(
   const data = {title: ''Éditer le profil", ...}
    this._modalService.openModal(ProfileEditComponent, data)
  }

  openModalExploreOffer() {
   const data = {title: ''Explorer les offres", ...}
    this._modalService.openModal(ExploreComponent, data)
  } 


Provide me a complete code / service / modal / usage